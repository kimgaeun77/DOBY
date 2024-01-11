package kr.co.doby.web.controller.admin;

import kr.co.doby.web.entity.CommunityBlindCancelView;
import kr.co.doby.web.service.CommunityBlindCancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("admin/community-blind-cancel")
public class CommunityBlindCancelController {

    @Autowired
    CommunityBlindCancelService communityBlindCancelService;


    @GetMapping("list")
    public String communityList(Model model) {
        List<CommunityBlindCancelView> list = communityBlindCancelService.getViewList(1, null);
        model.addAttribute("communityList", list);
        Double pages = communityBlindCancelService.countPage(null);
        model.addAttribute("totalPage", pages);
        return "admin/community-blind-cancel/list";
    }

    @GetMapping("detail")
    public String communityDetail(Model model,
                                  @RequestParam long id) {
        CommunityBlindCancelView detail = communityBlindCancelService.getViewById(id);
        model.addAttribute("communityBlindCancelDetail", detail);
        return "admin/community-blind-cancel/detail";
    }

}
