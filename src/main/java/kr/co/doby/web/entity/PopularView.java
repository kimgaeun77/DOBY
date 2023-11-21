package kr.co.doby.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
// 커뮤니티, 스몰톡 인기 게시글을 위한 뷰
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopularView {

    private Long id;
    private String title;
    private String content;
    private Integer hit;
    private Boolean pin;
    private Date regDate;
    private String timeDifference;
    private Boolean blind;
    private Boolean del;
    private String nickname;
    private String profileImage;
    private String boardName;
    private Long commentCount;
    private Long goodCount;
    private List<?> tagList;
}
