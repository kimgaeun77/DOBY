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
public class InactiveMember {
    private Long id;
    private Date startDate;
    private Date endDate;
    private Long memberId;
    private Long reasonId;
}