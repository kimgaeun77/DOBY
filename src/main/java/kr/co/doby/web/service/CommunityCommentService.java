package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityComment;
import kr.co.doby.web.entity.CommunityCommentView;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CommunityCommentService {
    void deleteById(Long id);

    List<CommunityCommentView> getViewListByCommunityId(Long communityId, Long parentId, Authentication authentication);

    Long getCountByCommunityId(Long communityId);

    CommunityComment add(CommunityComment communityComment);
}
