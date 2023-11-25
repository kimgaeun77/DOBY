package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithBlindCancel;
import kr.co.doby.web.entity.WithBlindCancelView;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.WithBlindCancelRepository;
import kr.co.doby.web.repository.WithRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WithBlindCancelServiceImp implements WithBlindCancelService {

    @Autowired
    WithBlindCancelRepository repository;

    @Autowired
    WithRepository withRepository;

    //리스트 출력
    @Override
    public List<WithBlindCancelView> getViewList(Integer page, String query) {
        int size = 10;
        int offset = size * (page - 1);

        List<WithBlindCancelView> list = repository.findViewAll(offset, size, query);
        for (WithBlindCancelView withBlindCancelView : list) {
            Date regDate = withBlindCancelView.getRegDate();
            if (regDate != null)
                withBlindCancelView.setDifferenceRegDate(TimeDifference.getTimeDifference(regDate));
        }

        return list;
    }

    //MVC 페이징을 위한 카운트
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
    public WithBlindCancelView getViewById(Long id) {
        WithBlindCancelView withBlindCancelView = repository.findViewById(id);
        if (withBlindCancelView.getRegDate()!=null) {
            Date regDate = withBlindCancelView.getRegDate();
            withBlindCancelView.setDifferenceRegDate(TimeDifference.getTimeDifference(regDate));
        }
        return withBlindCancelView;
    }

    //처리상태 변경
    @Override
    public WithBlindCancel modify(WithBlindCancel withBlindCancel) {
        repository.updateStatus(withBlindCancel);
        if (withBlindCancel.getStatusId() == 2L) {
            withRepository.toVisible(withBlindCancel.getWithId());
        }
        return repository.findById(withBlindCancel.getWithId());
    }

    //처리상태 변경
    @Override
    public WithBlindCancel getById(Long withId) {
        return repository.findById(withId);
    }

}
