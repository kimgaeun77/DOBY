package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkCommentGood;

public interface SmalltalkCommentGoodService {
    void add(SmalltalkCommentGood smalltalkCommentGood);

    void deleteById(Long memberId, Long commentId);
}
