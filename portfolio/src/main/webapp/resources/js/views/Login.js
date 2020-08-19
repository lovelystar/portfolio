import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import Header from "../component/Header";
import Footer from "../component/Footer";

import classNames from "classnames/bind";
import login from "../../scss/login.scss";
const loginStyle = classNames.bind(login);

class Login extends Component {
	
	constructor(props){

		super(props);
		this.state = {
			erCode: document.getElementById("ec").value,
		}

	}

	componentDidMount() {
		
		const id = document.getElementById("username");
		const pw = document.getElementById("password");

		const idFocus = document.getElementById("idFocus");
		const pwFocus = document.getElementById("pwFocus");

		const opt = document.getElementById("opt");
		const remember = document.getElementById("remember");

		const erMsg = document.getElementById("erMsg");
		
		// focus
		id.addEventListener("focus", (e) => {
			id.parentNode.classList.add("active");
		});
		pw.addEventListener("focus", (e) => {
			pw.parentNode.classList.add("active");
		});

		// focus out
		id.addEventListener("blur", (e) => {
			id.parentNode.classList.remove("active");
		});
		pw.addEventListener("blur", (e) => {
			pw.parentNode.classList.remove("active");
		});
		
		// form click
		idFocus.addEventListener("click", (e) => {
			id.focus();
		});
		pwFocus.addEventListener("click", (e) => {
			pw.focus();
		});
			
		// remember
		opt.addEventListener("click", (e) => {
			remember.checked == true ? remember.checked = false : remember.checked = true;
		});

		// 엔터
		id.addEventListener("keydown", (e) => {
			if(e.keyCode == 13){
				pw.focus();
			}
		});
		pw.addEventListener("keydown", (e) => {
			if(e.keyCode == 13){
				login();
			}
		});

		let ec = this.state.erCode;
		if(ec == 0 || ec == "" || ec == null || ec == "undefined") {
			erMsg.style.display = "none";
		} else if(ec == 1) {
			erMsg.textContent = "존재하지 않는 ID입니다.";
		} else if(ec == 2) {
			erMsg.textContent = "인증 정보가 정확하지 않습니다.";
		}

	}

	login = (e) => {
		console.log("login1!!");
	}
	
	join = (e) => {
		location.href = "/portfolio/join";
	}
		
	alert = (e) => {
		
		let aMask = document.getElementById("alertMask");
		let aMaskForm = document.getElementById("alertMaskForm");
		let aMaskWrap = document.getElementById("alertMaskWrap");

		aMask.className == "active" ? aMask.classList.remove("active") : aMask.classList.add("active");
		aMaskForm.className == "active" ? this.fadeOut(aMask, aMaskWrap) : this.fadeIn(aMask, aMaskWrap);
		aMaskForm.className == "active" ? aMaskForm.classList.remove("active") : aMaskForm.classList.add("active");
		
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
		
	}

	render() {
        
		return (

			<div>

				<div className={loginStyle("login_container")}>
					<div className={loginStyle("login_wrap")}>
				
						<div className={loginStyle("login_logo")}>
							<span>OSM</span>
						</div>
						
						<form action="loginproc" method="POST">
							<div className="login_form id">
								<span id="idFocus">ID</span>
								<input type="text" id="username" name="username" />
							</div>
							<div className="login_form pw">
								<span id="pwFocus">PW</span>
								<input type="password" id="password" name="password" />
							</div>
							<div className="login_option" id="opt">
								<input type="checkbox" id="remember" />
								<label htmlFor="remember"></label>
								<span>remember me</span>
							</div>
							<div className={loginStyle("login_failure")}>
								<p id="erMsg">인증 정보가 정확하지 않습니다.</p>	
							</div>
							<div className="login_btn">
								<button type="submit">Sign In</button>
							</div>
						</form>
						
						<div className={loginStyle("login_up")}>
							<div className={loginStyle("login_sign")}>
								<p>회원가입을 하시면 더 많은 서비스를 이용하실 수 있습니다.</p>
							</div>
							<div className={loginStyle("login_sign_btn")}>
								<button type="button" onClick={this.join}>Sign Up</button>
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
	
)(Login));