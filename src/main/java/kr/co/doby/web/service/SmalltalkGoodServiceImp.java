package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkGood;
import kr.co.doby.web.repository.CommunityGoodRepository;
import kr.co.doby.web.repository.SmalltalkGoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SmalltalkGoodServiceImp implements SmalltalkGoodService{

    @Autowired
    private SmalltalkGoodRepository repository;
    public void add(SmalltalkGood smalltalkGood) {

        repository.save(smalltalkGood);
    }

    @Override
    public void delete(Long memberId, Long smalltalkId) {
        repository.delete(memberId,smalltalkId);
    }
}
