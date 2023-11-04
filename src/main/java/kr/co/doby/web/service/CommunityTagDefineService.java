package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityTagDefine;

import java.util.List;

public interface CommunityTagDefineService {
    List<CommunityTagDefine> getList(String query);
}
