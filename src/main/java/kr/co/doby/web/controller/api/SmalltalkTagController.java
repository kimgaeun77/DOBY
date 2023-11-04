package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityTag;
import kr.co.doby.web.entity.SmalltalkTag;
import kr.co.doby.web.service.CommunityTagService;
import kr.co.doby.web.service.SmalltalkService;
import kr.co.doby.web.service.SmalltalkTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/smalltalk-tags")
public class SmalltalkTagController {

    @Autowired
    private SmalltalkTagService service;

    @PostMapping
    public ResponseEntity reg(@RequestBody SmalltalkTag smalltalkTag){
        service.add(smalltalkTag);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{smalltalk-id}")
    public ResponseEntity delete(@PathVariable("smalltalk-id")Long smalltalkId){
        service.deleteBySmalltalkId(smalltalkId);
        return ResponseEntity.noContent().build();
    }


}
