package com.sumin.portfolio.dao.user;

import java.util.List;

import com.sumin.portfolio.vo.login.LoginVo;
import com.sumin.portfolio.vo.user.AuthorityVo;
import com.sumin.portfolio.vo.user.GroupsVo;
import com.sumin.portfolio.vo.user.ResourceVo;
import com.sumin.portfolio.vo.user.UserVo;

public interface UserDao {
	
	// 로그인
	public LoginVo login(UserVo vo);

	// 유저의 권한 리스트
	public List<AuthorityVo> authority(UserVo vo);
	
	// 유저의 그룹 리스트
	public List<GroupsVo> groups(UserVo vo);
	
	// 유저의 리소스
	public List<ResourceVo> resource(UserVo vo);
	
}
