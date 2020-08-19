package com.sumin.portfolio.utils;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class LoginFailureUtil implements AuthenticationFailureHandler {
	
	private final String DEFAULT_FAILURE_URL = "/login";
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
		
		String erMsg = new String();
		if(exception instanceof UsernameNotFoundException) {
			
			erMsg = "존재하지 않는 ID입니다.";
			
		} else if (exception instanceof BadCredentialsException) {
			
			erMsg = "인증 정보가 정확하지 않습니다.";
			
		}
		System.out.println("login fail");
		System.out.println("exception ===> " + exception);
		System.out.println("DEFAULT_FAILURE_URL ===> " + DEFAULT_FAILURE_URL);
		request.setAttribute("erMsg", erMsg);
		request.getRequestDispatcher(DEFAULT_FAILURE_URL).forward(request, response);
		
		// 만약 loginproc 링크로 로그인 진행을 하고싶다면
		// security에 loginprocessingurl 을 loginproc로 설정하고
		// sendRedirect에 errorCode를 넘겨야 한다. (ex)/login?errNo=1..
		// Controller에서 코드에 따라서 메세지 달아주고 (setAttribute)
		// jsp단에서 분기
		
	}
	
}
