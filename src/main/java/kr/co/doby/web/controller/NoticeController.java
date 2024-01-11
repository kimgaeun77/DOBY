package kr.co.doby.web.controller;

import kr.co.doby.web.entity.SmalltalkView;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    @GetMapping("list")
    public String list(Model model) {
        return "etc/construction";
    }

}
