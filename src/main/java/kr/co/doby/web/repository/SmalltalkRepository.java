package kr.co.doby.web.repository;

import kr.co.doby.web.entity.Community;
import kr.co.doby.web.entity.CommunityView;
import kr.co.doby.web.entity.Smalltalk;
import kr.co.doby.web.entity.SmalltalkView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SmalltalkRepository {

    List<SmalltalkView> findViewAll(int offset, int size, String query, String filterName);

    void save(Smalltalk smalltalk);

    Smalltalk last();

    Smalltalk findById(Long id);

    void updateHitCount(Long id);

    void update(Smalltalk smalltalk);

    void delete(Long id);

    Long findAllCount(String query);
}
