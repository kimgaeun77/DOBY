package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityTag;
import kr.co.doby.web.service.CommunityTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/community-tags")
public class CommunityTagController {

    @Autowired
    private CommunityTagService service;

    @PostMapping
    public ResponseEntity reg(@RequestBody CommunityTag communityTag){
        service.add(communityTag);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{community-id}")
    public ResponseEntity delete(@PathVariable("community-id")Long communityId){
        service.deleteByCommunityId(communityId);
        return ResponseEntity.noContent().build();
    }


}
