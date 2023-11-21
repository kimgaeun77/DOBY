package kr.co.doby.web.service;

import kr.co.doby.web.entity.*;

import java.util.List;

public interface SmalltalkService {

    List<SmalltalkView> getViewList(Integer page, String query, Integer filterId);

    String checkFilterNameByFilterId(Integer filterId);

    Smalltalk add(Smalltalk smalltalk);

    Smalltalk getById(Long id);

    List<SmalltalkTagView> getSmalltalkTagViewListById(Long id);

    Member getMemberByMemberId(Long memberId);

    Boolean isGood(Long id, Long memberId);

    void edit(Smalltalk smalltalk);

    void deleteById(Long id);

    Long getTotalDataCount(String query);
}
