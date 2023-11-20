package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithComment;
import kr.co.doby.web.entity.WithCommentView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithCommentRepository {
    WithComment findById(Long id);

    List<WithCommentView> findViewAll(Long withId);

    List<WithCommentView> findViewAllByParentId(Long parentId);

    void save(WithComment withComment);

    void deleteById(Long id);

    int countByWithId(Long withId);

    void deleteByParentId(Long parentId);
}
