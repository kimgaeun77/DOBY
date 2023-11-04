package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityTagDefine;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityTagDefineRepository {
    List<CommunityTagDefine> findAll(String query);
}
