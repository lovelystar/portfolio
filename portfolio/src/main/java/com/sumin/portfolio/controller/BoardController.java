package com.sumin.portfolio.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sumin.portfolio.service.board.BoardService;
import com.sumin.portfolio.vo.board.BoardVo;

@Controller
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	// board page
	@RequestMapping(value="/board", method=RequestMethod.GET)
	public ModelAndView report(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws Exception {

		// 값 있음.
		// ignoring을 탔기 때문에 "/"에선 확인 불가능
		// calendar도 있음. 
		// security에 antMatcher와는 상관없이 값을 가져올 수 있으나
		// ignoring 타면 못가져옴
		System.out.println("board auth ====>> " + auth);
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
	// board list
	@ResponseBody
	@RequestMapping(value="/getboard", method=RequestMethod.POST)
	public Map<String, Object> getBoard(@RequestBody BoardVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		int boardTotal = boardService.boardTotal(vo);
		vo.setTotalCount(boardTotal);
		
		// 글 목록
		List<BoardVo> boardList = boardService.getBoard(vo);
		for(int i=0; i<boardList.size(); i++) {
			
			Map<String, Object> map = new HashMap<>();

			// 글 정보
			map.put("idx", boardList.get(i).getIdx());
			map.put("boardName", boardList.get(i).getBoardName());
			map.put("boardDetails", boardList.get(i).getBoardDetails());
			map.put("boardViews", boardList.get(i).getBoardViews());
//			map.put("boardLikes", boardService.getBoardLike(boardList.get(i).getIdx()));
			map.put("uptdate", boardList.get(i).getUptdate());
			
			// 글 목록 ( 파일리스트 )
			List<BoardVo> boardUpldList = boardService.getBoardUpld(boardList.get(i).getIdx());
			List<Map<String, Object>> upldList = new ArrayList<Map<String, Object>>();
			
			// 댓글 갯수
//			Integer replyCnt = boardService.replyCnt(boardList.get(i).getIdx());
//			map.put("replyCnt", replyCnt);

			// 첨부파일 정보
			for(int j=0; j<boardUpldList.size(); j++) {
				
				Map<String, Object> upldMap = new HashMap<String, Object>();
				
				upldMap.put("idxContents", boardUpldList.get(j).getIdx());
				upldMap.put("idxBoard", boardUpldList.get(j).getIdxBoard());
				upldMap.put("fileName", boardUpldList.get(j).getFileName());
				upldMap.put("originalName", boardUpldList.get(j).getOriginalName());
				upldMap.put("randomName", boardUpldList.get(j).getRandomName());
				upldMap.put("mimeType", boardUpldList.get(j).getMimeType());
				upldMap.put("idxUser", boardUpldList.get(j).getIdxUser());
				upldMap.put("idxUserGroup", boardUpldList.get(j).getIdxUserGroup());
				upldMap.put("uptdate", boardUpldList.get(j).getUptdate());
				
				upldList.add(upldMap);
					
			}
			
			map.put("contentsList", upldList);
			resultList.add(map);
			
		}
		
		resultMap.put("board", resultList);

		// 페이징 정보
		Map<String, Object> paginationMap = new HashMap<String, Object>();
		
		paginationMap.put("prevPage", vo.getPrevPage());
		paginationMap.put("prev", vo.isPrev());
		paginationMap.put("startPage", vo.isStartPage());
		paginationMap.put("nextPage", vo.getNextPage());
		paginationMap.put("next", vo.isNext());
		paginationMap.put("endPage", vo.isEndPage());
		
		resultMap.put("paging", paginationMap);
			
		return resultMap;
		
	}
	
}