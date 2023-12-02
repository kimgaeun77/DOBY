package kr.co.doby.web.controller;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.*;
import kr.co.doby.web.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService service;

    // 목록
    @GetMapping("list")
    public String list(Model model) {
        List<CommunityView> list = service.getViewList(1, null, null, 1);
        List<CommunityCategory> communityCategoryList = service.getCommunityCategoryList();
        model.addAttribute("list", list);
        model.addAttribute("categoryList", communityCategoryList);
        return "community/list";
    }

    // 상세
    @GetMapping("detail")
    public String detail(Long id, Model model, Authentication authentication) {
        // 글 상세
        Community community = service.getById(id);

        // 커뮤니티 태그 목록
        List<CommunityTagView> tagList = service.getCommunityTagViewListById(community.getId());
        // 작성자
        Member member =  service.getMemberByMemberId(community.getMemberId());
        String categoryName = service.getCategoryNameByCategoryId(community.getCategoryId());

        // 좋아요 여부
        Boolean isGood = false;
        if(authentication != null) {
            DobyUserDetails userDetails = (DobyUserDetails) authentication.getPrincipal();
            Long memberId = userDetails.getId();
            isGood = service.isGood(community.getId(), memberId);
        }

        // 댓글 개수
        Long commentCount = service.getCommentCountById(id);

        // (부모)댓글 목록
        List<CommunityCommentView> commentList = service.getCommentViewListById(id, null, authentication);

        // 꺼내올것들 글 상세, 태그 목록, 게시글 카테고리 이름, 작성자, 요청자가 현재 게시글에 좋아요 눌렀는지
        model.addAttribute("community", community);
        model.addAttribute("tagList", tagList);
        model.addAttribute("writer", member);
        model.addAttribute("categoryName", categoryName);
        model.addAttribute("isGood", isGood);
        model.addAttribute("commentCount", commentCount);
        model.addAttribute("commentList", commentList);
        return "community/detail";
    }
}
