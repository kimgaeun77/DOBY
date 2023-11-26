package kr.co.doby.web.controller;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.*;
import kr.co.doby.web.service.CommunityService;
import kr.co.doby.web.service.SmalltalkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/smalltalk")
public class SmalltalkController {

    @Autowired
    private SmalltalkService service;

    @GetMapping("list")
    public String list(Model model) {
        List<SmalltalkView> list = service.getViewList(1, null, 1);
        model.addAttribute("list", list);
        return "smalltalk/list";
    }

    @GetMapping("detail")
    public String detail(Long id, Model model, Authentication authentication) {

        // 글 상세
        Smalltalk smalltalk = service.getById(id);
        // 스몰톡 태그 목록
        List<SmalltalkTagView> tagList = service.getSmalltalkTagViewListById(smalltalk.getId());
        // 작성자
        Member member =  service.getMemberByMemberId(smalltalk.getMemberId());

        // 좋아요 여부
        Boolean isGood = false;
        if(authentication != null) {
            DobyUserDetails userDetails = (DobyUserDetails) authentication.getPrincipal();
            Long memberId = userDetails.getId();
            isGood = service.isGood(smalltalk.getId(), memberId);
        }

        model.addAttribute("smalltalk", smalltalk);
        model.addAttribute("tagList", tagList);
        model.addAttribute("writer", member);
        model.addAttribute("isGood", isGood);

        return "smalltalk/detail";
    }

}
