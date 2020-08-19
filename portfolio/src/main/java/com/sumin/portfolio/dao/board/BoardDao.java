package com.sumin.portfolio.dao.board;

import java.sql.SQLException;
import java.util.List;

import com.sumin.portfolio.vo.board.BoardVo;

public interface BoardDao {
	
	public int boardTotal(BoardVo vo) throws SQLException; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws SQLException; // 글 목록
	public List<BoardVo> getBoardUpld(int idxBoard) throws SQLException; // 글 목록 ( 파일리스트 )
}
