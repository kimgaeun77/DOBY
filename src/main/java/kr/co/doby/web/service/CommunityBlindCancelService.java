package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityBlindCancel;
import kr.co.doby.web.entity.CommunityBlindCancelView;

import java.util.List;

public interface CommunityBlindCancelService {

    List<CommunityBlindCancelView> getViewList(Integer page, String query);

    Double countPage(String query);

    Long countViewByQuery(String query);

    CommunityBlindCancelView getViewById(Long id);

    CommunityBlindCancel modify(CommunityBlindCancel communityBlindCancel);

    CommunityBlindCancel getById(Long communityId);

}
