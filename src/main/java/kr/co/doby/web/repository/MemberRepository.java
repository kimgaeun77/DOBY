package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberRepository {
    Member findById(Long id);

    Member findByUsername(String username);
}
