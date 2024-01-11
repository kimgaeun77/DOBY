package kr.co.doby.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WithBlindCancelView {
    private Long id;
    private String title;
    private String content;
    private Date regDate;
    private Boolean blind;
    private Boolean del;
    private Long memberId;
    private String nickname;
    private Long categoryId;
    private String categoryName;

    private String reportReason;
    private String cancelReason;
    private Long statusId;
    private String status;

    private String differenceRegDate;
}
