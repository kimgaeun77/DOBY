package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityGood;
import kr.co.doby.web.service.CommunityGoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/community-goods")
public class CommunityGoodController {

    @Autowired
    private CommunityGoodService service;

    // 좋아요 추가
    @PostMapping
    public ResponseEntity reg(@RequestBody CommunityGood communityGood){
        service.add(communityGood);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{member-id},{community-id}")
                .buildAndExpand(communityGood.getMemberId(), communityGood.getCommunityId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    // 좋아요 삭제
    @DeleteMapping("{ids}")
    public ResponseEntity delete(@PathVariable Long[] ids){
        Long memberId = ids[0];
        Long communityId = ids[1];
        service.delete(memberId, communityId);
        return ResponseEntity.noContent().build();
    }
}
