package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityTag;
import kr.co.doby.web.repository.CommunityTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CommunityTagServiceImp implements CommunityTagService {

    @Autowired
    private CommunityTagRepository repository;
    @Override
    public void add(CommunityTag communityTag) {
        repository.save(communityTag);
    }

    @Override
    public void deleteByCommunityId(Long communityId) {
        repository.deleteByCommunityId(communityId);
    }
}
