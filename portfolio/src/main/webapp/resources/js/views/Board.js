import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies, Cookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../component/Header";
import Loading from "../component/Loading";
import Footer from "../component/Footer";

import classNames from "classnames/bind";
import base from "../../scss/base.scss";
const baseStyle = classNames.bind(base);

import board from "../../scss/board.scss";
const boardStyle = classNames.bind(board);

import * as BoardReducer from "../reducer/BoardReducer";

class Board extends Component {
	
	constructor(props){
		
		super(props)
		this.state = {
			page: 1,
		}
		
	}

	componentDidMount() {

		let page = this.state.page;
		let obj = new Object();
		obj.page = page;

		this.getBoard(obj);

	}

	componentDidUpdate() {
		
		const result = this.props.state.BoardReducer.result;
		if(result != null){

			const board = result.board;
			const paging = result.paging;

			let boardList = document.getElementById("boardList");
			let pagination = document.getElementById("pagination");

			boardList.innerHTML = "";
			pagination.innerHTML = "";

			board.map((list, index) => {

				let date = new Date(list.uptdate);
				let parseDate = 
					this.dateFunc(date.getFullYear()) + "-" +
					this.dateFunc((date.getMonth()+1)) + "-" + 
					this.dateFunc(date.getDate()) + " " +
					this.dateFunc(date.getHours()) + ":" +
					this.dateFunc(date.getMinutes());

				
				// 첨부파일 처리
				let contentsList = list.contentsList;
				if(contentsList.length != 0){
					
					let $wrap = document.createElement("div");
					$wrap.className = "boardWrap";



					let $bImg = document.createElement("div");
					$bImg.className = "boardImg";

					let $iWrap = document.createElement("div");
					$iWrap.className = "imgWrap";
					
					contentsList.map((contents) => {
						
						let $imgEa = document.createElement("img");
						$imgEa.className = "imgEa";
						$imgEa.setAttribute("src", "/portfolio/thumbs?pvn=" + contents.randomName + ".jpg")
						
						$iWrap.appendChild($imgEa);

					});

					let $arrowWrap = document.createElement("div");
					$arrowWrap.className = "arrowWrap";

					let $arrowLeft = document.createElement("a");
					$arrowLeft.className = "arrow";
					$arrowLeft.setAttribute("id", "arrowLeft");
					let $leftImg = document.createElement("img");
					$leftImg.setAttribute("src", "/portfolio/resources/img/to-left.png");
					$arrowLeft.appendChild($leftImg);

					let $arrowRight = document.createElement("a");
					$arrowRight.className = "arrow";
					$arrowRight.setAttribute("id", "arrowRight");
					let $rightImg = document.createElement("img");
					$rightImg.setAttribute("src", "/portfolio/resources/img/to-right.png");
					$arrowRight.appendChild($rightImg);

					$arrowWrap.appendChild($arrowLeft);
					$arrowWrap.appendChild($arrowRight);
					
					let $bTxt = document.createElement("div");
					$bTxt.className = "boardTxt";

					let $txtMiddle = document.createElement("div");
					$txtMiddle.className = "txtMiddle";

					let $txtTitle = document.createElement("div");
					$txtTitle.className = "txtTitle";
					$txtTitle.textContent = "#" + index + " " + list.boardName;

					let $txtContent = document.createElement("div");
					$txtContent.className = "txtContent";
					$txtContent.textContent = "권신홍 작가 특유의 유쾌한 시선이 느껴지는 ‘금요일 할아버지’는 밋밋한 공간에 유머러스한 활기를 불어넣습니다. 불빛이 번쩍이는 금요일 밤 맥주 한잔을 손에 든 할아버지의 모습은 우리에게 친숙함을 넘어 즐거운 감정을 느끼게 합니다. 인더스트리얼 스타일 철제 장식장과 깜찍한 팬던트 조명, 원색적인 데스크 용품들이 조화를 이루며 감각적이고 개성 넘치는 공간이 완성되었습니다.";

					let $txtLv = document.createElement("div");
					$txtLv.className = "txtLv";

					let $txtLikes = document.createElement("span");
					$txtLikes.className = "txtLikes";

					let $txtViews = document.createElement("span");
					$txtViews.className = "txtViews";




					$bImg.appendChild($iWrap);
					$bImg.appendChild($arrowWrap);

					$txtLv.appendChild($txtLikes);
					$txtLv.appendChild($txtViews);

					$txtMiddle.appendChild($txtTitle);
					$txtMiddle.appendChild($txtContent);
					$txtMiddle.appendChild($txtLv);

					$bTxt.appendChild($txtMiddle);

					$wrap.appendChild($bImg);
					$wrap.appendChild($bTxt);

					boardList.appendChild($wrap);

				} else {

					let $wrap = document.createElement("div");
					$wrap.className = "boardWrap";



					let $bImg = document.createElement("div");
					$bImg.className = "boardImg";

					let $bTxt = document.createElement("div");
					$bTxt.className = "boardTxt";

					let $txtMiddle = document.createElement("div");
					$txtMiddle.className = "txtMiddle";

					let $txtTitle = document.createElement("div");
					$txtTitle.className = "txtTitle";
					$txtTitle.textContent = "#" + index + " " + list.boardName;

					let $txtContent = document.createElement("div");
					$txtContent.className = "txtContent";
					$txtContent.textContent = "권신홍 작가 특유의 유쾌한 시선이 느껴지는 ‘금요일 할아버지’는 밋밋한 공간에 유머러스한 활기를 불어넣습니다. 불빛이 번쩍이는 금요일 밤 맥주 한잔을 손에 든 할아버지의 모습은 우리에게 친숙함을 넘어 즐거운 감정을 느끼게 합니다. 인더스트리얼 스타일 철제 장식장과 깜찍한 팬던트 조명, 원색적인 데스크 용품들이 조화를 이루며 감각적이고 개성 넘치는 공간이 완성되었습니다.";

					let $txtLv = document.createElement("div");
					$txtLv.className = "txtLv";

					let $txtLikes = document.createElement("span");
					$txtLikes.className = "txtLikes";

					let $txtViews = document.createElement("span");
					$txtViews.className = "txtViews";
					

					


					$txtLv.appendChild($txtLikes);
					$txtLv.appendChild($txtViews);

					$txtMiddle.appendChild($txtTitle);
					$txtMiddle.appendChild($txtContent);
					$txtMiddle.appendChild($txtLv);

					$bTxt.appendChild($txtMiddle);

					$wrap.appendChild($bImg);
					$wrap.appendChild($bTxt);

					boardList.appendChild($wrap);
					
				}

			});

			if(paging != null){

				let prevPage = paging.prevPage;
				let prev = paging.prev;
				let startPage = paging.startPage;
				
				let nextPage = paging.nextPage;
				let next = paging.next;
				let endPage = paging.endPage;

				if(prev) {

					let $li = document.createElement("li");
					$li.className("pagination");
					$li.setAttribute("data-page", prevPage - 1);
					$li.textContent = "prev";
					pagination.appendChild($li);
					
				}

				for(let pagingIdx=prevPage; pagingIdx<=nextPage; pagingIdx++){
					
					let page = this.state.page;
					let $li = document.createElement("li");
					$li.className = "pagination";
					$li.setAttribute("data-page", pagingIdx);
					if(page == pagingIdx) {
						$li.classList.add("activePage");
					}

					$li.textContent = pagingIdx;
					pagination.appendChild($li);

				}

				if(next) {

					let $li = document.createElement("li");
					$li.className("pagination");
					$li.setAttribute("data-page", nextPage + 1);
					$li.textContent = "next";
					pagination.appendChild($li);
					
				}

			}

		}

	}
	getBoard = (object) => {
		this.props.getBoard(object);
	}

