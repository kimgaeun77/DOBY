package kr.co.doby.web.repository;

import kr.co.doby.web.entity.SmalltalkBlindCancel;
import kr.co.doby.web.entity.SmalltalkBlindCancelView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SmalltalkBlindCancelRepository {

    //리스트출력
    List<SmalltalkBlindCancelView> findViewAll(int offset, int size, String query);

    //페이징
    Long countViewByQuery(String query);

    //상세페이지
    SmalltalkBlindCancelView findViewById(Long id);

    //상태변경
    SmalltalkBlindCancel findById(Long smalltalkId);

    //상태변경
    void updateStatus(SmalltalkBlindCancel smalltalkBlindCancel);

}
