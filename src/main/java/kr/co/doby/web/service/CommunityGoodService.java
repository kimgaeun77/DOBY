package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityGood;

public interface CommunityGoodService {
    void add(CommunityGood communityGood);

    void delete(Long memberId, Long communityId);
}
