package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityTag;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

public interface CommunityTagService {
    void add(CommunityTag communityTag);

    void deleteByCommunityId(Long communityId);
}
