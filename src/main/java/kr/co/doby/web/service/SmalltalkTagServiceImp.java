package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkTag;
import kr.co.doby.web.repository.CommunityTagRepository;
import kr.co.doby.web.repository.SmalltalkTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmalltalkTagServiceImp implements SmalltalkTagService {

    @Autowired
    private SmalltalkTagRepository repository;
    @Override
    public void add(SmalltalkTag smalltalkTag) {
        repository.save(smalltalkTag);
    }

    @Override
    public void deleteBySmalltalkId(Long smalltalkId) {
        repository.deleteBySmalltalkId(smalltalkId);
    }
}
