package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkComment;
import kr.co.doby.web.entity.SmalltalkCommentView;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface SmalltalkCommentService {
    SmalltalkComment add(SmalltalkComment smalltalkComment);

    List<SmalltalkCommentView> getViewListBySmalltalkId(Long smalltalkId, Long parentId, Authentication authentication);

    Long getCountBySmalltalkId(Long smalltalkId);

    void deleteById(Long id);
}
