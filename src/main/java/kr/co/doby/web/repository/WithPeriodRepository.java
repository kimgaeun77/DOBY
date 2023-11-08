package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithPeriod;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WithPeriodRepository {

    WithPeriod findById(Long periodId);
}
