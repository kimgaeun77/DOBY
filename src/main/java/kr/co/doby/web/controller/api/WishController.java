package kr.co.doby.web.controller.api;

import kr.co.doby.web.service.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController("apiWishController")
@RequestMapping("api/wishs")
public class WishController {

    @Autowired
    private WishService service;

    @PostMapping("{with-id}")
    public HttpStatus reg(@PathVariable("with-id") Long withId) {

        service.reg(withId);

        return HttpStatus.OK;
    }

    @DeleteMapping("{with-id}")
    public HttpStatus delete(@PathVariable("with-id") Long withId) {

        service.delete(withId);

        return HttpStatus.OK;
    }
}
