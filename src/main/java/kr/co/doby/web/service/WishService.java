package kr.co.doby.web.service;

public interface WishService {
    void reg(Long withId, Long memberId);

    void delete(Long withId, Long memberId);
}