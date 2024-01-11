package kr.co.doby.web.repository;

import kr.co.doby.web.entity.MemberRole;
import kr.co.doby.web.entity.MemberRoleView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRoleRepository {
    List<MemberRoleView> findRoleByMemberId(Long id);

    void save(MemberRole memberRole);
}