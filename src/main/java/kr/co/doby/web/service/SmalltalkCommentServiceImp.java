package kr.co.doby.web.service;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.SmalltalkComment;
import kr.co.doby.web.entity.SmalltalkCommentGood;
import kr.co.doby.web.entity.SmalltalkCommentView;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.SmalltalkCommentGoodRepository;
import kr.co.doby.web.repository.SmalltalkCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SmalltalkCommentServiceImp implements SmalltalkCommentService{

    @Autowired
    private SmalltalkCommentRepository repository;


    @Autowired
    private SmalltalkCommentGoodRepository smalltalkCommentGoodRepository;

    @Override
    public SmalltalkComment add(SmalltalkComment smalltalkComment) {
        repository.save(smalltalkComment);
        SmalltalkComment newOne = repository.last();
        return newOne;
    }

    @Override
    public List<SmalltalkCommentView> getViewListBySmalltalkId(Long smalltalkId, Long parentId, Authentication authentication) {
        List<SmalltalkCommentView> commentList = repository.findViewAllBySmalltalkId(smalltalkId, parentId);

        for (SmalltalkCommentView comment : commentList) {

            // 등록시간
            Date regDate = comment.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            comment.setTimeDifference(timeDifference);

            // 좋아요 확인
            if (authentication == null) continue;
            DobyUserDetails userDetails = (DobyUserDetails) authentication.getPrincipal();
            Long memberId = userDetails.getId();
            SmalltalkCommentGood smalltalkCommentGood = smalltalkCommentGoodRepository.findById(comment.getId(), memberId);
            Boolean result = smalltalkCommentGood != null;
            comment.setIsGood(result);

        }
        return commentList;
    }

    @Override
    public Long getCountBySmalltalkId(Long smalltalkId) {
        return repository.findCountBySmalltalkId(smalltalkId);
    }

    @Override
    public void deleteById(Long id) {
        repository.delete(id);
    }
}
