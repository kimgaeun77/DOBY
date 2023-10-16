package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Tech;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TechRepository {
    List<Tech> findAll();
    
}
