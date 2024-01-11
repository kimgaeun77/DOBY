package kr.co.doby.web.service;

import kr.co.doby.web.entity.*;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class IndexServiceImp implements IndexService {

    @Autowired
    private IndexRepository repository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private CommunityTagRepository communityTagRepository;

    @Autowired
    private WithRepository withRepository;

    @Autowired
    private WithTechRepository withTechRepository;

    @Autowired
    private SmalltalkRepository smalltalkRepository;

    @Autowired
    private SmalltalkTagRepository smalltalkTagRepository;

    @Override
    public List<WithView> getNearDeadlineWithList() throws ParseException {


        List<WithView> list = withRepository.findViewAllByOrderByDeadlineAsc();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formatData = dateFormat.format(new Date());
        Date currentDate = dateFormat.parse(formatData);

        for (WithView with : list) {
            Long time = (with.getDeadline().getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24;
            with.setTechList(withTechRepository.findViewAll(with.getId()));
            with.setDateGap(time);
        }

        return list;
    }

    @Override
    public List<CommunityView> getCommunityViewList(Integer page, Long categoryId, String query, Integer filterId) {

        String filterName = checkFilterNameByFilterId(filterId);
        int size = 5;
        int offset = (page * size) - size;

        List<CommunityView> communityViewAll = communityRepository.findViewAll(offset, size, categoryId, query, filterName);
        // 뽑아온 게시글 번호에 해당하는 태그 목록을 가져옴
        for (CommunityView c : communityViewAll) {
            long communityId = c.getId();
            List<CommunityTagView> tagList = communityTagRepository.findViewAllByCommunityId(communityId);
            c.setTagList(tagList);
            // 날짜 변환
            Date regDate = c.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            c.setTimeDifference(timeDifference);
        }

        return communityViewAll;
    }

    @Override
    public List<WithView> getWithViewList(Integer page, Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish, Long memberId) {
        if (isWish != null && !isWish)
            isWish = null;

        if (techList != null && techList.isEmpty())
            techList = null;

        if ("".equals(query))
            query = null;

        int size = 10;
        int offset = size * (page - 1);

        List<WithView> list = withRepository.findViewAll(offset, size, categoryId, query, techList, positionId, wayId, isWish, memberId);

        for (WithView with : list) {
            Date regDate = with.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            with.setTimeDifference(timeDifference);
            with.setTechList(withTechRepository.findViewAll(with.getId()));
        }

        return list;
    }

    // 필터 아이디에 따라 정렬 기준을 리턴하는 함수
    public String checkFilterNameByFilterId(Integer filterId) {
        String filterName = null;
        switch (filterId) {
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
    public List<SmalltalkView> getSmalltalkViewList(Integer page, String query, Integer filterId) {

        String filterName = checkFilterNameByFilterId(filterId);
        int size = 5;
        int offset = (page * size) - size;

        List<SmalltalkView> smalltalkViewAll = smalltalkRepository.findViewAll(offset, size, query, filterName);
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

    @Override
    public List<PopularView> getPopularViewList(Integer page, Integer filterId) {

        String filterName = checkFilterNameByFilterId(filterId);
        int size = 5;
        int offset = (page * size) - size;

        List<PopularView> PopularViewAll = repository.findPopularViewAll(offset, size, filterName);

        for (PopularView p : PopularViewAll) {
            long id = p.getId();
            String boardName = p.getBoardName();

            if (boardName.equals("커뮤니티")) {
                List<CommunityTagView> tagList = communityTagRepository.findViewAllByCommunityId(id);
                p.setTagList(tagList);
            } else if (boardName.equals("스몰톡")) {
                List<SmalltalkTagView> tagList = smalltalkTagRepository.findViewAllBySmalltalkId(id);
                p.setTagList(tagList);
            }

            // 날짜 변환
            Date regDate = p.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            p.setTimeDifference(timeDifference);
        }

        return PopularViewAll;
    }
}
