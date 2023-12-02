package kr.co.doby.web.service;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityComment;
import kr.co.doby.web.entity.CommunityCommentGood;
import kr.co.doby.web.entity.CommunityCommentView;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.CommunityCommentGoodRepository;
import kr.co.doby.web.repository.CommunityCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommunityCommentServiceImp implements CommunityCommentService {

    @Autowired
    private CommunityCommentRepository repository;

    @Autowired
    private CommunityCommentGoodRepository communityCommentGoodRepository;

    @Override
    public void deleteById(Long id) {
        repository.delete(id);
    }

    @Override
    public List<CommunityCommentView> getViewListByCommunityId(Long communityId, Long parentId, Authentication authentication) {
        List<CommunityCommentView> commentList = repository.findViewAllByCommunityId(communityId, parentId);

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

    @Override
    public Long getCountByCommunityId(Long communityId) {
        return repository.findCountByCommunityId(communityId);
    }

    @Override
    public CommunityComment add(CommunityComment communityComment) {
        repository.save(communityComment);
        CommunityComment newOne = repository.last();
        return newOne;
    }
}
