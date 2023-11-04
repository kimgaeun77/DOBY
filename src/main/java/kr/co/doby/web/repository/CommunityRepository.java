package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityRepository {
    List<CommunityView> findViewAll(int offset, int size, Long categoryId, String query, String filterName);

    void save(Community community);

    Community last();

    Community findById(Long id);

    void updateHitCount(Long id);

    void update(Community community);

    void delete(Long id);

    Long findAllCount(Long categoryId, String query);
}
