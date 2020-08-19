package com.sumin.portfolio.dao.board;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sumin.portfolio.vo.board.BoardVo;

@Repository("boardDao")
public class BoardDaoImpl implements BoardDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	// 글 갯수
	@Override
	public int boardTotal(BoardVo vo) throws SQLException {
		return sqlSession.selectOne("boardTotal", vo);
	}
	
	// 글 목록
	@Override
	public List<BoardVo> getBoard(BoardVo vo) throws SQLException {
		return sqlSession.selectList("getBoard", vo);
	}
	
	// 글 목록 ( 파일리스트 )
	@Override
	public List<BoardVo> getBoardUpld(int idxBoard) throws SQLException {
		return sqlSession.selectList("getBoardUpld", idxBoard);
	}
	
}
