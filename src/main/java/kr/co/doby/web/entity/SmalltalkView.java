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
public class SmalltalkView {

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
    private String nickname;
    private String profileImage;
    private Long commentCount;
    private Long goodCount;
    private List<SmalltalkTagView> tagList;
}
