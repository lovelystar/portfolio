package com.sumin.portfolio.dao.user;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sumin.portfolio.vo.login.LoginVo;
import com.sumin.portfolio.vo.user.AuthorityVo;
import com.sumin.portfolio.vo.user.GroupsVo;
import com.sumin.portfolio.vo.user.ResourceVo;
import com.sumin.portfolio.vo.user.UserVo;

@Repository("userDao")
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	// 로그인
	@Override
	public LoginVo login(UserVo vo) {
		System.out.println("login 왔음");
		return sqlSession.selectOne("login", vo);
	}
	
	// 유저의 권한 리스트
	@Override
	public List<AuthorityVo> authority(UserVo vo) {
		System.out.println("authority 왔음");
		return sqlSession.selectList("authority", vo);
	}
	
	// 유저의 그룹 리스트
	@Override
	public List<GroupsVo> groups(UserVo vo) {
		System.out.println("groups 왔음");
		return sqlSession.selectList("groups", vo);
	}
	
	// 유저의 리소스
	@Override
	public List<ResourceVo> resource(UserVo vo) {
		System.out.println("resource 왔음");
		return sqlSession.selectList("resource", vo);
	}
	
}
