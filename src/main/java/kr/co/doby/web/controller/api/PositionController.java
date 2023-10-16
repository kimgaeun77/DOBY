package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.Position;
import kr.co.doby.web.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiPositionController")
@RequestMapping("api/positions")
public class PositionController {

    @Autowired
    private PositionService service;

    @GetMapping
    public ResponseEntity<List<Position>> list() {
        List<Position> list = service.getList();
        return ResponseEntity.ok(list);
    }

}
