package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithComment;
import kr.co.doby.web.entity.WithCommentView;

import java.util.List;

public interface WithCommentService {
    void reg(WithComment withComment);

    List<WithCommentView> getCommentList(Long withId, Long parentId);

    void delete(Long id);
}
