package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithComment;
import kr.co.doby.web.entity.WithCommentView;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.WithCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WithCommentServiceImp implements WithCommentService {

    @Autowired
    private WithCommentRepository repository;

    @Override
    public void reg(WithComment withComment) {
        Long memberId = 1L;

        withComment.setMemberId(memberId);

        repository.save(withComment);
    }

    @Override
    public List<WithCommentView> getCommentList(Long withId, Long parentId) {

        List<WithCommentView> list = null;

        if (parentId == null) list = repository.findViewAll(withId);
        else list = repository.findViewAllByParentId(parentId);

        for (WithCommentView comment : list) {
            Date regDate = comment.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            comment.setTimeDifference(timeDifference);
        }

        return list;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
