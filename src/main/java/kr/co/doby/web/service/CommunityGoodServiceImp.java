package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityGood;
import kr.co.doby.web.repository.CommunityGoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityGoodServiceImp implements CommunityGoodService{

    @Autowired
    private CommunityGoodRepository repository;

    @Override
    public void add(CommunityGood communityGood) {
        repository.save(communityGood);
    }

    @Override
    public void delete(Long memberId, Long communityId) {
        repository.delete(memberId,communityId);
    }
}
