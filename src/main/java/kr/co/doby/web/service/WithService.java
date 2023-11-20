package kr.co.doby.web.service;

import kr.co.doby.web.entity.*;
import kr.co.doby.web.etc.Paging;

import java.text.ParseException;
import java.util.List;

public interface WithService {

    With getById(Long id);

    WithCategory getCategoryById(Long categoryId);

    WithWay getWayById(Long wayId);

    WithPeriod getPeriodById(Long periodId);

    WithContact getContactById(Long contactId);

    List<WithPositionView> getPositionViewListById(Long id);

    List<WithTechView> getTechViewListById(Long id);

    int getCapacityById(Long id);

    List<WithCommentView> getCommentViewById(Long id);

    With reg(With with, Long memberId);

    boolean checkWish(Long id, Long memberId);

    boolean delete(Long id, Long memberId);

    Member getMemberByMemberId(Long memberId);

    boolean isAuthor(Long memberId, Long currentId);

    List<Tech> getTechList();

    With edit(With with);

    List<WithView> getViewList(Integer page, Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish, Long memberId);

    List<WithView> getNearDeadlineList() throws ParseException;

    Paging getPagingInfo(Integer page, Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish);

    int getCommentCount(Long id);
}