package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityView;
import kr.co.doby.web.entity.Smalltalk;
import kr.co.doby.web.entity.SmalltalkView;
import kr.co.doby.web.service.CommunityService;
import kr.co.doby.web.service.SmalltalkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController("apiSmalltalkController")
@RequestMapping("api/smalltalks")
public class SmalltalkController {

    @Autowired
    private SmalltalkService service;
    
    // 목록
    @GetMapping
    public ResponseEntity<List<SmalltalkView>> list(
                                    @RequestParam(value = "p", defaultValue = "1") Integer page,
                                    @RequestParam(value = "q",required = false) String query,
                                    @RequestParam(value = "f", defaultValue = "1") Integer filterId){
        List<SmalltalkView> list = service.getViewList(page, query, filterId);
        return ResponseEntity.ok(list);
    }


    //페이징 처리를 위한 함수
    @GetMapping("total-data")
    public Long totalData( @RequestParam(value = "q", required = false) String query){
        Long count = service.getTotalDataCount(query);
        return count;
    }

    // 등록
    @PostMapping
    public ResponseEntity<Smalltalk> reg(@RequestBody Smalltalk smalltalk){

       Smalltalk newOne = service.add(smalltalk);

       URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                      .path("/{id}")
                      .buildAndExpand(newOne.getId())
                      .toUri();

       return ResponseEntity.created(location).body(newOne);
    }

    // 수정
    @PutMapping
    public ResponseEntity edit(@RequestBody Smalltalk smalltalk){
        service.edit(smalltalk);
        return ResponseEntity.noContent().build();
    }

    // 삭제
    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
