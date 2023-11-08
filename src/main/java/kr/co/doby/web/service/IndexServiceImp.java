package kr.co.doby.web.service;

import kr.co.doby.web.entity.WithView;
import kr.co.doby.web.repository.WithRepository;
import kr.co.doby.web.repository.WithTechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class IndexServiceImp implements IndexService {

    @Autowired
    private WithRepository withRepository;

    @Autowired
    private WithTechRepository withTechRepository;

    @Override
    public List<WithView> getNearDeadlineWithList() throws ParseException {


        List<WithView> list = withRepository.findViewAllByOrderByDeadlineAsc();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formatData = dateFormat.format(new Date());
        Date currentDate = dateFormat.parse(formatData);

        for (WithView with : list) {
            Long time = (with.getDeadline().getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24;
            with.setTechList(withTechRepository.findViewAll(with.getId()));
            with.setDateGap(time);
        }

        return list;
    }
}
