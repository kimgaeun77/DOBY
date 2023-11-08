package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithContact;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WithContactRepository {
    WithContact findById(Long contactId);
}
