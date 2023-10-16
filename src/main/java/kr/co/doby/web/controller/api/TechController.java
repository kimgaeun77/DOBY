package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.Tech;
import kr.co.doby.web.service.TechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiTechController")
@RequestMapping("api/techs")
public class TechController {

    @Autowired
    private TechService service;

    @GetMapping
    public ResponseEntity<List<Tech>> list() {

        List<Tech> list = service.getList();

        return ResponseEntity.ok(list);
    }

}
