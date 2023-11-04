package kr.co.doby.web.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community {

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

}
