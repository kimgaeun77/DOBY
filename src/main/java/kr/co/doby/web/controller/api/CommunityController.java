package kr.co.doby.web.controller.api;

import jakarta.servlet.Servlet;
import jakarta.servlet.ServletRequest;
import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityView;
import kr.co.doby.web.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController("apiCommunityController")
@RequestMapping("api/communitys")
public class CommunityController {

    @Autowired
    private CommunityService service;
    
    // 목록
    @GetMapping
    public ResponseEntity<List<CommunityView>> list(
                                    @RequestParam(value = "p", defaultValue = "1") Integer page,
                                    @RequestParam(value = "c", required = false) Long categoryId,
                                    @RequestParam(value = "q", required = false) String query,
                                    @RequestParam(value = "f", defaultValue = "1") Integer filterId){
        List<CommunityView> list = service.getViewList(page, categoryId, query, filterId);
        return ResponseEntity.ok(list);
    }

    //페이징 처리를 위한 함수
    @GetMapping("total-data")
    public Long totalData(
                             @RequestParam(value = "c", required = false) Long categoryId,
                             @RequestParam(value = "q", required = false) String query){
        Long count = service.getTotalDataCount(categoryId, query);
        return count;
    }

    
    // 등록
    @PostMapping
    public ResponseEntity<Community> reg(@RequestBody Community community){
       Community newOne = service.add(community);

       URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                      .path("/{id}")
                      .buildAndExpand(newOne.getId())
                      .toUri();

       return ResponseEntity.created(location).body(newOne);
    }

    // 수정
    @PutMapping
    public ResponseEntity edit(@RequestBody Community community){
        service.edit(community);
        return ResponseEntity.noContent().build();
    }

    // 삭제
    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
