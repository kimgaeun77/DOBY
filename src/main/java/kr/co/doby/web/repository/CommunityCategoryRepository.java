package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityCategoryRepository {
    List<CommunityCategory> findAll();

    String findCategoryNameById(Long categoryId);
}
