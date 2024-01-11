package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Wish;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WishRepository {

    Wish findById(Long memberId, Long withId);

    void save(Long memberId, Long withId);

    void deleteById(Long memberId, Long withId);
}
