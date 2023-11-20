package kr.co.doby.web.controller.member;

import kr.co.doby.web.entity.*;
import kr.co.doby.web.service.SmalltalkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller("memberSmalltalkController")
@RequestMapping("/member/smalltalk")
public class SmalltalkController {

    @Autowired
    private SmalltalkService service;

    // 등록 페이지
    @GetMapping("reg")
    public String reg() {
        return "member/smalltalk/reg";
    }

    // 수정 페이지
    @GetMapping("edit")
    public String edit(Long id, Model model){
        // 글 상세
        Smalltalk smalltalk = service.getById(id);
        // 스몰톡 태그 목록
        List<SmalltalkTagView> tagList = service.getSmalltalkTagViewListById(id);

        model.addAttribute("smalltalk", smalltalk);
        model.addAttribute("tagList", tagList);

        return "member/smalltalk/edit";
    }


}
