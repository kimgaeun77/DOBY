package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.With;
import kr.co.doby.web.entity.WithView;
import kr.co.doby.web.etc.Paging;
import kr.co.doby.web.service.WithService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController("apiWithController")
@RequestMapping("/api/withs")
public class WithController {

    @Autowired
    private WithService service;

    @GetMapping
    public ResponseEntity<List<WithView>> list(
            @RequestParam(name = "p", defaultValue = "1") Integer page,
            @RequestParam(name = "c", required = false) Long categoryId,
            @RequestParam(name = "q", required = false) String query,
            @RequestParam(name = "t", required = false) List<Long> techList,
            @RequestParam(name = "po", required = false) Long positionId,
            @RequestParam(name = "w", required = false) Long wayId,
            @RequestParam(name = "wi", required = false) Boolean isWish
    ) {
        List<WithView> list = service.getViewList(page, categoryId, query, techList, positionId, wayId, isWish);
        return ResponseEntity.ok(list);
    }

    @GetMapping("paging")
    public ResponseEntity<Paging> page(
            @RequestParam(name = "p", defaultValue = "1") Integer page,
            @RequestParam(name = "c", required = false) Long categoryId,
            @RequestParam(name = "q", required = false) String query,
            @RequestParam(name = "t", required = false) List<Long> techList,
            @RequestParam(name = "po", required = false) Long positionId,
            @RequestParam(name = "w", required = false) Long wayId,
            @RequestParam(name = "wi", required = false) Boolean isWish
    ) {
        Paging paging = service.getPagingInfo(page, categoryId, query, techList, positionId, wayId, isWish);
        return ResponseEntity.ok(paging);
    }

    @PostMapping
    public ResponseEntity<With> reg(@RequestBody With with) {

        With saveWith = service.reg(with);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saveWith.getId())
                .toUri();

        return ResponseEntity.created(location).body(saveWith);
    }


    @PutMapping
    public ResponseEntity<With> edit(@RequestBody With with) {

        With editWith = service.edit(with);

        return ResponseEntity.ok(editWith);
    }

    @DeleteMapping("{with-id}")
    public ResponseEntity<?> delete(@PathVariable("with-id") Long id) {

        boolean result = service.delete(id);

        if (!result)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.noContent().build();
    }
}
