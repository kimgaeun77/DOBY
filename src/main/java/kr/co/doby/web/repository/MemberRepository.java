package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRepository {
    Member findById(Long id);

    Member findByUsername(String username);

     void save(Member member); //회원가입

     Member last();

     Integer countByUsername(String id); //회원가입 중복검사

     String findByNickname(String nickname_); //회원가입 랜덤 닉네임 중복검사

    Integer countByEmail(String email); //회원가입 중복검사

    Integer countByPhone(String phone); //회원가입 중복검사

    List<Member> findAll(int offset, int size, String query); //관리자 회원목록 조회 검색

    Long countByQuery(String query); //관리자 회원목록 조회 페이징

}
