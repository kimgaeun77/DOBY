package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityGood;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityGoodRepository {
    CommunityGood findById(Long id, Long memberId);

    void save(CommunityGood communityGood);

    void delete(Long memberId, Long communityId);
}
