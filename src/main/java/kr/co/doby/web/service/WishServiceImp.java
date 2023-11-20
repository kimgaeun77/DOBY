package kr.co.doby.web.service;

import kr.co.doby.web.repository.WishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishServiceImp implements WishService {

    @Autowired
    private WishRepository repository;

    @Override
    public void reg(Long withId, Long memberId) {

        repository.save(memberId, withId);
    }

    @Override
    public void delete(Long withId, Long memberId) {

        repository.deleteById(memberId, withId);
    }
}