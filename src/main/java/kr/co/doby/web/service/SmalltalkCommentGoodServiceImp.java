package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkCommentGood;
import kr.co.doby.web.repository.SmalltalkCommentGoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmalltalkCommentGoodServiceImp implements SmalltalkCommentGoodService{

    @Autowired
    private SmalltalkCommentGoodRepository repository;

    @Override
    public void add(SmalltalkCommentGood smalltalkCommentGood) {
        repository.save(smalltalkCommentGood);
    }

    @Override
    public void deleteById(Long memberId, Long commentId) {
        repository.delete(memberId, commentId);
    }
}
