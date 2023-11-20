package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkTag;

public interface SmalltalkTagService {
    void add(SmalltalkTag smalltalkTag);

    void deleteBySmalltalkId(Long smalltalkId);
}
