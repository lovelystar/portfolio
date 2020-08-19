<!-- 가상 DOM이 들어가기 위한 빈껍데기 -->
<!-- id="root"에 가상 DOM이 들어감 -->
<!-- root는 index.js에서 설정 -->

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">

	<head>
		
		<meta http-equiv="Content-Script-Type" content="text/javascript">
		<meta http-equiv="Content-Style-Type" content="text/css">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- 파비콘 -->
		<link rel="shortcut icon" href="/portfolio/resources/img/favicon.ico" >

		<!-- CSS 정의 -->
		<link rel="stylesheet" href="/portfolio/resources/built/portfolio.css" />
		
		<!-- JQuery -->
		<script src="<c:url value='/resources/js/jquery/jquery-3.5.1.min.js' />"></script>
		<title>Login</title>
		
	</head>
	<body class="body-home">
		
		<div class="login_container">
			<div class="login_wrap">
		
				<div class="login_logo">
					<span>SUMIN</span>
				</div>
				
				<form action="login" method="POST">
					<div class="login_form id">
						<span id="idFocus">ID</span>
						<input type="text" id="username" name="username" />
					</div>
					<div class="login_form pw">
						<span id="pwFocus">PW</span>
						<input type="password" id="password" name="password" />
					</div>
					<div class="login_option" id="opt">
						<input type="checkbox" id="remember" />
						<label for="remember"></label>
						<span>remember me</span>
					</div>
					<div class="login_failure">
						<p id="erMsg">${erMsg}</p>	
					</div>
					<div class="login_btn">
						<button type="submit">Sign In</button>
					</div>
				</form>
				
				<div class="login_up">
					<div class="login_sign">
						<p>회원가입을 하시면 더 많은 서비스를 이용하실 수 있습니다.</p>
					</div>
					<div class="login_sign_btn">
						<button type="button" id="join">Sign Up</button>
					</div>
				</div>
				
			</div>
		</div>
		
		<script>
			$(document).ready(function(){
				
				$(document).on("focus", "#username", function(){
					$(this).parent().addClass("active");
				});

				$(document).on("focus", "#password", function(){
					$(this).parent().addClass("active");
				});
				
				$(document).on("blur", "#username", function(){
					$(this).parent().removeClass("active");
				});

				$(document).on("blur", "#password", function(){
					$(this).parent().removeClass("active");
				});
				
				$(document).on("click", "#idFocus", function(){
					$("#username").focus();
				});

				$(document).on("click", "#pwFocus", function(){
					$("#password").focus();
				});
				
				$(document).on("click", "#opt", function() {

					const remember = document.getElementById("remember");
					remember.checked == true ? remember.checked = false : remember.checked = true;
					
				});
				
				$(document).on("click", "#join", function(){
					location.href = "/portfolio/join";
				});
				
			});
		</script>
		
	</body>
	
	
</html>