package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithTech;
import kr.co.doby.web.repository.WithTechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WithTechServiceImp implements WithTechService {

    @Autowired
    private WithTechRepository repository;

    @Override
    public void reg(WithTech withTech) {
        repository.save(withTech);
    }

    @Override
    public void edit(WithTech withTech) {
        repository.update(withTech);
    }

    @Override
    public void delete(Long withId) {
        repository.deleteByWithId(withId);
    }
}
