package kr.co.doby.web.controller;

import kr.co.doby.web.entity.WithView;
import kr.co.doby.web.service.IndexService;
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

    @GetMapping
    public String index(Model model) throws ParseException {


        List<WithView> deadlineList = service.getNearDeadlineWithList();

        model.addAttribute("deadlineList", deadlineList);

        return "index";
    }
}
