package kr.co.doby.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WithCommentView {

    private Long id;
    private String content;
    private Date regDate;
    private String timeDifference;
    private Boolean del;
    private Long memberId;
    private String nickname;
    private String profileImage;
    private Long withId;
    private Long parentId;
    private Integer replyCount;

}
