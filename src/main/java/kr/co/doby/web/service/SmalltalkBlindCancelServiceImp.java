package kr.co.doby.web.service;

import kr.co.doby.web.entity.SmalltalkBlindCancel;
import kr.co.doby.web.entity.SmalltalkBlindCancelView;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.SmalltalkBlindCancelRepository;
import kr.co.doby.web.repository.SmalltalkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SmalltalkBlindCancelServiceImp implements SmalltalkBlindCancelService {

    @Autowired
    SmalltalkBlindCancelRepository repository;

    @Autowired
    SmalltalkRepository smalltalkRepository;

    //리스트 출력
    @Override
    public List<SmalltalkBlindCancelView> getViewList(Integer page, String query) {
        int size = 10;
        int offset = size * (page - 1);

        List<SmalltalkBlindCancelView> list = repository.findViewAll(offset, size, query);
        for (SmalltalkBlindCancelView smalltalkBlindCancelView : list) {
            Date regDate = smalltalkBlindCancelView.getRegDate();
            if (regDate != null)
                smalltalkBlindCancelView.setDifferenceRegDate(TimeDifference.getTimeDifference(regDate));
        }

        return list;
    }

    //페이징을 위한 카운트
    @Override
    public Double countPage(String query) {
        Long countList = repository.countViewByQuery(query);
        return Math.ceil((double) countList / 10);
    }

    //api 페이징을 위한 카운트
    @Override
    public Long countViewByQuery(String query) {
        return repository.countViewByQuery(query);
    }

    //상세페이지 출력
    @Override
    public SmalltalkBlindCancelView getViewById(Long id) {
        SmalltalkBlindCancelView smalltalkBlindCancelView = repository.findViewById(id);
        if (smalltalkBlindCancelView.getRegDate()!=null){
        Date regDate = smalltalkBlindCancelView.getRegDate();
        smalltalkBlindCancelView.setDifferenceRegDate(TimeDifference.getTimeDifference(regDate));
        }
        return smalltalkBlindCancelView;
    }

    //처리상태 변경
    @Override
    public SmalltalkBlindCancel modify(SmalltalkBlindCancel smalltalkBlindCancel) {
        repository.updateStatus(smalltalkBlindCancel);
        if (smalltalkBlindCancel.getStatusId() == 2L) {
            smalltalkRepository.toVisible(smalltalkBlindCancel.getSmalltalkId());
        }
        return repository.findById(smalltalkBlindCancel.getSmalltalkId());
    }

    //처리상태 변경
    @Override
    public SmalltalkBlindCancel getById(Long smalltalkId) {
        return repository.findById(smalltalkId);
    }



}
