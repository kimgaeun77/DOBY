package kr.co.doby.web.repository;

import kr.co.doby.web.entity.SmalltalkGood;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SmalltalkGoodRepository {
    SmalltalkGood findById(Long id, Long memberId);

    void save(SmalltalkGood smalltalkGood);

    void delete(Long memberId, Long smalltalkId);
}
