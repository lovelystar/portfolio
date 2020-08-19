import React, { Component } from "react";

import classNames from "classnames/bind";
import base from "../../scss/base.scss";
const baseStyle = classNames.bind(base);

class Footer extends Component {
	
	render() {
		
		return (
			<footer>
				<div className={baseStyle('footerWrap')}>
					<p>COPYRIGHT 2020 SUMIN OH. ALL RIGHT RESERVED.</p>
				</div>
			</footer>
		);
		
	}
	
}

export default Footer;