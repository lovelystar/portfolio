import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import * as JoinReducer from "../reducer/JoinReducer";

// board 스타일 정의
import classNames from "classnames/bind";
import join from "../../scss/join.scss";
const joinStyle = classNames.bind(join);

import login from "../../scss/login.scss";

class Join extends Component {
	
	constructor(props){
		
		super(props)
		this.state = {
			id: false,
		}
		
	}

	componentDidMount() {

		const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/; // 이메일 정규식
		const numRegex = /^[\d]{4}$/; // 숫자 정규식 (4자)

		// 영문 + 숫자 + 특수문자 각각 사용할 수 있음
		const pwRegex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9])*.{4,16}$/; // 비밀번호 정규식 (영문, 숫자, 특수문자 허용) *.{}에서 *빠지면 3가지 모두 충족해야함
		// 영문 + 숫자 + 특수문자 조합 "필"
		//const pwRegex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{4,16}$/; // 비밀번호 정규식 (영문, 숫자, 특수문자 허용) *.{}에서 *빠지면 3가지 모두 충족해야함
		
		const nickRegex = /^(?=.[A-Za-z0-9가-힣]).{2,}$/;
		//const nickRegex = /^[A-Za-z0-9가-힣]$/; // 닉네임 정규식 (영문, 숫자, 한글 허용) 단, 한글은 자음+모음조합

		const formEach = document.getElementsByClassName("form_ea");

		let inputId = document.getElementById("id");
		let inputNick = document.getElementById("nickName");
		let inputPw = document.getElementById("pw");
		let inputPwc = document.getElementById("pwc");
		let inputEmail = document.getElementById("email");
		let inputHp2 = document.getElementById("hp2");
		let inputHp3 = document.getElementById("hp3");

		for(let i=0; i<formEach.length; i++){
			formEach[i].addEventListener("click", (e) => {
				e.currentTarget.firstChild.focus();
			});
		}

		inputId.addEventListener("change", (e) => {

			inputId.parentNode.classList.remove("false");
			inputId.parentNode.classList.remove("true");
			inputNick.value = inputId.value;
			if(nickRegex.test(inputNick.value)) {

				inputNick.parentNode.classList.add("true");
				inputNick.parentNode.classList.remove("false");

			} else {

				inputNick.parentNode.classList.add("false");
				inputNick.parentNode.classList.remove("true");

			}
			
		});

		inputNick.addEventListener("change", (e) => {
			if(nickRegex.test(e.currentTarget.value)) {

				inputNick.parentNode.classList.add("true");
				inputNick.parentNode.classList.remove("false");

			} else {

				inputNick.parentNode.classList.add("false");
				inputNick.parentNode.classList.remove("true");

			}
		});

		inputPw.addEventListener("change", (e) => {

			if(pwRegex.test(e.currentTarget.value)) {

				inputPw.parentNode.classList.add("true");
				inputPw.parentNode.classList.remove("false");

			} else {

				inputPw.parentNode.classList.add("false");
				inputPw.parentNode.classList.remove("true");

			}

			if(inputPwc.value == e.currentTarget.value) {

				inputPwc.parentNode.classList.add("true");
				inputPwc.parentNode.classList.remove("false");

			} else {

				inputPwc.parentNode.classList.add("false");
				inputPwc.parentNode.classList.remove("true");

			}

		});

		inputPwc.addEventListener("change", (e) => {
			if(inputPw.value == e.currentTarget.value) {

				inputPwc.parentNode.classList.add("true");
				inputPwc.parentNode.classList.remove("false");

			} else {

				inputPwc.parentNode.classList.add("false");
				inputPwc.parentNode.classList.remove("true");

			}
		});

		inputEmail.addEventListener("change", (e) => {

			if(emailRegex.test(e.currentTarget.value)) {

				inputEmail.parentNode.classList.add("true");
				inputEmail.parentNode.classList.remove("false");

			} else {

				inputEmail.parentNode.classList.add("false");
				inputEmail.parentNode.classList.remove("true");

			}

		});

		inputHp2.addEventListener("change", (e) => {

			if(numRegex.test(e.currentTarget.value)) {

				inputHp2.parentNode.classList.add("true");
				inputHp2.parentNode.classList.remove("false");

			} else {

				inputHp2.parentNode.classList.add("false");
				inputHp2.parentNode.classList.remove("true");

			}

		});

		inputHp3.addEventListener("change", (e) => {

			if(numRegex.test(e.currentTarget.value)) {

				inputHp3.parentNode.classList.add("true");
				inputHp3.parentNode.classList.remove("false");

			} else {

				inputHp3.parentNode.classList.add("false");
				inputHp3.parentNode.classList.remove("true");

			}

		});

		const hpSelected = document.getElementById("hp_selected");
		const hpOption = document.getElementsByClassName("h_opt");
		for(let i=0; i<hpOption.length; i++){
			hpOption[i].addEventListener("click", (e) => {
				
				hpSelected.innerHTML = e.currentTarget.firstChild.value;
				// dropdown class 지워야 하는데 hp Option이 form_ea의 자식이라 click 이벤트에 선택이 되어 onClick selctedOpt가 눌린다.
				// 내가볼 땐 relative / absolute 문제
			});
		}

	}

	componentDidUpdate() {

		// id 중복확인 완료.
		let idCheck = this.props.state.JoinReducer.idCheck;
		let inputId = document.getElementById("id");

		if(idCheck == 1) {

			inputId.parentNode.classList.remove("false");
			inputId.parentNode.classList.add("true");

		} else if(idCheck == 0) {
			inputId.parentNode.classList.remove("true");
			inputId.parentNode.classList.add("false");
		}

		// 회원가입 완료
		let joinCheck = this.props.state.JoinReducer.joinCheck;
		if(joinCheck != null){

			const resultCode = joinCheck.resultCode;
			const resultMessage = joinCheck.resultMessage;

			const confReason = document.getElementById("confReason");
			const confMaskClose = document.getElementById("confMaskClose");
			const confBtn = document.getElementById("confBtn");

			confReason.innerHTML = resultMessage;
			this.conf();
			
			// 성공
			if(resultCode == 1) {

				confBtn.addEventListener("click", (e) => {
					//location.href = "/gdms/login";
				});

				// 실패
			} else {
				
				confMask.addEventListener("click", (e) => {
					this.conf();
				});

				confMaskClose.addEventListener("click", (e) => {
					this.conf();
				});

				confBtn.addEventListener("click", (e) => {
					this.conf();
				});

			}

		}

	}

	logo = (e) => {
		//location.href = "/gdms";
	}

	checkId = (e) => {
		
		// 한글 여부
		//const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

		// 영문 + 숫자 + "." 조합의 4자리 ~ 16자리 아이디
		const regex = /^[A-Za-z0-9.+]{4,16}$/;
		const id = document.getElementById("id");

		if(regex.test(id.value) == false) {

			const alertMask = document.getElementById("alertMask");
			const alertMaskForm = document.getElementById("alertMaskForm");
			const alertMaskWrap = document.getElementById("alertMaskWrap");
			const alertReason = document.getElementById("alertReason");

			alertMask.className == "active" ? alertMask.classList.remove("active") : alertMask.classList.add("active");
			alertMaskForm.className == "active" ? this.fadeOut(alertMask, alertMaskWrap) : this.fadeIn(alertMask, alertMaskWrap);
			alertMaskForm.className == "active" ? alertMaskForm.classList.remove("active") : alertMaskForm.classList.add("active");
			alertReason.innerHTML = "사용할 수 없는 ID입니다. <br /> 아이디는 영문, 숫자로 4 ~ 16자 이내로 입력해 주세요.";

			id.parentNode.classList.remove("true");
			id.parentNode.classList.add("false");

		} else {

			this.props.idCheck(id.value);

		}
		
	}

	alert = (e) => {
		
		let aMask = document.getElementById("alertMask");
		let aMaskForm = document.getElementById("alertMaskForm");
		let aMaskWrap = document.getElementById("alertMaskWrap");

		aMask.className == "active" ? aMask.classList.remove("active") : aMask.classList.add("active");
		aMaskForm.className == "active" ? this.fadeOut(aMask, aMaskWrap) : this.fadeIn(aMask, aMaskWrap);
		aMaskForm.className == "active" ? aMaskForm.classList.remove("active") : aMaskForm.classList.add("active");
		
	}

	conf = (e) => {

		const confMask = document.getElementById("confMask");
		const confMaskForm = document.getElementById("confMaskForm");
		const confMaskWrap = document.getElementById("confMaskWrap");

		confMask.className == "active" ? confMask.classList.remove("active") : confMask.classList.add("active");
		confMaskForm.className == "active" ? this.fadeOut(confMask, confMaskWrap) : this.fadeIn(confMask, confMaskWrap);
		confMaskForm.className == "active" ? confMaskForm.classList.remove("active") : confMaskForm.classList.add("active");

	}

	selectedOpt = (e) => {

		const hp = e.currentTarget;
		if(hp.classList.contains("dropdown")){
			hp.classList.remove("dropdown");
		} else {
			hp.classList.add("dropdown");
		}

	}

	formSubmit = (e) => {
		
		const btnId = e.currentTarget.getAttribute("id");
		if(btnId == "form_sub"){

			const verify = document.getElementsByClassName("form_ea");
			const signObj = new Object();
			let vCnt = 0;

			let inputId = document.getElementById("id");
			let inputNick = document.getElementById("nickName");
			let inputPw = document.getElementById("pw");
			let inputEmail = document.getElementById("email");
			let inputHp1 = document.getElementById("hp_selected");
			let inputHp2 = document.getElementById("hp2");
			let inputHp3 = document.getElementById("hp3");

			for(let i=0; i<verify.length; i++){
				verify[i].classList.contains("true") ? vCnt++ : null;
			}

			if(verify.length == vCnt) {

				signObj.id = inputId.value;
				signObj.pw = inputPw.value;
				signObj.nickName = inputNick.value;
				signObj.email = inputEmail.value;

				let hp = inputHp1.innerHTML + "-" + inputHp2.value + "-" + inputHp3.value;
				signObj.hp = hp;

				this.props.join(signObj);

			} else {

				let aMask = document.getElementById("alertMask");
				let aMaskForm = document.getElementById("alertMaskForm");
				let aMaskWrap = document.getElementById("alertMaskWrap");
				let aReason = document.getElementById("alertReason");

				for(let i=0; i<verify.length; i++){
					if(!verify[i].classList.contains("true")) {

						const id = verify[i].getAttribute("data-ea");
						let alertString = new String;

						if(id == "id") {
							document.getElementById(id).focus();
							alertString = "아이디를 확인해주세요.";
						} else if(id == "nickName") {
							document.getElementById(id).focus();
							alertString = "닉네임을 확인해주세요.";
						} else if(id == "pw" || id == "pwc") {
							document.getElementById(id).focus();
							alertString = "비밀번호를 확인해주세요.";
						} else if(id == "email") {
							document.getElementById(id).focus();
							alertString = "이메일을 확인해주세요.";
						} else if(id == "hp1" || id == "hp2" || id == "hp3") {
							document.getElementById(id).focus();
							alertString = "휴대폰번호를 확인해주세요.";
						}

						aMask.className == "active" ? aMask.classList.remove("active") : aMask.classList.add("active");
						aMaskForm.className == "active" ? this.fadeOut(aMask, aMaskWrap) : this.fadeIn(aMask, aMaskWrap);
						aMaskForm.className == "active" ? aMaskForm.classList.remove("active") : aMaskForm.classList.add("active");
						aReason.innerHTML = alertString;

						return false;

					}
				}
				
			}

		} else {
			// 이전페이지로 되돌아감
			history.back();
		}

	}

	fadeIn = (first, second) => {

		let opacity = 0;
		let height = 0;

		let fade = setInterval(function() {

			let firstHeight = window.getComputedStyle(first).height.replace("px", "").trim();
			if(height == firstHeight){

				opacity += 1 * 0.5;
				if(opacity >= 1){
					second.style.opacity = 1;
					clearInterval(fade);
				}

			} else {
				height = firstHeight;
			}

		}, 50);

		let htmlTag = document.getElementsByTagName("html")[0];
		htmlTag.style.overflow == "hidden" ? htmlTag.style.overflow = "auto" : htmlTag.style.overflow = "hidden";

	}

	fadeOut = (first, second) => {

		let opacity = second.style.opacity;
		let height = 0;

		let fade = setInterval(function() {

			let firstHeight = window.getComputedStyle(first).height.replace("px", "").trim();
			if(height == firstHeight){

				opacity -= 1 * 0.5;
				if(opacity <= 0){
					second.style.opacity = 0;
					clearInterval(fade);
				}

			} else {
				height = firstHeight;
			}

		}, 50);

		let htmlTag = document.getElementsByTagName("html")[0];
		htmlTag.style.overflow == "hidden" ? htmlTag.style.overflow = "auto" : htmlTag.style.overflow = "hidden";
//<img src="/gdms/resources/img/glaam_logo.png" onClick={this.logo} />
//<img src="/gdms/resources/img/glaam_warning.png" />
//<img src="/gdms/resources/img/glaam_warning.png" />
	}
	
	render() {
		return (
			
			<div>

				<div className={joinStyle("join_container")}>
					<div className={joinStyle("join_wrap")}>

						<div className={joinStyle("join_logo")}>
							
						</div>

						<div className={joinStyle("join_title")}>
							<h2>INFORMATION</h2>
							<p>필수입력사항</p>
						</div>

						<div className={joinStyle("join_form")}>
							
							<table>
								<tbody>
									<tr>
										<th className={joinStyle("nec")}>아이디</th>
										<td>
											<div className={joinStyle("form_ea")} data-ea="id">
												<input type="text" id="id" />
											</div>
											<button type="button" id="checkBtn" onClick={this.checkId}>CHECK</button>
										</td>
									</tr>
									<tr>
										<th className={joinStyle("nec")}>닉네임</th>
										<td>
											<div className={joinStyle("form_ea")} data-ea="nickName">
												<input type="text" id="nickName" />
											</div>
										</td>
									</tr>
									<tr>
										<th className={joinStyle("nec")}>비밀번호</th>
										<td>
											<div className={joinStyle("form_ea")} data-ea="pw">
												<input type="password" id="pw" />
											</div>
										</td>
									</tr>
									<tr>
										<th className={joinStyle("nec")}>비밀번호 확인</th>
										<td>
											<div className={joinStyle("form_ea")} data-ea="pwc">
												<input type="password" id="pwc" />
											</div>
										</td>
									</tr>
									<tr>
										<th className={joinStyle("nec")}>이메일</th>
										<td>
											<div className={joinStyle("form_ea email")} data-ea="email">
												<input type="text" id="email" />
											</div>
										</td>
									</tr>
									<tr>
										<th>휴대폰번호</th>
										<td>
											<div className={joinStyle("form_ea hp true")} id="hp1" onClick={this.selectedOpt}>
												<div id="hp_selected">
													010
												</div>
												<div id="hp_option">
													<label className={joinStyle("h_opt")}>
														<input type="hidden" value="010" />
														010
													</label>
													<label className={joinStyle("h_opt")}>
														<input type="hidden" value="011" />
														011
													</label>
													<label className={joinStyle("h_opt")}>
														<input type="hidden" value="016" />
														016
													</label>
													<label className={joinStyle("h_opt")}>
														<input type="hidden" value="017" />
														017
													</label>
													<label className={joinStyle("h_opt")}>
														<input type="hidden" value="018" />
														018
													</label>
													<label className={joinStyle("h_opt")}>
														<input type="hidden" value="019" />
														019
													</label>
												</div>
											</div>
											<div className={joinStyle("form_ea hp")} data-ea="hp2">
												<input type="text" maxLength="4" id="hp2" />
											</div>
											<div className={joinStyle("form_ea hp")} data-ea="hp3">
												<input type="text" maxLength="4" id="hp3" />
											</div>
										</td>
									</tr>
									<tr>
										<th>회원구분</th>
										<td>
											<div className={joinStyle("form_ea user true")} data-ea="type">
												<input type="text" value="GUEST" disabled />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							<div className={joinStyle("form_btn")}>
								<button id="form_sub" type="button" onClick={this.formSubmit}>Sign Up</button>
								<button id="form_can" type="button" onClick={this.formSubmit}>Cancel</button>
							</div>

						</div>

					</div>
				</div>
			
				<div id="alertMask" onClick={this.alert}></div>
				<div id="alertMaskForm">
					<div id="alertMaskWrap">
						
						<div id="alertMaskClose" onClick={this.alert}>
							<i></i>
							<i></i>
						</div>
						<div id="alert">
							
							<p id="alertReason"></p>
						</div>
						<div id="alertConfirm">
							<button onClick={this.alert}>확인</button>
						</div>

					</div>
				</div>

				<div id="confMask"></div>
				<div id="confMaskForm">
					<div id="confMaskWrap">
						
						<div id="confMaskClose">
							<i></i>
							<i></i>
						</div>
						<div id="conf">
							
							<p id="confReason"></p>
						</div>
						<div id="confConfirm">
							<button id="confBtn">확인</button>
						</div>

					</div>
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
		idCheck: (id) => dispatch(JoinReducer.idCheck(id)),
		join: (obj) => dispatch(JoinReducer.join(obj)),
	};
}

export default withCookies(connect(
	
	mapStateToProps,
	mapDispatchToProps
	
)(Join));