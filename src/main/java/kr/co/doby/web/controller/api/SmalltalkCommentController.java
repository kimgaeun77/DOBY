package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.SmalltalkComment;
import kr.co.doby.web.entity.SmalltalkCommentView;
import kr.co.doby.web.service.SmalltalkCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/smalltalk-comments")
public class SmalltalkCommentController {

    @Autowired
    private SmalltalkCommentService service;

    // 목록
    @GetMapping
    public ResponseEntity<List<SmalltalkCommentView>> list(
                                                           @RequestParam("smalltalk-id") Long smalltalkId,
                                                           @RequestParam(name = "p-id", required = false) Long parentId,
                                                           Authentication authentication){
        List<SmalltalkCommentView> list = service.getViewListBySmalltalkId(smalltalkId, parentId, authentication);
        return ResponseEntity.ok(list);
    }

    @GetMapping("count")
    public Long count(@RequestParam("smalltalk-id") Long smalltalkId){
        return service.getCountBySmalltalkId(smalltalkId);
    }

    // 등록
    @PostMapping
    public ResponseEntity<SmalltalkComment> reg(@RequestBody SmalltalkComment smalltalkComment){
        SmalltalkComment newOne = service.add(smalltalkComment);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newOne.getId())
                .toUri();

        return ResponseEntity.created(location).body(newOne);
    }

    // 삭제
    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
