package kr.co.doby.web.service;

import kr.co.doby.web.entity.Member;
import kr.co.doby.web.entity.Tech;
import org.springframework.stereotype.Service;

import java.util.List;

public interface MemberService {
    Member getById(Long id);

    public Member join(Member member);

    public Integer usernameCheck(String username);

    public Integer emailCheck(String email);

    public Integer phoneCheck(String phone);

    List<Member> getList(Integer page, String query);

    Long countByQuery(String query);

}
