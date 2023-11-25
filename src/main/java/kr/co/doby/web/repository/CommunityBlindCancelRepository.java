package kr.co.doby.web.repository;

import kr.co.doby.web.entity.CommunityBlindCancel;
import kr.co.doby.web.entity.CommunityBlindCancelView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityBlindCancelRepository {

    //리스트출력
    List<CommunityBlindCancelView> findViewAll(int offset, int size, String query);

    //페이징
    Long countViewByQuery(String query);

    //상세페이지
    CommunityBlindCancelView findViewById(Long id);

    //상태변경
    CommunityBlindCancel findById(Long communityId);

    //상태변경
    void updateStatus(CommunityBlindCancel communityBlindCancel);

}
