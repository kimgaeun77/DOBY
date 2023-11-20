package kr.co.doby.web.service;

import kr.co.doby.web.entity.Member;
import kr.co.doby.web.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImp implements MemberService {

    @Autowired
    private MemberRepository repository;

    @Override
    public Member getById(Long id) {
        return repository.findById(id);
    }


}
