// 라우터 사용하는 이유
// 보통은 특정 URL로 들어오면 서버에서 해당되는 view 파일을 새로 뿌려주어
// 클라이언트 라우팅이 필요 없지만
// REACT는 모든 파일을 다 뿌려주어야 하므로 URL마다 다른 컴포넌트를 그려주어야 한다.

// BrowserRouter
// 라우팅 컴포넌트를 사용하기 위해 기본적으로 감싸줘야 한다.
// 오직 하나의 자식만을 가질 수 있다.

// Route
// render, component, children으로 렌더링을 한다.
// 실제 경로와 일치하지 않더라도 포함되는 경우에 렌더링을 한다. ("/") << 조심
// 완벽하게 경로와 일치할 때만 렌더링을 하려면 exact 속성을 설정하면 된다.
// 컴포넌트에 match, location, history 라는 객체를 넘겨준다.

// Link
// a 태그로 렌더링 되며, 사용법도 비슷하지만 동작이 조금 다르다.
// a 태그는 페이지 전체를 리로드하여 렌더링 하지만
// Link 태그는 필요한 부분만 리로드하게 된다.

import React, { Component } from "react";
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";

import Main from "../views/Main";

//import Login from "../views/Login";
import Join from "../views/Join";
import Board from "../views/Board";
import Calendar from "../views/Calendar";

class Router extends Component {
	
	constructor(props){
		
		super(props)
		this.state = {}
		
	}
	
	state = {}
	
	render() {
		
		return(
				<BRouter>
					<Switch>

						<Route path="/portfolio/" exact component={Main} />
						
						{/*<Route path="/portfolio/login" exact component={Login} />*/}
						<Route path="/portfolio/join" exact component={Join} />
						<Route path="/portfolio/board" exact component={Board} />
						<Route path="/portfolio/calendar" exact component={Calendar} />
						
					
					</Switch>
				</BRouter>
		);
		
	}
	
}

export default Router;