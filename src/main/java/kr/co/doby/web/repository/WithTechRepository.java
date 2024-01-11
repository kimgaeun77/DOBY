package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Tech;
import kr.co.doby.web.entity.WithTech;
import kr.co.doby.web.entity.WithTechView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithTechRepository {

    List<WithTechView> findViewAll(Long withId);

    void save(WithTech withTech);

    List<Tech> findAll();

    void update(WithTech withTech);

    void deleteByWithId(Long withId);
}
