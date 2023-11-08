package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithPosition;
import kr.co.doby.web.entity.WithPositionView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithPositionRepository {

    List<WithPositionView> findViewAll(Long withId);

    int countCapacityById(Long withId);

    void save(WithPosition withPosition);

    void deleteByWithId(Long withId);

    void update(WithPosition withPosition);
}
