package kr.co.doby.web.service;

import kr.co.doby.web.entity.*;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SmalltalkServiceImp implements SmalltalkService{

    @Autowired
    private SmalltalkRepository repository;

    @Autowired
    private SmalltalkTagRepository smalltalkTagRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SmalltalkGoodRepository smalltalkGoodRepository;

    @Override
    public List<SmalltalkView> getViewList(Integer page, String query, Integer filterId) {

        if("".equals(query))
            query = null;
        String filterName = checkFilterNameByFilterId(filterId);
        int size = 10;
        // 몇번 건너뛸지 정하기 위한 변수.
        int offset = (page * size) - size;
        List<SmalltalkView> smalltalkViewAll = repository.findViewAll(offset, size, query, filterName);
        // 뽑아온 게시글 번호에 해당하는 태그 목록을 가져옴
        for (SmalltalkView s : smalltalkViewAll) {
            long smalltalkId = s.getId();
            List<SmalltalkTagView> tagList = smalltalkTagRepository.findViewAllBySmalltalkId(smalltalkId);
            s.setTagList(tagList);
            // 날짜 변환
            Date regDate = s.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            s.setTimeDifference(timeDifference);
        }

        return smalltalkViewAll;
    }


    // 필터 아이디에 따라 정렬 기준을 리턴하는 함수
    private String checkFilterNameByFilterId(Integer filterId) {
        String filterName = null;
        switch (filterId){
            case 1:
                filterName = "id";
                break;
            case 2:
                filterName = "hit";
                break;
            case 3:
                filterName = "good_count";
                break;
            case 4:
                filterName = "comment_count";
                break;
        }
        return filterName;
    }

    @Override
    public Smalltalk add(Smalltalk smalltalk) {
        repository.save(smalltalk);
        Smalltalk newOne = repository.last();
        return newOne;
    }

    @Override
    public Smalltalk getById(Long id) {
        Smalltalk smalltalk = repository.findById(id);
        repository.updateHitCount(smalltalk.getId());
        // 등록시간을 현재 날짜와 비교해서 setting
        Date regDate = smalltalk.getRegDate();
        String timeDifference = TimeDifference.getTimeDifference(regDate);
        smalltalk.setTimeDifference(timeDifference);
        return smalltalk;
    }

    @Override
    public List<SmalltalkTagView> getSmalltalkTagViewListById(Long id) {
        return smalltalkTagRepository.findViewAllBySmalltalkId(id);
    }

    @Override
    public Member getMemberByMemberId(Long memberId) {
        return memberRepository.findById(memberId);
    }

    @Override
    public Boolean isGood(Long id, Long memberId) {
        SmalltalkGood good =  smalltalkGoodRepository.findById(id, memberId);
        if(good == null) return false;
        else return true;
    }

    @Override
    public void edit(Smalltalk smalltalk) {
        repository.update(smalltalk);
    }

    @Override
    public void deleteById(Long id) {
        repository.delete(id);
    }

    @Override
    public Long getTotalDataCount(String query) {
        if("".equals(query))
            query = null;
        return repository.findAllCount(query);
    }
}
