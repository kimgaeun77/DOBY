package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithBlindCancel;
import kr.co.doby.web.entity.WithBlindCancelView;

import java.util.List;

public interface WithBlindCancelService {

    List<WithBlindCancelView> getViewList(Integer page, String query);

    Double countPage(String query);

    Long countViewByQuery(String query);

    WithBlindCancelView getViewById(Long id);

    WithBlindCancel modify(WithBlindCancel withBlindCancel);

    WithBlindCancel getById(Long withId);

}
