package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityCommentGood;

public interface CommunityCommentGoodService {
    void deleteById(Long memberId, Long commentId);

    void add(CommunityCommentGood communityCommentGood);
}
