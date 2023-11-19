package kr.co.doby.web.controller.member;

import kr.co.doby.web.config.auth.DobyUserDetails;
import kr.co.doby.web.entity.*;
import kr.co.doby.web.service.WithService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller("memberWithController")
@RequestMapping("member/with")
public class WithController {
    @Autowired
    private WithService service;

    @GetMapping("reg")
    public String reg(Model model) {
        List<Tech> techList = service.getTechList();

        model.addAttribute("techList", techList);

        return "with/reg";
    }

    @GetMapping("edit")
    public String edit(Long id, Model model, @AuthenticationPrincipal DobyUserDetails loginMember) {

        With with = service.getById(id);

        if (with.getBlind() || with.getDel())
            return "error/404";

        Long memberId = with.getMemberId();
        boolean result = service.isAuthor(memberId, loginMember.getId());

        if (!result)
            return "error/403";


        Long categoryId = with.getCategoryId();
        Long wayId = with.getWayId();
        Long periodId = with.getPeriodId();
        Long contactId = with.getContactId();

        Member member = service.getMemberByMemberId(memberId);
        WithCategory category = service.getCategoryById(categoryId);
        WithWay way = service.getWayById(wayId);
        WithPeriod period = service.getPeriodById(periodId);
        WithContact contact = service.getContactById(contactId);
        int capacity = service.getCapacityById(id);

        List<WithPositionView> positionList = service.getPositionViewListById(id);
        List<WithTechView> techList = service.getTechViewListById(id);

        boolean isWish = service.checkWish(id, loginMember.getId());
        model.addAttribute("isWish", isWish);

        model.addAttribute("with", with);
        model.addAttribute("member", member);
        model.addAttribute("category", category);
        model.addAttribute("way", way);
        model.addAttribute("period", period);
        model.addAttribute("contact", contact);
        model.addAttribute("positionList", positionList);
        model.addAttribute("techList", techList);
        model.addAttribute("capacity", capacity);


        return "with/edit";
    }
}