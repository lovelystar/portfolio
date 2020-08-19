package com.sumin.portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.sumin.portfolio.utils.CustomAuthenticationUtil;
import com.sumin.portfolio.utils.LoginFailureUtil;
import com.sumin.portfolio.utils.LoginSuccessUtil;

@Configuration
@EnableWebSecurity
@EnableGlobalAuthentication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class PortfolioSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CustomAuthenticationUtil authProvider;
	
	// security 안태우는 장소
	// auth Interceptor라고 보면 됨 ( 개인적으로 )
	@Override
	public void configure(WebSecurity web) {
		
		web
			.ignoring()
				.antMatchers("/resources/**");
		
	}
	
	// security 접근 권한
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		
		// iframe 사용을 막겠다.
		// 하지만 sameOrigin을 사용함으로써 같은 url의 iframe은 허용
		http
			.headers()
				.frameOptions()
					.sameOrigin();

		// cors : 다른 외부 링크로부터 데이터를 받기위해 사용 ( ex. 부트스트랩 )
		// csrf 보안 취약점 // disable 없애야 함 // csrf만 설정하면 403에러
		// disable 해제
		
		// CookieCsrfTokenRepository.withHttpOnlyFalse() 는 csrf token 생성
		// 주의해야 할 점은
		// 쿠키에는 "XSRF-TOKEN"
		// 헤더에는 "X-XSRF-TOKEN"
		// csrf token을 넘기지 않으면 403에러
		http
			.cors()
				.and()
					.csrf()
						//.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
						.disable();
		
		http
			.httpBasic()
			.and()
			.formLogin()
				.loginPage("/login")
					.defaultSuccessUrl("/")
						.successHandler(customSuccess())
						.failureHandler(customFailure())
			.and()
			.authorizeRequests()
//				.antMatchers("/join", "/board", "/calendar", "/thumbs", "/login")
				.antMatchers("/", "/join", "/board", "/thumbs", "/login", "/getboard")
					.permitAll()
				.anyRequest()
					.authenticated();
		
		http
			.sessionManagement()
				.maximumSessions(1) // session 허용 갯수
				.maxSessionsPreventsLogin(false) // true = 동일 사용자가 로그인 한 경우 로그인 안된다. false = 동일 사용자 로그인 한 경우 기존 사용자 접속 종료
				.expiredUrl("/") // 중복 로그인이 일어났을 경우 이동할 페이지
				.sessionRegistry(sessionRegistry());
		
    }

	// 인증방법
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		auth
			.authenticationProvider(authProvider);
			//.authenticationProvider(authProvider());
			//.inMemoryAuthentication().withUser("user").password(encoder().encode("glaam2020!")).roles("ADMIN");
		
	}
	
	// DB로 인증하겠다.
//	@Bean
//	public CustomAuthenticationUtil authProvider() {
//		
//		CustomAuthenticationUtil authProvider = new CustomAuthenticationUtil();
//		authProvider.setUserDetailsService(userService);
//		authProvider.setPasswordEncoder(encoder());
//		
//		return authProvider;
//		
//	}
	
	// 비밀번호 암호화 ( 단방향 복호화 불가능 )
	@Bean
	public PasswordEncoder encoder() {
		
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
		// return new BCryptPasswordEncoder();
	}
	
	// security success handler
	@Bean
	public AuthenticationSuccessHandler customSuccess() {
		return new LoginSuccessUtil();
	}
	
	// security failure handler
	@Bean
	public AuthenticationFailureHandler customFailure() {
		return new LoginFailureUtil();
	}
	
	// session control
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}
	
}