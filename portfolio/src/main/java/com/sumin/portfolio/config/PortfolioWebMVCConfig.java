package com.sumin.portfolio.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
public class PortfolioWebMVCConfig implements WebMvcConfigurer {
	
	private static final String localUploadPath = "C:\\localUploaded\\board\\";
	private static final String commentUploadPath = "C:\\localUploaded\\comment\\";
	// private static final String serverUploadPath = "/home/centos/serverUploaded/";

	@Bean
	public ViewResolver getViewResolver() {
		
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");
		
		return viewResolver;
		
	}
	
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		
		configurer.enable();
		
	}
	
	// CSS, JS같은 resource들
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry.addResourceHandler("/resources/**")
				.addResourceLocations("/resources/");
		
	}
	
	@Bean
	public MessageSource messageSource(){
		
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:/messages/message");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
		
	}
	
	@Bean
	public SessionLocaleResolver localeResolver(){
		
		SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
		return sessionLocaleResolver;
		
	}
	
	// 파일업로드 용량 Maximum
	@Bean
	public CommonsMultipartResolver commonsMultipartResolver() {
		
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setMaxUploadSize(2147483647);
		
		return multipartResolver;
		
	}

	@Bean
	public String fileUploadPath() {
		
		// return serverUploadPath;
		return localUploadPath;
		
	}
	
	@Bean
	public String commentUploadPath() {
		return commentUploadPath;
	}
	
}