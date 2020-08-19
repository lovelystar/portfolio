import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import Header from "../component/Header";
import Footer from "../component/Footer";

import classNames from "classnames/bind";
import base from "../../scss/base.scss";
const baseStyle = classNames.bind(base);

import main from "../../scss/main.scss";
const mainStyle = classNames.bind(main);

class Main extends Component {
	
	constructor(props){

		super(props);
		this.state = {
		}

	}

	componentDidMount() {
		
		// 크로스 브라우징
		// client@@@ = 스크롤바의 공간을 제외한 부분
		let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		
		// 스크롤 이벤트
		window.addEventListener("scroll", this.scroll);
		
		// 인터넷 창 조절 이벤트
		window.addEventListener("resize", this.resize);
		
		// 첫번째 섹션의 크기 설정
		let sectionTag = document.getElementsByTagName("section");
		sectionTag[0].style.height = clientHeight - 56 + "px";

		// 텍스트 타이핑 애니메이션
		let textSpan = document.getElementsByClassName("textSpan");
		let animatedValue = textSpan[0].getAttribute("text-data");
		let animatedPeriod = textSpan[0].getAttribute("text-period");

		this.textAnimation(textSpan[0], JSON.parse(animatedValue), animatedPeriod);

		let headerEa = document.getElementsByClassName("header_each");
		/*
		for(let i=0; i<headerEa.length; i++) {
			headerEa[i].addEventListener("click", (e) => {

				switch(i) {
					case i :
						this.moveScroll(i);
						break;
				}

			});
		}
		*/
	}

	scroll = (e) => {

		let position = window.scrollY || document.documentElement.scrollTop;
		position = parseInt(position);

		// section
		let sectionEa = document.getElementsByTagName("section");
		let skill = sectionEa[0].style.height.replace("px", "").trim();

		let sectionTotal = 0;

		// 헤더 animation
		let headerEa = document.getElementsByClassName("header_each");
		let headerBreak = false;
		for(let i=0; i<sectionEa.length; i++) {
			
			let sectionHeight = parseInt(window.getComputedStyle(sectionEa[i]).height.replace("px", "").trim() / 1.05);
			sectionTotal += sectionHeight;

			if(position <= sectionTotal && headerBreak == false){
				headerBreak = true;
				headerEa[i].classList.add("active");
			} else {
				headerEa[i].classList.remove("active");
			}

		}

		// skill animation
		const skillBarFilled = document.getElementsByClassName("skillBarFilled");
		if(position > skill / 1.2 && position < skill * 2) {
			for(let i=0; i<skillBarFilled.length; i++) {
				
				let skillName = skillBarFilled[i].getAttribute("data-skill");
				skillBarFilled[i].classList.add(skillName);

			}
		} else {
			for(let i=0; i<skillBarFilled.length; i++) {
				
				let skillName = skillBarFilled[i].getAttribute("data-skill");
				skillBarFilled[i].classList.remove(skillName);

			}
		}

	}

	moveScroll = (cnt) => {

		let scrollPosition = window.scrollY || document.documentElement.scrollTop;
		let scrollBoolean;
		let scrollStep;

		let section = 0;
		let sectionEa = document.getElementsByTagName("section");
		for(let i=0; i<=cnt; i++){

			if(i == 0) {
				section = 0;
			} else {
				section += parseInt(window.getComputedStyle(sectionEa[i-1]).height.replace("px", "").trim());
			}

		}

		if(section < scrollPosition) {
			scrollBoolean = true;
			scrollStep = -section / 5;
		} else {
			scrollBoolean = false;
			scrollStep = section / 20;
		}

		let scrollTo = setInterval(function() {

			window.scrollBy(section, scrollStep);
			scrollPosition = window.scrollY || document.documentElement.scrollTop;

			if(scrollBoolean) {
				if(scrollPosition <= section) {
					clearInterval(scrollTo);
				}
			} else {
				if(scrollPosition >= section) {
					clearInterval(scrollTo);
				}
			}

		}, 20);

	}

	resize = (e) => {

		let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let sectionTag = document.getElementsByTagName("section")[0];
		sectionTag.style.height = clientHeight - 56 + "px";
		
	}

	textAnimation = (e, text, period) => {

		let loop = 0;
		period = parseInt(period, 10) || 2000;

		let result = "";
		let textBool = false;

		this.textAnimationExec(e, text, period, loop, result, textBool);

	}

