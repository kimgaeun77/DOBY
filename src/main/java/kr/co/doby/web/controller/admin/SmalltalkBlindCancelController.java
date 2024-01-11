package kr.co.doby.web.controller.admin;

import kr.co.doby.web.entity.SmalltalkBlindCancelView;
import kr.co.doby.web.service.SmalltalkBlindCancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("admin/smalltalk-blind-cancel")
public class SmalltalkBlindCancelController {


    @Autowired
    SmalltalkBlindCancelService smalltalkBlindCancelService;


    @GetMapping("list")
    public String smalltalkList(Model model) {
        List<SmalltalkBlindCancelView> list = smalltalkBlindCancelService.getViewList(1, null);
        model.addAttribute("smalltalkList", list);
        Double pages = smalltalkBlindCancelService.countPage(null);
        model.addAttribute("totalPage", pages);
        return "admin/smalltalk-blind-cancel/list";
    }

    @GetMapping("detail")
    public String smalltalkDetail(Model model,
                                  @RequestParam Long id) {
        SmalltalkBlindCancelView detail = smalltalkBlindCancelService.getViewById(id);
        model.addAttribute("smalltalkBlindCancelDetail", detail);
        return "admin/smalltalk-blind-cancel/detail";
    }
}
