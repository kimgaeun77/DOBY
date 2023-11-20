package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityTagDefine;
import kr.co.doby.web.entity.SmalltalkTagDefine;
import kr.co.doby.web.repository.CommunityTagDefineRepository;
import kr.co.doby.web.repository.SmalltalkTagDefineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SmalltalkTagDefineServiceImp implements SmalltalkTagDefineService {

    @Autowired
    private SmalltalkTagDefineRepository repository;

    @Override
    public List<SmalltalkTagDefine> getList(String query) {
        List<SmalltalkTagDefine> tagList = repository.findAll(query);
        return tagList;
    }

}