	textAnimationExec = (e, text, period, loop, result, textBool) => {

		let cnt = loop % text.length;
		let base = text[cnt];
		let speed = 150 - Math.random() * 100;

		if(textBool) {
			result = base.substring(0, result.length - 1);
			speed /= 2;
		} else {
			result = base.substring(0, result.length + 1);
		}

		e.innerHTML = "<span class='textCycle'>" + result + "</span>";

		if(!textBool && result === base) {
			textBool = true;
			speed = period;
		} else if(textBool && result === "") {
			textBool = false;
			loop++;
			speed = 500;
		}

		setTimeout(() => {
			this.textAnimationExec(e, text, period, loop, result, textBool);
		}, speed);

	}


	render() {
        
		return (
				
			<div>
				<Header />
				<div className={baseStyle("baseContainer")}>

					<section>
						<div className={baseStyle("mainContainer")}>
							
							<div className={mainStyle("textAnimationWrap")}>
								<div className={mainStyle("animated")}>
									<span className={mainStyle("textSpan")} text-data='["Full-Stack Developer"]' text-period="2000"></span>
								</div>
								<p className={mainStyle("suminText")}>Sumin Oh</p>
							</div>
							<a className={mainStyle("scrollingBtn")}></a>
							
						</div>
					</section>

					<section>
						<div className={baseStyle("mainContainer")}>
							
							<div className={baseStyle("mainTitle")}>
								<h2>ABOUT</h2>
							</div>
							<div className={baseStyle("mainInfo")}>
								<div className={baseStyle("infoDivision")}>
									<div className={mainStyle("suminInfo")}>

										<h3>PROFILE</h3>
										<img src="/portfolio/resources/img/portfolio.jpg" />
										<ul className={mainStyle("profile")}>
											<li>오 수 민</li>
											<li>Full-Stack Developer [경력, 3년]</li>
											<li>1994. 02. 01</li>
											<li>서울특별시 송파구 삼전동</li>
											<li>010-4651-4580</li>
											<li>lovelystar0201@naver.com</li>
										</ul>

									</div>
									<div className={mainStyle("suminInfo")}>
										<h3>RECORD</h3>
										<ul className={mainStyle("record")}>
											<li>
												<p>전주대학교</p>
												<p>정보시스템 전공</p>
												<p>2012. 03 ~ 2018. 02</p>
											</li>
											<li>
												<p>GLAAM</p>
												<p>콘텐츠개발팀</p>
												<p>2017. 08 ~ 2020. xx</p>
											</li>
										</ul>
									</div>
									<div className={mainStyle("suminInfo")}>
										<ul className={mainStyle("skillBar", "active")}>
											<li>
												<span>HTML</span>
												<div className={mainStyle("skillBarWrap")}>
													<div className={mainStyle("skillBarEmpty")}></div>
													<div className={mainStyle("skillBarFilled")} data-skill="html"></div>
												</div>
											</li>
											<li>
												<span>Ajax</span>
												<div className={mainStyle("skillBarWrap")}>
													<div className={mainStyle("skillBarEmpty")}></div>
													<div className={mainStyle("skillBarFilled")} data-skill="ajax"></div>
												</div>
											</li>
											<li>
												<span>Axios</span>
												<div className={mainStyle("skillBarWrap")}>
													<div className={mainStyle("skillBarEmpty")}></div>
													<div className={mainStyle("skillBarFilled")} data-skill="axios"></div>
												</div>
											</li>
											<li>
												<span>Java Script</span>
												<div className={mainStyle("skillBarWrap")}>
													<div className={mainStyle("skillBarEmpty")}></div>
													<div className={mainStyle("skillBarFilled")} data-skill="js"></div>
												</div>
											</li>
											<li>
												<span>JQuery</span>
												<div className={mainStyle("skillBarWrap")}>
													<div className={mainStyle("skillBarEmpty")}></div>
													<div className={mainStyle("skillBarFilled")} data-skill="jquery"></div>
												</div>
											</li>
											<li>
												<span>CSS</span>
												<div className={mainStyle("skillBarWrap")}>
													<div className={mainStyle("skillBarEmpty")}></div>
													<div className={mainStyle("skillBarFilled")} data-skill="css"></div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div className={baseStyle("infoDivision")}>
									<div className={mainStyle("suminInfo")}>
										<h3>SKILL</h3>
										<ul className={mainStyle("skill")}>
											<li>Spring Framework 4</li>
											<li>MySQL</li>
											<li>MyBatis</li>
											<li>다중 DB</li>
											<li>FFMPEG, FFPROBE</li>
											<li>파일업로드</li>
											<li>Spring Security</li>
											<li>보안서버 구축 : 인증서버 ( Access Token + JWT + JDBC )</li>
											<li>자원서버 구축</li>
											<li>소켓서버 구축 : 실시간 통신</li>
											<li>쿼리문 제작</li>
											<li>Restful Api 제작</li>
											<li>HTML5, CSS3 웹 표준 마크업</li>
											<li>JavaScript</li>
											<li>Ajax</li>
											<li>Axios</li>
											<li>JQuery</li>
											<li>SCSS</li>
											<li>Amazon S3</li>
											<li>React</li>
											<li>Redux</li>
											<li>Redux-saga</li>
											<li>반응형</li>
										</ul>
									</div>
								</div>
							</div>

						</div>
					</section>

					<section>
						<div className={baseStyle("mainContainer")}>
							<div className={baseStyle("mainTitle")}>
								<h2>PROJECT</h2>
							</div>
							<div className={baseStyle("mainInfo")}>

								<div className={baseStyle("infoFullDivision")}>
									<div className={mainStyle("project")}>
										<div className={mainStyle("projectInfo")}>
											<span className={mainStyle("projectCnt")}>01</span>
											<h3>로그인</h3>
											<p className={mainStyle("projectExplain")}>회원 기능을 구현한 페이지입니다.</p>
											<ul>
												<li>2020. 07 ~ 2020. xx</li>
												<li>SPRING SECURITY</li>
												<li>로그인</li>
												<li>회원가입</li>
												<li>REMEMBER ME</li>
											</ul>
											<a href="/portfolio/login">VIEW</a>
										</div>
										<img className={mainStyle("projectImg")} src="/portfolio/resources/img/login_p.png" />
									</div>
								</div>

								<div className={baseStyle("infoFullDivision")}>
									<div className={mainStyle("project")}>
										<img className={mainStyle("projectImg")} src="/portfolio/resources/img/board_p.png" />
										<div className={mainStyle("projectInfo")} style={{"paddingLeft": "10%", "paddingRight": "0"}}>
											<span className={mainStyle("projectCnt")}>02</span>
											<h3>게시판</h3>
											<p className={mainStyle("projectExplain")}>게시판 기능을 구현한 페이지입니다.</p>
											<ul>
												<li>2020. 07 ~ 2020. xx</li>
												<li>댓글, 덧글</li>
												<li>FFMPEG, FFPROBE</li>
												<li>파일업로드</li>
												<li>Axios</li>
												<li>Progress bar</li>
												<li>조회수, 좋아요, 신고</li>
											</ul>
											<a href="/portfolio/board">VIEW</a>
										</div>
									</div>
								</div>

								<div className={baseStyle("infoFullDivision")}>
									<div className={mainStyle("project")}>
										<div className={mainStyle("projectInfo")}>
											<span className={mainStyle("projectCnt")}>03</span>
											<h3>캘린더</h3>
											<p className={mainStyle("projectExplain")}>캘린더 기능을 구현한 페이지입니다.</p>
											<ul>
												<li>2020. 07 ~ 2020. xx</li>
												<li>Axios</li>
											</ul>
											<a href="/portfolio/calendar">VIEW</a>
										</div>
										<img className={mainStyle("projectImg")} src="/portfolio/resources/img/calendar_p.png" />
									</div>
								</div>

								<div className={baseStyle("infoFullDivision")}>
									<div className={mainStyle("project")}>
										<img className={mainStyle("projectImg")} src="/portfolio/resources/img/port_bg.jpg" />
										<div className={mainStyle("projectInfo")} style={{"paddingLeft": "10%", "paddingRight": "0"}}>
											<span className={mainStyle("projectCnt")}>04</span>
										</div>
									</div>
								</div>

								<div className={baseStyle("infoFullDivision")}>
									<div className={mainStyle("project")}>
										<div className={mainStyle("projectInfo")}>
											<span className={mainStyle("projectCnt")}>05</span>
										</div>
										<img className={mainStyle("projectImg")} src="/portfolio/resources/img/port_bg.jpg" />
									</div>
								</div>
								
							</div>
						</div>
					</section>

					<section>
						<div className={baseStyle("mainContainer")}>
							<div className={baseStyle("mainTitle")}>
								<h2>CONTACT</h2>
							</div>
							<div className={baseStyle("mainInfo")}>
								<div className={mainStyle("contact")}>
									<p>OWNER: 오수민</p>
									<p>EMAIL: lovelystar0201@naver.com</p>
									<p>HP: 010-4651-4580</p>
								</div>
							</div>
						</div>
					</section>

				</div>
				<Footer />
			</div>
			
		);
		
	}
	
};

const mapStateToProps = (state, props) => {

	return ({
		
		state: state,
		
	});
	
}

const mapDispatchToProps = dispatch => {
	
	return {

	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Main));