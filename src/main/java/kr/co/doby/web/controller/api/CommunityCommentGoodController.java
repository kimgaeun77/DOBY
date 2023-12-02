package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityCommentGood;
import kr.co.doby.web.entity.CommunityCommentView;
import kr.co.doby.web.service.CommunityCommentGoodService;
import kr.co.doby.web.service.CommunityCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/community-comment-goods")
public class CommunityCommentGoodController {

    @Autowired
    private CommunityCommentGoodService service;

    // 등록
    @PostMapping
    public ResponseEntity reg(@RequestBody CommunityCommentGood communityCommentGood){
        service.add(communityCommentGood);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{member-id},{comment-id}")
                .buildAndExpand(communityCommentGood.getMemberId(), communityCommentGood.getCommentId())
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
