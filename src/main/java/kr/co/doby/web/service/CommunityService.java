package kr.co.doby.web.service;

import kr.co.doby.web.entity.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CommunityService {

    List<CommunityView> getViewList(Integer page, Long categoryId, String query, Integer filterId);

    String checkFilterNameByFilterId(Integer filterId);

    List<CommunityCategory> getCommunityCategoryList();

    Community add(Community community);

    Community getById(Long id);

    List<CommunityTagView> getCommunityTagViewListById(Long id);

    Member getMemberByMemberId(Long memberId);

    Boolean isGood(Long id, Long memberId);

    String getCategoryNameByCategoryId(Long categoryId);

    void edit(Community community);

    void deleteById(Long id);

    Long getTotalDataCount(Long categoryId, String query);

    Long getCommentCountById(Long id);

    List<CommunityCommentView> getCommentViewListById(Long id, Long parentId, Authentication authentication);
}
