package kr.co.doby.web.controller.member;

import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityCategory;
import kr.co.doby.web.entity.CommunityTagView;
import kr.co.doby.web.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller("memberCommunityController")
@RequestMapping("/member/community")
public class CommunityController {

    @Autowired
    private CommunityService service;

    // 등록 페이지
    @GetMapping("reg")
    public String reg(Model model) {
        List<CommunityCategory> communityCategoryList = service.getCommunityCategoryList();
        model.addAttribute("categoryList", communityCategoryList);
        return "member/community/reg";
    }


    // 수정 페이지
    @GetMapping("edit")
    public String edit(Long id, Model model){
        // 글 상세
        Community community = service.getById(id);
        // 해당 게시글 카테고리
        String categoryName = service.getCategoryNameByCategoryId(community.getCategoryId());
        // 커뮤니티 태그 목록
        List<CommunityTagView> tagList = service.getCommunityTagViewListById(id);
        // 커뮤니티 카테고리 정의 목록
        List<CommunityCategory> communityCategoryList = service.getCommunityCategoryList();

        model.addAttribute("community", community);
        model.addAttribute("tagList", tagList);
        model.addAttribute("categoryName", categoryName);
        model.addAttribute("categoryList", communityCategoryList);

        return "member/community/edit";
    }

}
