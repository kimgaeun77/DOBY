package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityTagDefine;
import kr.co.doby.web.repository.CommunityTagDefineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityTagDefineServiceImp implements CommunityTagDefineService{

    @Autowired
    private CommunityTagDefineRepository repository;
    @Override
    public List<CommunityTagDefine> getList(String query) {
        List<CommunityTagDefine> tagList = repository.findAll(query);
        return tagList;
    }
}
