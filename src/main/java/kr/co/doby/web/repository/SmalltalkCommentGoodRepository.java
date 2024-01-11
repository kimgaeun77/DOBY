package kr.co.doby.web.repository;

import kr.co.doby.web.entity.SmalltalkCommentGood;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SmalltalkCommentGoodRepository {
    SmalltalkCommentGood findById(Long commentId, Long memberId);

    void save(SmalltalkCommentGood smalltalkCommentGood);

    void delete(Long memberId, Long commentId);
}
