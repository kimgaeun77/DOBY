package kr.co.doby.web.service;

import kr.co.doby.web.entity.Position;
import kr.co.doby.web.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImp implements PositionService {

    @Autowired
    private PositionRepository repository;

    @Override
    public List<Position> getList() {
        return repository.findAll();
    }
}
