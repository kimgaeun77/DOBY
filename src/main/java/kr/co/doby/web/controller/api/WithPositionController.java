package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.WithPosition;
import kr.co.doby.web.entity.WithPositionView;
import kr.co.doby.web.service.WithPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("apiWithPositionController")
@RequestMapping("/api/with-positions")
public class WithPositionController {

    @Autowired
    private WithPositionService service;

    @GetMapping("{with-id}")
    public ResponseEntity<List<WithPositionView>> list(@PathVariable("with-id") Long withId) {
        List<WithPositionView> list = service.getList(withId);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<WithPosition> reg(@RequestBody WithPosition withPosition) {
        service.reg(withPosition);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<WithPosition> edit(@RequestBody WithPosition withPosition) {
        service.edit(withPosition);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{with-id}")
    public ResponseEntity<?> delete(@PathVariable("with-id") Long withId) {
        service.delete(withId);
        return ResponseEntity.noContent().build();
    }

}
