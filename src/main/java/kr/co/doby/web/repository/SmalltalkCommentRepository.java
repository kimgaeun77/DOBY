package kr.co.doby.web.repository;

import kr.co.doby.web.entity.SmalltalkComment;
import kr.co.doby.web.entity.SmalltalkCommentView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SmalltalkCommentRepository {
    Long findCountBySmalltalkId(Long smalltalkId);

    List<SmalltalkCommentView> findViewAllBySmalltalkId(Long smalltalkId, Long parentId);

    void save(SmalltalkComment smalltalkComment);

    SmalltalkComment last();

    Long findCountBySmalltalkI(Long smalltalkId);

    void delete(Long id);
}
