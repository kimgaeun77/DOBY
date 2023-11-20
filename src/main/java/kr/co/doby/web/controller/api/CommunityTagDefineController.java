package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityTagDefine;
import kr.co.doby.web.service.CommunityTagDefineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/community-tag-defines")
public class CommunityTagDefineController {

    @Autowired
    private CommunityTagDefineService service;
    @GetMapping
    public List<CommunityTagDefine> list(@RequestParam("q") String query) {

        List<CommunityTagDefine> tagList = service.getList(query);
        return tagList;
    }

}
