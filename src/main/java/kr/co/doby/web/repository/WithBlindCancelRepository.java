package kr.co.doby.web.repository;

import kr.co.doby.web.entity.WithBlindCancel;
import kr.co.doby.web.entity.WithBlindCancelView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithBlindCancelRepository {

    //리스트출력
    List<WithBlindCancelView> findViewAll(int offset, int size, String query);

    //페이징
    Long countViewByQuery(String query);

    //상세페이지
    WithBlindCancelView findViewById(Long id);

    //상태변경
    WithBlindCancel findById(Long withId);

    //상태변경
    void updateStatus(WithBlindCancel withBlindCancel);

}
