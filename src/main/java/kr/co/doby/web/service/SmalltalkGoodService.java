package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkGood;

public interface SmalltalkGoodService {
    public void add(SmalltalkGood smalltalkGood);

    void delete(Long memberId, Long smalltalkId);
}
