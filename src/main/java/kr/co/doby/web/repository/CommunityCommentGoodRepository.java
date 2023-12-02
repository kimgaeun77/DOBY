package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityCommentGood;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityCommentGoodRepository {
    CommunityCommentGood findById(Long commentId, Long memberId);

    void delete(Long memberId, Long commentId);

    void save(CommunityCommentGood communityCommentGood);
}
