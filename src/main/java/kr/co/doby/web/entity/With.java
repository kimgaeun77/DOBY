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
public class With {

    private Long id;
    private String title;
    private String content;
    private Integer hit;
    private Date regDate;
    private String timeDifference;
    private Date deadline;
    private Boolean close;
    private Boolean del;
    private Boolean blind;
    private Long memberId;
    private Long periodId;
    private Long categoryId;
    private Long wayId;
    private Long contactId;
    private String link;

}
