package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityTagDefine;
import kr.co.doby.web.entity.SmalltalkTagDefine;

import java.util.List;

public interface SmalltalkTagDefineService {
    List<SmalltalkTagDefine> getList(String query);
}
