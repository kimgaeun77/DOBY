package kr.co.doby.web.service;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.*;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommunityServiceImp implements CommunityService {

    @Autowired
    private CommunityRepository repository;

    @Autowired
    private CommunityCategoryRepository communityCategoryRepository;

    @Autowired
    private CommunityTagRepository communityTagRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CommunityGoodRepository communityGoodRepository;

    @Autowired
    private CommunityCommentRepository communityCommentRepository;

    @Autowired
    private CommunityCommentGoodRepository communityCommentGoodRepository;



    @Override
    public List<CommunityView> getViewList(Integer page, Long categoryId, String query, Integer filterId) {

        if("".equals(query))
            query = null;
        String filterName = checkFilterNameByFilterId(filterId);
        int size = 10;
        // 몇번 건너뛸지 정하기 위한 변수.
        int offset = (page * size) - size;
        List<CommunityView> communityViewAll = repository.findViewAll(offset, size, categoryId, query, filterName);
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

    // 필터 아이디에 따라 정렬 기준을 리턴하는 함수
    public String checkFilterNameByFilterId(Integer filterId) {
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

    // 게시글 카테고리 목록 가져오는 서비스
    @Override
    public List<CommunityCategory> getCommunityCategoryList() {
        return communityCategoryRepository.findAll();
    }

    @Override
    public Community add(Community community) {
        repository.save(community);
        Community newOne = repository.last();
        return newOne;
    }

    @Override
    public Community getById(Long id) {
        Community community = repository.findById(id);
        repository.updateHitCount(community.getId());
        // 등록시간을 현재 날짜와 비교해서 setting
        Date regDate = community.getRegDate();
        String timeDifference = TimeDifference.getTimeDifference(regDate);
        community.setTimeDifference(timeDifference);
        return community;
    }

    @Override
    public List<CommunityTagView> getCommunityTagViewListById(Long id) {
        return communityTagRepository.findViewAllByCommunityId(id);
    }

    @Override
    public Member getMemberByMemberId(Long memberId) {
        return memberRepository.findById(memberId);
    }

    @Override
    public Boolean isGood(Long id, Long memberId) {
        CommunityGood good =  communityGoodRepository.findById(id, memberId);
        if(good == null) return false;
        return true;
    }

    @Override
    public String getCategoryNameByCategoryId(Long categoryId) {
        return communityCategoryRepository.findCategoryNameById(categoryId);
    }

    @Override
    public void edit(Community community) {
        repository.update(community);
    }

    @Override
    public void deleteById(Long id) {
        repository.delete(id);
    }

    @Override
    public Long getTotalDataCount(Long categoryId, String query) {
        if("".equals(query))
            query = null;
        return repository.findAllCount(categoryId, query);
    }

    @Override
    public Long getCommentCountById(Long id) {
        return communityCommentRepository.findCountByCommunityId(id);
    }

    @Override
    public List<CommunityCommentView> getCommentViewListById(Long id, Long parentId, Authentication authentication) {
        List<CommunityCommentView> commentList = communityCommentRepository.findViewAllByCommunityId(id, parentId);

        for (CommunityCommentView comment : commentList) {

            // 등록시간
            Date regDate = comment.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            comment.setTimeDifference(timeDifference);

            // 좋아요 확인
            if (authentication == null) continue;
            DobyUserDetails userDetails = (DobyUserDetails) authentication.getPrincipal();
            Long memberId = userDetails.getId();
            CommunityCommentGood communityCommentGood = communityCommentGoodRepository.findById(comment.getId(), memberId);
            Boolean result = communityCommentGood != null;
            comment.setIsGood(result);

        }
        return commentList;
    }
}
