package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.SmalltalkCommentGood;
import kr.co.doby.web.service.SmalltalkCommentGoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/smalltalk-comment-goods")
public class SmalltalkCommentGoodController {

    @Autowired
    private SmalltalkCommentGoodService service;

    // 등록
    @PostMapping
    public ResponseEntity reg(@RequestBody SmalltalkCommentGood smalltalkCommentGood){
        service.add(smalltalkCommentGood);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{member-id},{comment-id}")
                .buildAndExpand(smalltalkCommentGood.getMemberId(), smalltalkCommentGood.getCommentId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    // 삭제
    @DeleteMapping("{ids}")
    public ResponseEntity delete(@PathVariable Long[] ids){
        Long memberId = ids[0];
        Long commentId = ids[1];
        service.deleteById(memberId, commentId);
        return ResponseEntity.noContent().build();
    }

}
