package kr.co.doby.web.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tech {

  private Long id;
  private String name;
  private String image;
  private Long parentId;

}
