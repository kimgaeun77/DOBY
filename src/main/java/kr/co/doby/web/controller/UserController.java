package kr.co.doby.web.controller;

import kr.co.doby.web.entity.Member;
import kr.co.doby.web.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private MemberService service;

    @GetMapping("login")
    public String login() {
        return "user/login";
    }

    @GetMapping("join")
    public String join() {
        return "user/join";
    }

    @GetMapping("privacy-policy")
    public String privacyPolicy() {
        return "user/privacyPolicy";
    }

    @PostMapping("join")
    public String join(
            String username,
            String password,
            String phone,
            String email,
            Boolean emailAgree
    ) {
        Boolean emailAgree_ = true;
        if (emailAgree == null)
            emailAgree_ = false;
        Member member = Member
                .builder()
                .username(username)
                .password(password)
                .phone(phone)
                .email(email)
                .emailAgree(emailAgree_)
                .build();
        service.join(member);
        return "redirect:./login";
    }

}
