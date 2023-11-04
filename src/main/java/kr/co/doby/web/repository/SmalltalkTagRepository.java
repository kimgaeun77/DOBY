package kr.co.doby.web.repository;

import kr.co.doby.web.entity.SmalltalkTag;
import kr.co.doby.web.entity.SmalltalkTagView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SmalltalkTagRepository {
    List<SmalltalkTagView> findViewAllBySmalltalkId(Long id);

    void save(SmalltalkTag smalltalkTag);

    void deleteBySmalltalkId(Long smalltalkId);
}
