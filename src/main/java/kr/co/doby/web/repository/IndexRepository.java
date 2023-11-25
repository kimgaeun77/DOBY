package kr.co.doby.web.repository;

import kr.co.doby.web.entity.PopularView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IndexRepository {
    List<PopularView> findPopularViewAll(int offset, int size, String filterName);
}
