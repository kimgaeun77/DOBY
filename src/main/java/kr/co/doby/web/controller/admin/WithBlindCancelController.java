package kr.co.doby.web.controller.admin;

import kr.co.doby.web.entity.WithBlindCancelView;
import kr.co.doby.web.service.WithBlindCancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("admin/with-blind-cancel")
public class WithBlindCancelController {


    @Autowired
    WithBlindCancelService withBlindCancelService;


    @GetMapping("list")
    public String withList(Model model) {
        List<WithBlindCancelView> list = withBlindCancelService.getViewList(1, null);
        model.addAttribute("withList", list);
        Double pages = withBlindCancelService.countPage(null);
        model.addAttribute("totalPage", pages);
        return "admin/with-blind-cancel/list";
    }

    @GetMapping("detail")
    public String withDetail(Model model,
                             @RequestParam long id) {
        WithBlindCancelView detail = withBlindCancelService.getViewById(id);
        model.addAttribute("withBlindCancelDetail", detail);
        return "admin/with-blind-cancel/detail";
    }

}
