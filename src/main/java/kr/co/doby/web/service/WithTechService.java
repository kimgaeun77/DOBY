package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithTech;

public interface WithTechService {
    void reg(WithTech withTech);

    void edit(WithTech withTech);

    void delete(Long withId);
}
