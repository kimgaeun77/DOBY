package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.CommunityBlindCancel;
import kr.co.doby.web.entity.CommunityBlindCancelView;
import kr.co.doby.web.service.CommunityBlindCancelService;
import kr.co.doby.web.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController("apiCommunityBlindCancelController")
@RequestMapping("api/community-blind-cancels")
public class CommunityBlindCancelController {

    @Autowired
    private CommunityBlindCancelService service;

    // 리스트 출력
    @GetMapping
    public List<CommunityBlindCancelView> list(
            @RequestParam(name = "p", defaultValue = "1") Integer page,
            @RequestParam(name = "q", required = false) String query
    ) {
        return service.getViewList(page, query);
    }

    // 페이징을 위한 카운트
    @GetMapping("count")
    public Long countList(
            @RequestParam(name = "q", required = false) String query
    ) {
        return service.countViewByQuery(query);
    }

    // 상세페이지 출력
    @GetMapping("{id}")
    public CommunityBlindCancelView detail(
            @RequestParam long id) {
        return service.getViewById(id);
    }

    // 처리중/승인/거절
    @PutMapping
    public CommunityBlindCancel edit(
            @RequestParam("id") Long communityId,
            @RequestParam("s") Long statusId) {
        CommunityBlindCancel communityBlindCancel = service.getById(communityId);
        communityBlindCancel.setStatusId(statusId);
        return service.modify(communityBlindCancel);
    }

}
