package com.sumin.portfolio.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sumin.portfolio.dao.user.UserDao;
import com.sumin.portfolio.vo.login.LoginVo;
import com.sumin.portfolio.vo.user.AuthorityVo;
import com.sumin.portfolio.vo.user.UserVo;

@Component
public class CustomAuthenticationUtil implements AuthenticationProvider {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		
		UserVo vo = new UserVo();
		vo.setUsername(username);
		
		LoginVo login = userDao.login(vo);
		if(login == null) {
			
			throw new UsernameNotFoundException("존재하지 않는 ID입니다.");
			
		} else {
			
			if(encoder.matches(password, login.getPassword())) {
				
				// 권한을 가져와서 권한 리스트에 넣는다.
				List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
				login.setUserAuthority(userDao.authority(vo));
				
				Collection<GrantedAuthority> authority = new ArrayList<GrantedAuthority>();
				for(AuthorityVo authRole : login.getUserAuthority()) {
					authority.add(new SimpleGrantedAuthority(authRole.getAuthority()));
				}
				
				// 기타 정보들 있으면 추가.
				System.out.println("authority ==> " + authority);
				
				return new UsernamePasswordAuthenticationToken(username, password, roles);
				
			}
			
			throw new BadCredentialsException("인증 정보가 정확하지 않습니다.");
			
		}
		
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
	
}
