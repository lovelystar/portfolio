package com.sumin.portfolio.service.board;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sumin.portfolio.dao.board.BoardDao;
import com.sumin.portfolio.vo.board.BoardVo;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	
	@Resource(name="boardDao")
	private BoardDao boardDao;
	
	// 글 갯수
	@Override
	public int boardTotal(BoardVo vo) throws Exception {
		return boardDao.boardTotal(vo);
	}
	
	// 글 목록
	@Override
	public List<BoardVo> getBoard(BoardVo vo) throws Exception {
		return boardDao.getBoard(vo);
	}
	
	// 글 목록 ( 파일리스트 )
	@Override
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception {
		return boardDao.getBoardUpld(idxBoard);
	}
	
}
