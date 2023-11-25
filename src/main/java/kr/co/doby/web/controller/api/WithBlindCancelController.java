package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.WithBlindCancel;
import kr.co.doby.web.entity.WithBlindCancelView;
import kr.co.doby.web.service.WithBlindCancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("apiWithBlindCancelController")
@RequestMapping("api/with-blind-cancels")
public class WithBlindCancelController {

    @Autowired
    WithBlindCancelService service;

    // 리스트 출력
    @GetMapping
    public List<WithBlindCancelView> list(
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
    public WithBlindCancelView detail(
            @RequestParam long id) {
        return service.getViewById(id);
    }

    // 처리중/승인/거절
    @PutMapping
    public WithBlindCancel edit(
            @RequestParam("id") Long withId,
            @RequestParam("s") Long statusId) {
        WithBlindCancel withBlindCancel = service.getById(withId);
        withBlindCancel.setStatusId(statusId);
        return service.modify(withBlindCancel);
    }
}
