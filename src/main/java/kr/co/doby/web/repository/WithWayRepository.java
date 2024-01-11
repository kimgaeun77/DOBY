package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithWay;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WithWayRepository {

    WithWay findById(Long id);
}
