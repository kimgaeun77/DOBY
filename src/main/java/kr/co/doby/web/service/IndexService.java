package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityView;
import kr.co.doby.web.entity.PopularView;
import kr.co.doby.web.entity.SmalltalkView;
import kr.co.doby.web.entity.WithView;

import java.text.ParseException;
import java.util.List;

public interface IndexService {
    List<WithView> getNearDeadlineWithList() throws ParseException;

    List<CommunityView> getCommunityViewList(Integer page, Long categoryId, String query, Integer filterId);

    String checkFilterNameByFilterId(Integer filterId);

    List<SmalltalkView> getSmalltalkViewList(Integer page, String query, Integer filterId);

    List<PopularView> getPopularViewList(Integer page, Integer filterId);
}
