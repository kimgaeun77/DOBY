package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithCategory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WithCategoryRepository {

    WithCategory findById(Long id);
}
