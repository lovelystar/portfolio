import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./router/Router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faFileVideo,
	faFileImage,
	faMusic,
	faFont,
	faClock,
	faCloud,
	faLink,
	faLayerGroup,
	faCog,
	faCloudUploadAlt,
	faSpinner,
	faSyncAlt,
	faFilter,
	faSearch,
	faRedo, 
	faAngleLeft, 
	faAngleRight,
	faAngleDown
} from "@fortawesome/free-solid-svg-icons";
library.add(faFileVideo, faFileImage, faMusic, faFont, faClock, faCloud, faLink, faLayerGroup, faCog, faCloudUploadAlt, faSpinner, faSyncAlt, faFilter, faSearch, faRedo, faAngleLeft, faAngleRight, faAngleDown);

// js에서 super는 부모 클래스 생성자를 가르킨다.
// 여기선 Component가 되겠다.
class App extends Component {
	
	// constructor, super에 props를 넣는 이유는 명확하게 props를 사용하기 위해서
	// props >> ...args가 props와 context까지 편하게 해결할 수 있음.
	constructor(props){
		super(props)
		this.state = {}
	}
	
	state = {}
	
	render() {
		return (
			<div>
				<Router />
			</div>
		);
	}
}

// export default App;
// = module.export = App의 역할

export default connect()(App);