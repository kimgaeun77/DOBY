package kr.co.doby.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WithView {

    private Long id;
    private String title;
    private String content;
    private Long hit;
    private Date regDate;
    private String timeDifference;
    private Long dateGap;
    private Date deadline;
    private Long categoryId;
    private String categoryName;
    private String nickname;
    private String profileImage;
    private Integer wishCount;
    private Integer commentCount;
    private List<WithTechView> techList;

}
