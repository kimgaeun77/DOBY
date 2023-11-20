package kr.co.doby.web.controller;

import kr.co.doby.web.entity.WithView;
import kr.co.doby.web.service.IndexService;
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
    IndexService service;

    @Autowired
    private WithService withService;

    @GetMapping
    public String index(Model model) throws ParseException {

        List<WithView> deadlineList = service.getNearDeadlineWithList();
        List<WithView> withList = withService.getViewList(1, null, null, null, null, null, null, null);

        model.addAttribute("deadlineList", deadlineList);
        model.addAttribute("withList", withList);

        return "index";
    }
}
