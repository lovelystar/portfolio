package com.sumin.portfolio.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {
	
	@RequestMapping(value="/login", method= {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView loginPage(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws Exception {
		
		// 링크를 통해서 들어온 경우는 값을 가져올 수 있지만 직접 입력하면 값을 가져올 수 없다.( null )
		// String ref = request.getHeader("REFERER")
		if(auth != null) {
			
			String ref = new String();
			ref = request.getHeader("REFERER");
			
			if(ref == null) {
				ref = "http://localhost:8081/portfolio/";
			}
			
			response.sendRedirect(ref);
			
		}
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("login");
		
		return mav;
		
	}
	
	@RequestMapping(value="/join", method=RequestMethod.GET)
	public ModelAndView joinPage() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
}
