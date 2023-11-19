package kr.co.doby.web.repository;

import kr.co.doby.web.entity.With;
import kr.co.doby.web.entity.WithView;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WithRepository {

    With findById(Long id);

    void save(With with);

    With last();

    void deleteById(Long id);

    void update(With with);

    List<WithView> findViewAll(int offset, int size, Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish, Long memberId);

    List<WithView> findViewAllByOrderByDeadlineAsc();

    Integer count(Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish, Long memberId);

    void updateHitById(Long id);
}
