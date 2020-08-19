package com.sumin.portfolio.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CalendarController {
	
	// calendar page
	@RequestMapping(value="/calendar", method=RequestMethod.GET)
	public ModelAndView report(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws Exception {
		
		// 값 있음.
		// ignoring을 탔기 때문에 "/"에선 확인 불가능
		// board도 있음. 
		// security에 antMatcher와는 상관없이 값을 가져올 수 있으나
		// ignoring 타면 못가져옴
		System.out.println("calendar auth ====>> " + auth);
		System.out.println("auth role ====>> " + auth.getAuthorities());
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
}