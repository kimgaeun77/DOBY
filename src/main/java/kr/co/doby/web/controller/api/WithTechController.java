package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.WithTech;
import kr.co.doby.web.service.WithTechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("apiWithTechController")
@RequestMapping("/api/with-techs")
public class WithTechController {

    @Autowired
    private WithTechService service;

    @PostMapping
    public ResponseEntity<WithTech> reg(@RequestBody WithTech withTech) {

        service.reg(withTech);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{with-id}")
    public ResponseEntity<?> delete(@PathVariable("with-id") Long withId) {
        service.delete(withId);
        return ResponseEntity.noContent().build();
    }

}
