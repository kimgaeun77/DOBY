package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.WithComment;
import kr.co.doby.web.entity.WithCommentView;
import kr.co.doby.web.service.WithCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("apiWithCommentController")
@RequestMapping("api/with-comments")
public class WithCommentController {

    @Autowired
    private WithCommentService service;

    @GetMapping()
    public ResponseEntity<List<WithCommentView>> list(
            @RequestParam(name = "wid", required = false) Long withId,
            @RequestParam(name = "pid", required = false) Long parentId) {

        List<WithCommentView> list = service.getCommentList(withId, parentId);

        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<?> reg(@RequestBody WithComment withComment) {
        service.reg(withComment);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
