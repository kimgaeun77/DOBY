package kr.co.doby.web.controller.api;

import kr.co.doby.web.entity.SmalltalkBlindCancel;
import kr.co.doby.web.entity.SmalltalkBlindCancelView;
import kr.co.doby.web.service.SmalltalkBlindCancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController("apiSmalltalkBlindCancelController")
@RequestMapping("api/smalltalk-blind-cancels")
public class SmalltalkBlindCancelController {

    @Autowired
    SmalltalkBlindCancelService service;

    // 리스트 출력
    @GetMapping
    public List<SmalltalkBlindCancelView> list(
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
    public SmalltalkBlindCancelView detail(
            @RequestParam long id) {
        return service.getViewById(id);
    }

    // 처리중/승인/거절
    @PutMapping
    public SmalltalkBlindCancel edit(
            @RequestParam("id") Long smalltalkId,
            @RequestParam("s") Long statusId) {
        SmalltalkBlindCancel smalltalkBlindCancel = service.getById(smalltalkId);
        smalltalkBlindCancel.setStatusId(statusId);
        return service.modify(smalltalkBlindCancel);
    }

}
