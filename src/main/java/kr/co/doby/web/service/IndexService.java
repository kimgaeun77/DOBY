package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithView;

import java.text.ParseException;
import java.util.List;

public interface IndexService {
    List<WithView> getNearDeadlineWithList() throws ParseException;
}
