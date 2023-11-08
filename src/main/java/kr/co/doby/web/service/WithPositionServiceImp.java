package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithPosition;
import kr.co.doby.web.entity.WithPositionView;
import kr.co.doby.web.repository.WithPositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithPositionServiceImp implements WithPositionService {


    @Autowired
    private WithPositionRepository repository;

    @Override
    public void reg(WithPosition withPosition) {
        repository.save(withPosition);
    }

    @Override
    public List<WithPositionView> getList(Long withId) {
        return repository.findViewAll(withId);
    }

    @Override
    public void delete(Long withId) {
        repository.deleteByWithId(withId);
    }

    @Override
    public void edit(WithPosition withPosition) {
        repository.update(withPosition);
    }
}
