package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithPosition;
import kr.co.doby.web.entity.WithPositionView;

import java.util.List;

public interface WithPositionService {
    void reg(WithPosition withPosition);

    List<WithPositionView> getList(Long withId);

    void delete(Long withId);

    void edit(WithPosition withPosition);
}
