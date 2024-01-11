package kr.co.doby.web.controller;

import kr.co.doby.web.entity.CommunityView;
import kr.co.doby.web.entity.PopularView;
import kr.co.doby.web.entity.SmalltalkView;
import kr.co.doby.web.entity.WithView;
import kr.co.doby.web.service.CommunityService;
import kr.co.doby.web.service.IndexService;
import kr.co.doby.web.service.SmalltalkService;
import kr.co.doby.web.service.WithService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParseException;
import java.util.List;

@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private IndexService service;

    @GetMapping
    public String index(Model model) throws ParseException {

        // 모임 카드
        List<WithView> deadlineList = service.getNearDeadlineWithList();

        // 인기 게시글(커뮤니티, 스몰톡)
        List<PopularView> popularList = service.getPopularViewList(1, 3);

        // 커뮤니티
        List<CommunityView> communityList = service.getCommunityViewList(1, null, null, 1);

        // 모임
        List<WithView> withList = service.getWithViewList(1, null, null, null, null, null, null, null);

        // 스몰톡
        List<SmalltalkView> smalltalkList = service.getSmalltalkViewList(1, null, 1);


        model.addAttribute("deadlineList", deadlineList);
        model.addAttribute("popularList", popularList);
        model.addAttribute("communityList", communityList);
        model.addAttribute("withList", withList);
        model.addAttribute("smalltalkList", smalltalkList);

        return "index";
    }
}
