package kr.co.doby.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SmalltalkTagView {
    private Long smalltalkId;
    private Long tagId;
    private Long id;
    private String name;
}
