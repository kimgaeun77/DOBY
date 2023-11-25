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
public class SmalltalkBlindCancel {
    private Long smalltalkId;
    private String reason;
    private Date regDate;
    private Long statusId;
}
