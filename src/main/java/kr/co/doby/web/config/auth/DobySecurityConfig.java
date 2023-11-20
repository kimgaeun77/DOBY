package kr.co.doby.web.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class DobySecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers("/admin/**")
                                .hasAnyRole("ADMIN")
                                .requestMatchers("/member/**")
                                .hasAnyRole("ADMIN", "MEMBER")
                                .anyRequest().permitAll()
                )
                .formLogin(
                        form -> form
                                .loginPage("/user/login")
                                .defaultSuccessUrl("/"))
                .logout(
                        logout -> logout
                                .logoutUrl("/logout")
                                .logoutSuccessUrl("/")
                                .deleteCookies("JSESSIONID"));
        return http.build();
    }
}
