package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityComment;
import kr.co.doby.web.entity.CommunityCommentView;
import kr.co.doby.web.entity.CommunityView;
import kr.co.doby.web.service.CommunityCommentService;
import kr.co.doby.web.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/community-comments")
public class CommunityCommentController {

    @Autowired
    private CommunityCommentService service;

    // 목록
    @GetMapping
    public ResponseEntity<List<CommunityCommentView>> list(
                                                           @RequestParam("community-id") Long communityId,
                                                           @RequestParam(name = "p-id", required = false) Long parentId,
                                                           Authentication authentication){
        List<CommunityCommentView> list = service.getViewListByCommunityId(communityId, parentId, authentication);
        return ResponseEntity.ok(list);
    }

    @GetMapping("count")
    public Long count(@RequestParam("community-id") Long communityId){
        return service.getCountByCommunityId(communityId);
    }

    // 등록
    @PostMapping
    public ResponseEntity<CommunityComment> reg(@RequestBody CommunityComment communityComment){
        CommunityComment newOne = service.add(communityComment);
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
