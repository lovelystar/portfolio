package com.sumin.portfolio.service.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sumin.portfolio.dao.user.UserDao;
import com.sumin.portfolio.vo.login.LoginVo;
import com.sumin.portfolio.vo.user.AuthorityVo;
import com.sumin.portfolio.vo.user.GroupsVo;
import com.sumin.portfolio.vo.user.UserVo;

@Service("userService")
public class UserServiceImpl implements UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserVo vo = new UserVo();
		vo.setUsername(username);
		
		// 유저
		LoginVo login = userDao.login(vo);
		if(login == null) {
			
			logger.info("Query returned no results for user : " + username);
			UsernameNotFoundException unfe = new UsernameNotFoundException("Username : '" + username + "' not found");
			throw unfe;
			
		}
		Set<GrantedAuthority> authSet = new HashSet<GrantedAuthority>();
		
		// 유저의 권한 리스트
		login.setUserAuthority(userDao.authority(vo));
		Collection<GrantedAuthority> authority = new ArrayList<GrantedAuthority>();
		for(AuthorityVo authRole : login.getUserAuthority()) {
			authority.add(new SimpleGrantedAuthority(authRole.getAuthority()));
		}

		authSet.addAll(authority);
		
		// 유저의 그룹 리스트
		login.setGroupsAuthority(userDao.groups(vo));
		Collection<GrantedAuthority> groups = new ArrayList<GrantedAuthority>();
		for(GroupsVo groupRole : login.getGroupsAuthority()) {
			groups.add(new SimpleGrantedAuthority(groupRole.getGroupName()));
		}
		
		// 유저의 리소스
		login.setResourceAuthority(userDao.resource(vo));

		List<GrantedAuthority> userAuth = new ArrayList<GrantedAuthority>(authSet);
		login.setAuthority(userAuth);
		
		return login;
		
	}
	
}
