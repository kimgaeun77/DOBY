package kr.co.doby.web.service;

import kr.co.doby.web.entity.*;
import kr.co.doby.web.etc.Paging;
import kr.co.doby.web.etc.TimeDifference;
import kr.co.doby.web.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class WithServiceImp implements WithService {

    @Autowired
    private WithRepository repository;

    @Autowired
    private WithCategoryRepository categoryRepository;

    @Autowired
    private WithPositionRepository positionRepository;

    @Autowired
    private WithTechRepository withTechRepository;

    @Autowired
    private WithWayRepository wayRepository;

    @Autowired
    private WithPeriodRepository periodRepository;

    @Autowired
    private WithContactRepository contactRepository;

    @Autowired
    private WithCommentRepository withCommentRepository;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TechRepository techRepository;


    @Override
    public With getById(Long id) {
        repository.updateHitById(id);
        With with = repository.findById(id);

        Date regDate = with.getRegDate();
        String timeDifference = TimeDifference.getTimeDifference(regDate);
        with.setTimeDifference(timeDifference);

        return with;
    }

    @Override
    public With reg(With with, Long memberId) {

        with.setMemberId(memberId);

        repository.save(with);

        return repository.last();
    }

    @Override
    public boolean checkWish(Long id, Long memberId) {

        Wish wish = wishRepository.findById(memberId, id);

        return wish != null;
    }

    @Override
    public boolean delete(Long id, Long memberId) {

        With with = repository.findById(id);

        if (!Objects.equals(with.getMemberId(), memberId))
            return false;

        repository.deleteById(id);
        return true;
    }

    @Override
    public Member getMemberByMemberId(Long memberId) {
        return memberRepository.findById(memberId);
    }

    @Override
    public boolean isAuthor(Long memberId, Long currentId) {
        return Objects.equals(memberId, currentId);
    }

    @Override
    public List<Tech> getTechList() {
        return techRepository.findAll();
    }

    @Override
    public With edit(With with) {
        repository.update(with);
        return repository.findById(with.getId());
    }

    @Override
    public List<WithView> getViewList(Integer page, Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish, Long memberId) {

        if (isWish != null && !isWish)
            isWish = null;

        if (techList != null && techList.isEmpty())
            techList = null;

        if ("".equals(query))
            query = null;

        int size = 10;
        int offset = size * (page - 1);

        List<WithView> list = repository.findViewAll(offset, size, categoryId, query, techList, positionId, wayId, isWish, memberId);

        for (WithView with : list) {
            Date regDate = with.getRegDate();
            String timeDifference = TimeDifference.getTimeDifference(regDate);
            with.setTimeDifference(timeDifference);
            with.setTechList(withTechRepository.findViewAll(with.getId()));
        }

        return list;
    }

    @Override
    public List<WithView> getNearDeadlineList() throws ParseException {

        List<WithView> list = repository.findViewAllByOrderByDeadlineAsc();

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

    @Override
    public Paging getPagingInfo(Integer page, Long categoryId, String query, List<Long> techList, Long positionId, Long wayId, Boolean isWish) {

        if (isWish != null && !isWish)
            isWish = null;

        if (techList != null && techList.isEmpty())
            techList = null;

        if ("".equals(query))
            query = null;

        Integer totalRecord = repository.count(categoryId, query, techList, positionId, wayId, isWish, 1L);

        Paging paging = Paging.builder()
                .currentPage(page)
                .totalRecord(totalRecord)
                .recordSizePerPage(10)
                .pageSizePerBlock(5)
                .build();

        return paging.calc();
    }

    @Override
    public int getCommentCount(Long id) {
        return withCommentRepository.countByWithId(id);
    }


    @Override
    public WithCategory getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public WithWay getWayById(Long wayId) {
        return wayRepository.findById(wayId);
    }

    @Override
    public WithPeriod getPeriodById(Long periodId) {
        return periodRepository.findById(periodId);
    }

    @Override
    public WithContact getContactById(Long contactId) {
        return contactRepository.findById(contactId);
    }

    @Override
    public List<WithPositionView> getPositionViewListById(Long id) {
        return positionRepository.findViewAll(id);
    }

    @Override
    public List<WithTechView> getTechViewListById(Long id) {
        return withTechRepository.findViewAll(id);
    }

    @Override
    public int getCapacityById(Long id) {
        return positionRepository.countCapacityById(id);
    }

    @Override
    public List<WithCommentView> getCommentViewById(Long id) {
        return withCommentRepository.findViewAll(id);
    }

}