package kr.co.doby.web.controller;

import kr.co.doby.web.entity.*;
import kr.co.doby.web.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String detail(Long id, Model model) {
        // 글 상세
        Community community = service.getById(id);
        // 커뮤니티 태그 목록
        List<CommunityTagView> tagList = service.getCommunityTagViewListById(community.getId());
        // 작성자
        Member member =  service.getMemberByMemberId(community.getMemberId());
        String categoryName = service.getCategoryNameByCategoryId(community.getCategoryId());

        // 좋아요 여부 (현재 요청한 사용자 아이디와 조회할 게시글 번호를 가지고 community_good 테이블에서 확인)
        // DobyUserDetails userDetails = (DobyUserDetails)authentication.getPrincipal();
        // Long memberId = userDetails.getId();
        // 임시 테스트
        Long memberId = 1L;
        Boolean isGood = service.isGood(community.getId(), memberId);

        // 꺼내올것들 글 상세, 태그 목록, 게시글 카테고리 이름, 작성자, 요청자가 현재 게시글에 좋아요 눌렀는지
        model.addAttribute("community", community);
        model.addAttribute("tagList", tagList);
        model.addAttribute("writer", member);
        model.addAttribute("categoryName", categoryName);
        model.addAttribute("isGood", isGood);
        return "community/detail";
    }
}
