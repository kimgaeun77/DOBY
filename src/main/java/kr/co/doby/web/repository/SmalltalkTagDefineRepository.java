package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityTagDefine;
import kr.co.doby.web.entity.SmalltalkTagDefine;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SmalltalkTagDefineRepository {
    List<SmalltalkTagDefine> findAll(String query);
}
