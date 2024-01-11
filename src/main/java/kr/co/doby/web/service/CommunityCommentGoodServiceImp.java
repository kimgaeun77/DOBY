package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityCommentGood;
import kr.co.doby.web.repository.CommunityCommentGoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityCommentGoodServiceImp implements CommunityCommentGoodService{

    @Autowired
    private CommunityCommentGoodRepository repository;

    @Override
    public void deleteById(Long memberId, Long commentId) {
        repository.delete(memberId, commentId);
    }

    @Override
    public void add(CommunityCommentGood communityCommentGood) {
        repository.save(communityCommentGood);
    }
}
