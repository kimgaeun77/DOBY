package kr.co.doby.web.service;

import kr.co.doby.web.entity.Member;
import kr.co.doby.web.entity.MemberRole;
import kr.co.doby.web.repository.MemberRepository;
import kr.co.doby.web.repository.MemberRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImp implements MemberService {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private MemberRoleRepository memberRoleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public Member getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Member join(Member member) {
        String hashedPwd = encoder.encode(member.getPassword());

        String nickname_ = null;
        do {
            int randomNumber = 100 + (int) (Math.random() * 900);
            nickname_ = "도비" + randomNumber;
        } while (repository.findByNickname(nickname_) != null);
        member.setNickname(nickname_);
        member.setPassword(hashedPwd);
        repository.save(member);
        Member newOne = repository.last();
        MemberRole mr = MemberRole
                .builder()
                .memberId(newOne.getId())
                .roleId(2L) //기본역할자 아이디. 기본값으로하는게 더 좋죠
                .build();
        memberRoleRepository.save(mr);
        return newOne;
    }

    @Override
    public Integer usernameCheck(String username) {
        return repository.countByUsername(username);
    }

    @Override
    public Integer emailCheck(String email) {
        return repository.countByEmail(email);
    }

    @Override
    public Integer phoneCheck(String phone) {
        return repository.countByPhone(phone);
    }

    @Override
    public List<Member> getList(Integer page, String query) {
        int size = 10;
        int offset = size * (page - 1);
        return repository.findAll(offset, size, query);
    }

    @Override
    public Long countByQuery(String query) {
        return repository.countByQuery(query);
    }

}
