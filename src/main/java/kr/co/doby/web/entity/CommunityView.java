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
public class CommunityView {

    private Long id;
    private String title;
    private String content;
    private Integer hit;
    private Boolean pin;
    private Date regDate;
    private String timeDifference;
    private Boolean blind;
    private Boolean del;
    private Long memberId;
    private Long categoryId;
    private String nickname;
    private String profileImage;
    private String categoryName;
    private Long commentCount;
    private Long goodCount;
    private List<CommunityTagView> tagList;
}
