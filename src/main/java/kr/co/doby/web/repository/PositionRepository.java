package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Position;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PositionRepository {

    List<Position> findAll();
}
