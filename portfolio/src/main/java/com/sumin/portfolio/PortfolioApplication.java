package com.sumin.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PortfolioApplication extends SpringBootServletInitializer {
	
	public static void main(String[] args) {
		
		System.setProperty("server.servlet.context-path", "/portfolio");
		SpringApplication.run(PortfolioApplication.class, args);
		
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		
		return application.sources(PortfolioApplication.class);
		
	}
	
}