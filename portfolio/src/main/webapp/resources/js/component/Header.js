import React, { Component } from "react";

import classNames from "classnames/bind";
import base from "../../scss/base.scss";
const baseStyle = classNames.bind(base);

class Header extends Component {

	constructor(props){

		super(props);
		this.state = {
            
		}

	}

	componentDidMount() {
    }

	render() {
		
		return (
            <header>
                <div className={baseStyle("headerWrap")}>
                    
					<div className={baseStyle("headerLogo")}>
                        <a href="/portfolio/">SUMIN</a>
                    </div>
					<div className={baseStyle("headerCategory")}>
						<ul>
							<li className={baseStyle("header_each", "active")}>
								<a href="/portfolio/">HOME</a>
							</li>
							<li className={baseStyle("header_each")}>
								<a href="/portfolio/">ABOUT</a>
							</li>
							<li className={baseStyle("header_each")}>
								<a href="/portfolio/">PROJECT</a>
							</li>
							<li className={baseStyle("header_each")}>
								<a href="/portfolio/">CONTACT</a>
							</li>
						</ul>
					</div>

                </div>
            </header>
		);
		
	}
	
}

export default Header;