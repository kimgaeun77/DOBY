package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityTagDefine;
import kr.co.doby.web.entity.SmalltalkTagDefine;
import kr.co.doby.web.service.CommunityTagDefineService;
import kr.co.doby.web.service.SmalltalkTagDefineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/smalltalk-tag-defines")
public class SmalltalkTagDefineController {

    @Autowired
    private SmalltalkTagDefineService service;
    @GetMapping
    public List<SmalltalkTagDefine> list(@RequestParam("q") String query) {

        List<SmalltalkTagDefine> tagList = service.getList(query);
        return tagList;
    }

}
