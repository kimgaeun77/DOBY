package kr.co.doby.web.service;

import kr.co.doby.web.entity.Tech;
import kr.co.doby.web.repository.TechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechServiceImp implements TechService {

    @Autowired
    private TechRepository repository;

    @Override
    public List<Tech> getList() {
        return repository.findAll();
    }
    
}
