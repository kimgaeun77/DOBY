package kr.co.doby.web.controller.api;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.Member;
import kr.co.doby.web.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("apiMemberController")
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping
    public List<Member> list(
            @RequestParam(name = "p", defaultValue = "1") Integer page,
            @RequestParam(name = "q", required = false) String query
    ) {
        List<Member> list = service.getList(page, query);
        return list;
    }

    @GetMapping("uniqueCheck")
    @ResponseBody
    public String duplicationCheck(
            @RequestParam(name = "u", required = false) String username,
            @RequestParam(name = "e", required = false) String email,
            @RequestParam(name = "p", required = false) String phone

    ) {
        if (service.usernameCheck(username) > 0) return "usernameAlready";
        else if (service.phoneCheck(phone) > 0) return "phoneAlready";
        else if (service.emailCheck(email) > 0) return "emailAlready";
        else
            return "AllIsWell";
    }

    @GetMapping("count")
    public Long countList(
            @RequestParam(name = "q", required = false) String query
    ) {
        Long countList = service.countByQuery(query);
        return countList;
    }


}
