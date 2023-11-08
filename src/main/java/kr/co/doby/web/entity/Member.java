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
public class Member {

    private Long id;
    private String username;
    private String email;
    private String password;
    private String nickname;
    private String phone;
    private Boolean emailAgree;
    private Date regDate;
    private String profileImage;
    private Boolean del;

}
