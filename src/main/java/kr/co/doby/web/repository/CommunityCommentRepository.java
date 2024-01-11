package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityComment;
import kr.co.doby.web.entity.CommunityCommentView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityCommentRepository {

    Long findCountByCommunityId(Long communityId);

    List<CommunityCommentView> findViewAllByCommunityId(Long communityId, Long parentId);

    void delete(Long id);

    void save(CommunityComment communityComment);

    CommunityComment last();
}
