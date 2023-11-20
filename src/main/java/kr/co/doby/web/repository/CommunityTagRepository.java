package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityTag;
import kr.co.doby.web.entity.CommunityTagView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityTagRepository {
    List<CommunityTagView> findViewAllByCommunityId(Long id);

    void save(CommunityTag communityTag);

    void deleteByCommunityId(Long communityId);
}
