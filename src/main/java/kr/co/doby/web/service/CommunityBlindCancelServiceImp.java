package kr.co.doby.web.service;

import kr.co.doby.web.entity.CommunityBlindCancel;
import kr.co.doby.web.entity.CommunityBlindCancelView;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.CommunityBlindCancelRepository;
import kr.co.doby.web.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommunityBlindCancelServiceImp implements CommunityBlindCancelService {

    @Autowired
    CommunityBlindCancelRepository repository;

    @Autowired
    CommunityRepository communityRepository;

    //리스트 출력
    @Override
    public List<CommunityBlindCancelView> getViewList(Integer page, String query) {
        int size = 10;
        int offset = size * (page - 1);

        List<CommunityBlindCancelView> list = repository.findViewAll(offset, size, query);
        for (CommunityBlindCancelView communityBlindCancelView : list) {
            Date regDate = communityBlindCancelView.getRegDate();
            if (regDate != null)
                communityBlindCancelView.setDifferenceRegDate(TimeDifference.getTimeDifference(regDate));
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
    public CommunityBlindCancelView getViewById(Long id) {
        CommunityBlindCancelView communityBlindCancelView = repository.findViewById(id);
        if (communityBlindCancelView.getRegDate()!=null) {
            Date regDate = communityBlindCancelView.getRegDate();
            communityBlindCancelView.setDifferenceRegDate(TimeDifference.getTimeDifference(regDate));
        }
        return communityBlindCancelView;
    }

    //처리상태 변경
    @Override
    public CommunityBlindCancel modify(CommunityBlindCancel communityBlindCancel) {
        repository.updateStatus(communityBlindCancel);
        if (communityBlindCancel.getStatusId() == 2L) {
            communityRepository.toVisible(communityBlindCancel.getCommunityId());
        }
        return repository.findById(communityBlindCancel.getCommunityId());
    }

    //처리상태 변경
    @Override
    public CommunityBlindCancel getById(Long communityId) {
        return repository.findById(communityId);
    }

}
