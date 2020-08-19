package com.sumin.portfolio.service.board;

import java.util.List;

import com.sumin.portfolio.vo.board.BoardVo;

public interface BoardService {
	
	public int boardTotal(BoardVo vo) throws Exception; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws Exception; // 글 목록
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception; // 글 목록 ( 파일리스트 )
	
}
