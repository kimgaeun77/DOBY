package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkBlindCancel;
import kr.co.doby.web.entity.SmalltalkBlindCancelView;

import java.util.List;

public interface SmalltalkBlindCancelService {

    List<SmalltalkBlindCancelView> getViewList(Integer page, String query);

    Double countPage(String query);

    Long countViewByQuery(String query);

    SmalltalkBlindCancelView getViewById(Long id);

    SmalltalkBlindCancel modify(SmalltalkBlindCancel smalltalkBlindCancel);

    SmalltalkBlindCancel getById(Long smalltalkId);

}
