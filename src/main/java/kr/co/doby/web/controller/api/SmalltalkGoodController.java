package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityGood;
import kr.co.doby.web.entity.SmalltalkGood;
import kr.co.doby.web.service.CommunityGoodService;
import kr.co.doby.web.service.SmalltalkGoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/smalltalk-goods")
public class SmalltalkGoodController {

    @Autowired
    private SmalltalkGoodService service;

    // 좋아요 추가
    @PostMapping
    public ResponseEntity reg(@RequestBody SmalltalkGood smalltalkGood){
        service.add(smalltalkGood);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{member-id},{smalltalk-id}")
                .buildAndExpand(smalltalkGood.getMemberId(), smalltalkGood.getSmalltalkId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    // 좋아요 삭제
    @DeleteMapping("{ids}")
    public ResponseEntity delete(@PathVariable Long[] ids){
        Long memberId = ids[0];
        Long smalltalkId = ids[1];
        service.delete(memberId, smalltalkId);
        return ResponseEntity.noContent().build();
    }
}
