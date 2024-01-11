package kr.co.doby.web.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InactiveMemberRepository {
    Boolean findInactiveMemberById(Long id);
}