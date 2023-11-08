package kr.co.doby.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WithPositionView {
    private Long withId;
    private Long positionId;
    private Integer capacity;
    private Integer current;
    private String name;
}