	dateFunc = (param) => {

		let dateParam = param;
		param < 10 ? dateParam = "0" + param : dateParam = param;

		return dateParam;

	}

	fs = (e) => {

		let target = e.currentTarget;
		let cn = target.className;
		let si = document.getElementById("searchInput");
		let fl = document.getElementById("filterList");
		
		if(cn.indexOf("active") == -1) {
			target.classList.add("active");
			if(cn.indexOf("boardSearch") != -1){
				si.classList.add("active");
			} else {
				fl.classList.add("active");
			}
		} else {
			target.classList.remove("active");
			if(cn.indexOf("boardSearch") != -1){
				si.classList.remove("active");
			} else {
				fl.classList.remove("active");
			}
		}

	}

	render() {
		return (

			<div>
				<Loading />
				<Header />
				<div className={baseStyle("baseContainer")}>

					<section style={{"background": "none"}}>
						<div className={baseStyle("mainContainer")}>

							<div className={boardStyle("boardTitle")}>
								<h2>BOARD</h2>

								<div className={boardStyle("boardAdd")}>
									<button id="AddBtn">ADD</button>
								</div>

							</div>

							<div className={boardStyle("boardBtn")}>
								
								<div className={boardStyle("boardFilter")} onClick={this.fs}>
									<FontAwesomeIcon icon="filter" />
								</div>
								<div className={boardStyle("filterList")} id="filterList">
									<div className={boardStyle("filterWrap")}>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㄱ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㄴ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㄷ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㄹ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅁ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅂ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅅ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅇ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅈ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅊ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅋ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅌ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅍ</div>
										<div className={boardStyle("filterItem")} onClick={this.filter}>ㅎ</div>
									</div>
								</div>

								<div className={boardStyle("boardSearch")} onClick={this.fs}>
									<FontAwesomeIcon icon="search" />
								</div>
								<div className={boardStyle("searchInput")} id="searchInput">
									<input type="text" />
								</div>

							</div>

							<div className={boardStyle("boardDetail")} id="boardList">

								<div className={boardStyle("boardWrap")}>
									<div className={boardStyle("boardImg")}>
										<img className={boardStyle("imgEa")} src="/portfolio/thumbs?pvn=khq7jbf9nt8d4f0186gj.jpg" />
									</div>
									<div className={boardStyle("boardTxt")}>
										<div className={boardStyle("txtMiddle")}>
											<div className={boardStyle("txtTitle")}>
												TESTING #1
											</div>
											<div className={boardStyle("txtContent")}>
												권신홍 작가 특유의 유쾌한 시선이 느껴지는 ‘금요일 할아버지’는 밋밋한 공간에 유머러스한 활기를 불어넣습니다. 불빛이 번쩍이는 금요일 밤 맥주 한잔을 손에 든 할아버지의 모습은 우리에게 친숙함을 넘어 즐거운 감정을 느끼게 합니다. 인더스트리얼 스타일 철제 장식장과 깜찍한 팬던트 조명, 원색적인 데스크 용품들이 조화를 이루며 감각적이고 개성 넘치는 공간이 완성되었습니다.
											</div>
											<div className={boardStyle("txtLv")}>
												<span className={boardStyle("txtLikes")}>2</span>
												<span className={boardStyle("txtViews")}>3</span>
											</div>
										</div>
									</div>
								</div>

								<div className={boardStyle("boardWrap")}>
									<div className={boardStyle("boardImg")}>
										<img className={boardStyle("imgEa")} src="/portfolio/thumbs?pvn=qrprwnmlnzq0fq9p3vaq1l6.jpg" />
									</div>
									<div className={boardStyle("boardTxt")}>
										<div className={boardStyle("txtMiddle")}>
											<div className={boardStyle("txtTitle")}>
												TESTING #2
											</div>
											<div className={boardStyle("txtContent")}>
												권신홍 작가 특유의 유쾌한 시선이 느껴지는 ‘금요일 할아버지’는 밋밋한 공간에 유머러스한 활기를 불어넣습니다. 불빛이 번쩍이는 금요일 밤 맥주 한잔을 손에 든 할아버지의 모습은 우리에게 친숙함을 넘어 즐거운 감정을 느끼게 합니다. 인더스트리얼 스타일 철제 장식장과 깜찍한 팬던트 조명, 원색적인 데스크 용품들이 조화를 이루며 감각적이고 개성 넘치는 공간이 완성되었습니다.
											</div>
											<div className={boardStyle("txtLv")}>
												<span className={boardStyle("txtLikes")}>2</span>
												<span className={boardStyle("txtViews")}>3</span>
											</div>
										</div>
									</div>
								</div>

								<div className={boardStyle("boardWrap")}>
									<div className={boardStyle("boardImg")}>
										<img className={boardStyle("imgEa")} src="/portfolio/thumbs?pvn=dwq0hyik0gizf0mc8wrx0f.jpg" />
									</div>
									<div className={boardStyle("boardTxt")}>
										<div className={boardStyle("txtMiddle")}>
											<div className={boardStyle("txtTitle")}>
												TESTING #3
											</div>
											<div className={boardStyle("txtContent")}>
												권신홍 작가 특유의 유쾌한 시선이 느껴지는 ‘금요일 할아버지’는 밋밋한 공간에 유머러스한 활기를 불어넣습니다. 불빛이 번쩍이는 금요일 밤 맥주 한잔을 손에 든 할아버지의 모습은 우리에게 친숙함을 넘어 즐거운 감정을 느끼게 합니다. 인더스트리얼 스타일 철제 장식장과 깜찍한 팬던트 조명, 원색적인 데스크 용품들이 조화를 이루며 감각적이고 개성 넘치는 공간이 완성되었습니다.
											</div>
											<div className={boardStyle("txtLv")}>
												<span className={boardStyle("txtLikes")}>2</span>
												<span className={boardStyle("txtViews")}>3</span>
											</div>
										</div>
									</div>
								</div>

							</div>

							<div className={baseStyle("paginationWrap")}>
								<div className={baseStyle("paginationContainer")} id="pagination"></div>
							</div>
							
						</div>
					</section>

				</div>

			</div>

		)
	}
	
}

const mapStateToProps = (state, props) => {
	return ({
		state: state,
	});
}

const mapDispatchToProps = dispatch => {
	return {
		getBoard: (object) => dispatch(BoardReducer.getBoard(object)),
		// loginProc: (loginObj) => dispatch(LoginReducer.loginProc(loginObj)),
	};
}

export default withCookies(connect(
	
	mapStateToProps,
	mapDispatchToProps
	
)(Board));