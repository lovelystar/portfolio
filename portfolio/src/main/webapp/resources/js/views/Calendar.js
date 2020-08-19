import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../component/Header";

import classNames from "classnames/bind";
import base from "../../scss/base.scss";
const baseStyle = classNames.bind(base);

import calendar from "../../scss/calendar.scss";
const calStyle = classNames.bind(calendar);


let temp = new String();

// 윤년
let leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 윤년x
let nonleap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 요일
let day = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

// 월
let month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];



// calendar 선택
let csyr = null;
let csmt = null;
let csdt = null;
let cshr = null;
let csmn = null;



let cToday = new Date();
let cFirst = new Date(cToday.getFullYear(), cToday.getMonth(), 1);
let cStart = cFirst;

let cPageYear;
if(cFirst.getFullYear() % 4 === 0) {
	cPageYear = leap;
} else {
	cPageYear = nonleap;
}



let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);
let start = first;

let pageYear;
if(first.getFullYear() % 4 === 0) {
	pageYear = leap;
} else {
	pageYear = nonleap;
}

class Calendar extends Component {
	
	constructor(props){
		
		super(props)
		this.state = {
			
		}
		
	}

	componentDidMount() {
		//If the width and height of signage in the group are different, problems can occur.
		const hea = document.getElementsByClassName("header_each");
		for(let hl=0; hl<hea.length; hl++){
			hea[hl].getAttribute("loc-link") == "schedule" ? hea[hl].classList.add("active") : null;
		}

		this.showMain();
		this.showMainCalendar();

		const calendarPrev = document.getElementById("calendarPrev");
		calendarPrev.addEventListener("click", (e) => {
			
			if(start.getMonth() === 1) {

				start = new Date(first.getFullYear() - 1, 12, 1);
				first = start;

				if(first.getFullYear % 4 === 0) {
					pageYear = leap;
				} else {
					pageYear = nonleap;
				}

			} else {

				start = new Date(first.getFullYear(), first.getMonth() - 1, 1);
				first = start;

			}

			today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

			this.removeMainCalendar();
			this.showMain();
			this.showMainCalendar();

		});

		const calendarNext = document.getElementById("calendarNext");
		calendarNext.addEventListener("click", (e) => {
			
			if(start.getMonth() === 12) {

				start = new Date(first.getFullYear() + 1, 1, 1);
				first = start;

				if(first.getFullYear % 4 === 0) {
					pageYear = leap;
				} else {
					pageYear = nonleap;
				}

			} else {

				start = new Date(first.getFullYear(), first.getMonth() + 1, 1);
				first = start;

			}

			today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

			this.removeMainCalendar();
			this.showMain();
			this.showMainCalendar();

		});

	}

	showMain = (e) => {
		
		let todayMonth = today.getMonth() + 1;
		let todayDate = today.getDate();

		let schDay = document.getElementById("schDay");
		let schDate = document.getElementById("schDate");
		let schTitle = document.getElementById("schTitle");

		todayMonth < 10 ? todayMonth = "0" + todayMonth : null;
		todayDate < 10 ? todayDate = "0" + todayDate : null;

		// 초기화
		schDay.textContent = "";
		schDate.textContent = "";
		schTitle.textContent = "";

		// 값 다시 입력
		schDay.textContent = day[today.getDay()];
		schDate.textContent = today.getDate();
		schTitle.textContent = today.getFullYear() + ". " + todayMonth + ". " + todayDate + ". SCHEDULE";

	}

	showMainCalendar = (e) => {

		let monthCnt = 100;
		let cnt = 1;

		let cCurrent = document.getElementById("calendarCurrent");
		let cBody = document.getElementById("calendarBody");

		//this.removeMainCalendar();

		// week ( 최대 6주 )
		for(let i=0; i<6; i++) {

			let $tr = document.createElement("tr");
			$tr.setAttribute("id", monthCnt);

			// day ( 7일 )
			for(let j=0; j<7; j++) {

				if((i === 0 && j<first.getDay()) || cnt > pageYear[first.getMonth()]) {

					let $td = document.createElement("td");
					$tr.appendChild($td);

				} else {
					
					let $td = document.createElement("td");
					$td.textContent = cnt;
					$td.setAttribute("id", cnt);
					
					j == 0 ? $td.classList.add("sun") : null;
					j == 6 ? $td.classList.add("sat") : null;

					$tr.appendChild($td);
					cnt++;

				}

			}

			monthCnt++;
			cBody.appendChild($tr);

		}

		cCurrent.innerHTML = month[first.getMonth()] + "&nbsp;&nbsp;&nbsp;" + first.getFullYear();
		
		// 선택일
		let clicked = document.getElementById(today.getDate());
		clicked.classList.add("active");

		// 모든 일에(date) click 이벤트 추가
		let tdGroup = [];
		for(let i=1; i<=pageYear[first.getMonth()]; i++) {
			
			tdGroup[i] = document.getElementById(i);
			tdGroup[i].addEventListener("click", (e) => {

				for(let i=1; i<=pageYear[first.getMonth()]; i++){
					if(tdGroup[i].classList.contains("active")) {
						tdGroup[i].classList.remove("active");
					}
				}

				clicked = e.currentTarget;
				clicked.classList.add("active");

				today = new Date(today.getFullYear(), today.getMonth(), clicked.id);
				this.showMain();

				// 스케줄 가져오기
				//this.props.getSchedule();

			});

		}

	}

	removeMainCalendar = (e) => {
		let trCnt = 100;
		for(let i=0; i<6; i++) {
			let $tr = document.getElementById(trCnt);
			$tr.remove();
			trCnt++;
		}
	}

	chkEa = (e) => {

		let pr = e.currentTarget.parentNode;
		pr.classList.contains("checked") ? pr.classList.remove("checked") : pr.classList.add("checked");

	}

	schAddForm = (e) => {

		let repeatActive = document.getElementsByClassName("repeatActive")[0];
		repeatActive.classList.remove("active");

		let repeatType = document.getElementsByClassName("repeatType")[0];
		repeatType.classList.remove("dropdown");

		let calendarWrap = document.getElementsByClassName("calendarWrap");
		for(let i=0; i<calendarWrap.length; i++) {
			
			calendarWrap[i].innerHTML = "";
			let pn = calendarWrap[i].parentNode;
			pn.classList.remove("dropdown");

		}

		let schRegForm = document.getElementById("schRegForm");
		if(schRegForm.classList.contains("active")) {
			
			schRegForm.classList.remove("active");

		} else {
			
			schRegForm.classList.add("active");
			let now = new Date();
			
			let nyr = now.getFullYear();
			let nmt = now.getMonth() + 1;
			nmt = this.zerofill(nmt);

			let ndt = now.getDate();
			ndt = this.zerofill(ndt);

			let nhr = now.getHours();
			nhr = this.zerofill(nhr);

			let nmn = now.getMinutes();
			nmn = this.zerofill(nmn);

			let defaultDate = nyr + "-" + nmt + "-" + ndt + " " + nhr + ":" + nmn;

			let startTime = document.getElementById("startTime");
			let endTime = document.getElementById("endTime");
			let repeatTime = document.getElementById("repeatTime");

			startTime.value = defaultDate;
			endTime.value = defaultDate;
			repeatTime.value = defaultDate;

		}

	}

	zerofill = (dt) => {
		
		let tmp = dt;
		if(tmp < 10) {
			tmp = "0" + tmp;
		}

		return tmp;

	}

	repeat = (e) => {
		
		let target = e.currentTarget.parentNode;
		target.classList.contains("active") ? target.classList.remove("active") : target.classList.add("active");
		
		let calendarWrap = document.getElementsByClassName("calendarWrap");
		for(let i=0; i<calendarWrap.length; i++) {
			
			calendarWrap[i].innerHTML = "";
			let pn = calendarWrap[i].parentNode;
			pn.classList.remove("dropdown");

		}

	}

	repeatDrop = (e) => {
		
		let target = e.currentTarget.parentNode;
		target.classList.contains("dropdown") ? target.classList.remove("dropdown") : target.classList.add("dropdown");

	}

	selectCalendar = (e) => {

		let attr = e.currentTarget.getAttribute("id");
		let pn = e.currentTarget.parentNode;
		let childWrap = pn.childNodes[1];

		let calendarWrap = document.getElementsByClassName("calendarWrap");
		for(let i=0; i<calendarWrap.length; i++) {
			calendarWrap[i].parentNode.classList.remove("dropdown");
			this.deleteCalendar(calendarWrap[i]);
		}

		if(attr == temp) {
			temp = new String();
			pn.classList.remove("dropdown");
		} else {
			temp = attr;
			pn.classList.add("dropdown");
			this.createCalendar(childWrap, "cr");
		}

	}

	createCalendar = (element, tp) => {
		
		// 선택 값 초기화
		csyr = null;
		csmt = null;
		csdt = null;
		cshr = null;
		csmn = null;

		let monthCnt = 100;
		let cnt = 1;

		cToday = new Date();
		cFirst = new Date(cToday.getFullYear(), cToday.getMonth(), 1);
		cStart = cFirst;

		let $table = document.createElement("table");
		let $thead = document.createElement("thead");
		let $tbody = document.createElement("tbody");

		csyr = cFirst.getFullYear();
		csmt = cFirst.getMonth();

		// thead
		for(let i=0; i<2; i++){

			let $tr = document.createElement("tr");
			if(i==0) {
				for(let j=0; j<3; j++) {

					let $td = document.createElement("td");
					let $label = document.createElement("label");

					switch(j){
						case 0:
							$label.innerHTML = "<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='angle-left' class='svg-inline--fa fa-angle-left fa-w-8' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'><path fill='currentColor' d='M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z'></path></svg>";
							$td.setAttribute("id", "cPrev");
							$td.appendChild($label);
							break;
						case 1:
							$td.innerHTML = month[cFirst.getMonth()] + " " + cFirst.getFullYear();
							$td.setAttribute("id", "cCurrent");
							$td.setAttribute("class", "dt");
							$td.setAttribute("colspan", 5);
							$td.appendChild($label);
							break;
						case 2:
							$label.innerHTML = "<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='angle-right' class='svg-inline--fa fa-angle-right fa-w-8' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'><path fill='currentColor' d='M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z'></path></svg>";
							$td.setAttribute("id", "cNext");
							$td.appendChild($label);
							break;
					}

					$tr.appendChild($td);
				}

			} else {
				for(let j=0; j<7; j++) {
					
					let $td = document.createElement("td");
					switch(j) {

						case 0:
							$td.innerHTML = "SUN";
							$td.setAttribute("class", "sun");
							break;
							
						case 1:
							$td.innerHTML = "MON";
							break;
							
						case 2:
							$td.innerHTML = "TUE";
							break;
							
						case 3:
							$td.innerHTML = "WED";
							break;
							
						case 4:
							$td.innerHTML = "THU";
							break;
							
						case 5:
							$td.innerHTML = "FRI";
							break;
							
						case 6:
							$td.innerHTML = "SAT";
							$td.setAttribute("class", "sat");
							break;

					}
					
					$tr.setAttribute("id", "dayOfTheWeek");
					$tr.appendChild($td);

				}
			}

			$thead.appendChild($tr);

		}

		// tbody
		for(let i=0; i<6; i++) {

			let $tr = document.createElement("tr");
			$tr.setAttribute("id", tp + "_" + monthCnt);

			// days
			for(let j=0; j<7; j++) {
				
				csmt = first.getMonth();
				if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
					let $td = document.createElement("td");
					$tr.appendChild($td);
				} else {
					let $td = document.createElement("td");
					$td.textContent = cnt;
					$td.setAttribute("id", tp + "_" + cnt); // cr_1, cr_2, ...
					
					j == 0 ? $td.classList.add("sun") : null;
					j == 6 ? $td.classList.add("sat") : null;

					$tr.appendChild($td);
					cnt++;
				}

			}

			monthCnt++;
			$tbody.appendChild($tr);

		}

		$tbody.setAttribute("id", "cTbody");

		$table.appendChild($thead);
		$table.appendChild($tbody);

		element.appendChild($table);

		let cCurrent = document.getElementById("cCurrent");
		let cDotw = document.getElementById("dayOfTheWeek");
		let cPrev = document.getElementById("cPrev");
		let cNext = document.getElementById("cNext");
		let cBody = document.getElementById("cTbody");

		cCurrent.addEventListener("click", (e) => {

			let cn = document.getElementById("cCurrent").className;
			switch(cn) {

				// 시간 Form
				case "mn":
					this.selectHrForm(cDotw, cBody, cCurrent);
					break;

				// 일자 Form
				case "hr":
					this.selectDtForm(cDotw, cBody, cCurrent);
					break;

				// 월 Form
				case "dt":
					this.selectMtForm(cDotw, cBody, cCurrent);
					break;

				// 년도 Form
				case "mt":
					this.selectYrForm(cDotw, cBody, cCurrent);
					break;

			}

		});

		cPrev.addEventListener("click", (e) => {
			
			let cn = document.getElementById("cCurrent").className;
			switch(cn) {

				// 분 선택 prev + next
				case "mn":
					this.selectMnPnForm(cDotw, cBody, cCurrent, "prev");
					break;

				// 시간 선택 prev + next
				case "hr":
					this.selectHrPnForm(cDotw, cBody, cCurrent, "prev");
					break;

				// 일자 선택 prev + next
				case "dt":
					this.selectDtPnForm(cDotw, cBody, cCurrent, "prev");
					break;

				// 월 선택 prev + next
				case "mt":
					this.selectMtPnForm(cDotw, cBody, cCurrent, "prev");
					break;
					
				// 년도 선택 prev + next
				case "yr":
					this.selectYrPnForm(cDotw, cBody, cCurrent, "prev");
					break;

			}

		});

		cNext.addEventListener("click", (e) => {

			let cn = document.getElementById("cCurrent").className;
			switch(cn) {

				// 분 선택 prev + next
				case "mn":
					this.selectMnPnForm(cDotw, cBody, cCurrent, "next");
					break;

				// 시간 선택 prev + next
				case "hr":
					this.selectHrPnForm(cDotw, cBody, cCurrent, "next");
					break;

				// 일자 선택 prev + next
				case "dt":
					this.selectDtPnForm(cDotw, cBody, cCurrent, "next");
					break;

				// 월 선택 prev + next
				case "mt":
					this.selectMtPnForm(cDotw, cBody, cCurrent, "next");;
					break;
					
				// 년도 선택 prev + next
				case "yr":
					this.selectYrPnForm(cDotw, cBody, cCurrent, "next");
					break;
				
			}

		});

		for(let m=1; m<=cPageYear[cFirst.getMonth()]; m++) {

			let crv = document.getElementById("cr_" + m);
			crv.addEventListener("click", (e) => {

				csdt = m;
				this.selectHrForm(cDotw, cBody, cCurrent);

			});

		}


	}

	deleteCalendar = (element) => {
		element.innerHTML = "";
	}



	selectYrForm = (cDotw, cBody, cCurrent) => {

		cBody.innerHTML = "";
		
		let value = cCurrent.innerHTML;
		value = value.substring(0, value.length - 1); // 202020 >> 20202x

		for(let i=0; i<3; i++) {
			
			let $dttr = document.createElement("tr");
			switch(i) {
				case i:
					this.createYr($dttr, i, value);
					break;
			}

			cBody.appendChild($dttr);

		}
		
		let yrea = document.getElementsByClassName("yrEa");
		for(let ea=0; ea<yrea.length; ea++) {
			yrea[ea].addEventListener("click", (e) => {
				
				let value = e.currentTarget.innerHTML;

				csyr = value;
				cCurrent.classList.remove("yr");
				cCurrent.classList.add("mt");

				this.selectMtForm(cDotw, cBody, cCurrent);

			});
		}

		cCurrent.innerHTML = value + "0 ~ " + value + "9";
		cCurrent.classList.remove("mt");
		cCurrent.classList.add("yr");

	}

	createYr = (element, i, value) => {

		let ve = 4 * ( i + 1 );
		let vs = ve - 4;

		for(let j=vs; j<ve; j++) {
			
			let $dttd = document.createElement("td");
			switch(j) {

				case j:
					if(j < 10) {
						$dttd.innerHTML = value + j.toString();
						$dttd.setAttribute("class", "yrEa");
						element.appendChild($dttd);
					}
					break;

			}

		}

	}

	selectYrPnForm = (cDotw, cBody, cCurrent, pn) => {

		let value = cBody.firstChild.firstChild.innerHTML;
		value = value.substring(0, value.length - 1);

		pn == "prev" ? value-- : value++;
		cCurrent.innerHTML = value + "0 ~ " + value + "9";
		
		cBody.innerHTML = "";
		
		for(let i=0; i<3; i++) {
			
			let $dttr = document.createElement("tr");
			switch(i) {
				case i:
					this.createYr($dttr, i, value);
					break;
			}

			cBody.appendChild($dttr);

		}
		
		let yrea = document.getElementsByClassName("yrEa");
		for(let ea=0; ea<yrea.length; ea++) {
			yrea[ea].addEventListener("click", (e) => {
				
				let value = e.currentTarget.innerHTML;

				csyr = value;
				cCurrent.classList.remove("yr");
				cCurrent.classList.add("mt");

				this.selectMtForm(cDotw, cBody, cCurrent);

			});
		}

	}



	selectMtForm = (cDotw, cBody, cCurrent) => {

		cDotw.innerHTML = "";
		cBody.innerHTML = "";
		csyr == null ? csyr = cToday.getFullYear() : null;

		for(let i=0; i<3; i++) {
			
			let $dttr = document.createElement("tr");
			switch(i) {
				case i:
					this.createMt($dttr, i);
					break;
			}

			cBody.appendChild($dttr);

		};

		cCurrent.innerHTML = csyr;
		cCurrent.setAttribute("colspan", 2);
		cCurrent.classList.remove("dt");
		cCurrent.classList.add("mt");

		let mtea = document.getElementsByClassName("mtEa");
		for(let ea=0; ea<mtea.length; ea++) {
			mtea[ea].addEventListener("click", (e) => {
				
				cCurrent.innerHTML = month[ea] + " " + csyr;
				cCurrent.classList.remove("mt");
				cCurrent.classList.add("dt");
				cBody.innerHTML = "";

				csmt = ea;
				this.selectDtForm(cDotw, cBody, cCurrent);

			});
		}

	}

	createMt = (element, i) => {

		let ve = 4 * (i + 1);
		let vs = ve - 4;

		for(let j=vs; j<ve; j++) {
			
			let $dttd = document.createElement("td");
			switch(j) {
				case 0:
					$dttd.innerHTML = "JAN";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 1:
					$dttd.innerHTML = "FEB";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 2:
					$dttd.innerHTML = "MAR";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 3:
					$dttd.innerHTML = "APR";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 4:
					$dttd.innerHTML = "MAY";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 5:
					$dttd.innerHTML = "JUN";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 6:
					$dttd.innerHTML = "JUL";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 7:
					$dttd.innerHTML = "AUG";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 8:
					$dttd.innerHTML = "SEP";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 9:
					$dttd.innerHTML = "OCT";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 10:
					$dttd.innerHTML = "NOV";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
					
				case 11:
					$dttd.innerHTML = "DEC";
					$dttd.setAttribute("class", "mtEa");
					element.appendChild($dttd);
					break;
			}

		}

	}

	selectMtPnForm = (cDotw, cBody, cCurrent, pn) => {

		pn == "prev" ? csyr-- : csyr++;
		cCurrent.innerHTML = csyr;

	}



	selectDtForm = (cDotw, cBody, cCurrent) => {
		
		cDotw.innerHTML = "";
		cBody.innerHTML = "";

		cCurrent.classList.remove("hr");
		cCurrent.classList.add("dt");
		cCurrent.setAttribute("colspan", 5);

		let cur = cCurrent.textContent;
		let dot = cur.indexOf(",");
		if(dot != -1) {
			cCurrent.textContent = cur.substring(dot + 2, cur.length);
		}

		if(cStart.getMonth() === 12) {
			
			cStart = new Date(csyr, 1, 1);
			cFirst = cStart;

		} else {

			cStart = new Date(csyr, csmt, 1);
			cFirst = cStart;

		}

		if(cFirst.getFullYear() % 4 === 0) {
			cPageYear = leap;
		} else {
			cPageYear = nonleap;
		}

		this.createDt(cDotw, cBody, cCurrent);

	}

	createDt = (cDotw, cBody, cCurrent) => {
		
		let monthCnt = 100;
		let cnt = 1;

		for(let i=0; i<7; i++){

			let $dotwTd = document.createElement("td");
			switch(i){
				case 0:
					$dotwTd.innerHTML = "Sun";
					$dotwTd.setAttribute("class", "sun");
					break;
				case 1:
					$dotwTd.innerHTML = "Mon";
					break;
				case 2:
					$dotwTd.innerHTML = "Tue";
					break;
				case 3:
					$dotwTd.innerHTML = "Wed";
					break;
				case 4:
					$dotwTd.innerHTML = "Thu";
					break;
				case 5:
					$dotwTd.innerHTML = "Fri";
					break;
				case 6:
					$dotwTd.innerHTML = "Sat";
					$dotwTd.setAttribute("class", "sat");
					break;
			}

			cDotw.appendChild($dotwTd);

		}

		// 달력 form ( tbody )
		for(let j=0; j<6; j++) {
			
			let $tr = document.createElement("tr");
			$tr.setAttribute("id", "ctr_" + monthCnt);

			for(let k=0; k<7; k++) {

				if((j === 0 && k < cFirst.getDay()) || cnt > cPageYear[cFirst.getMonth()]) {
					
					let $td = document.createElement("td");
					$tr.appendChild($td);

				} else {

					let $td = document.createElement("td");
					$td.textContent = cnt;
					$td.setAttribute("id", "ctd_" + cnt);

					k == 0 ? $td.classList.add("sun") : null;
					k == 6 ? $td.classList.add("sat") : null;

					$tr.appendChild($td);

					cnt++;

				}

			}

			cBody.appendChild($tr);

		}

		for(let m=1; m<=cPageYear[cFirst.getMonth()]; m++) {

			let crv = document.getElementById("ctd_" + m);
			crv.addEventListener("click", (e) => {
				
				csdt = m;
				this.selectHrForm(cDotw, cBody, cCurrent);

			});

		}

	}

	selectDtPnForm = (cDotw, cBody, cCurrent, pn) => {

		if(pn == "prev") {
			
			if(csmt === 0) {
				
				csmt = 11;
				csyr--;

				cStart = new Date(csyr, 12, 1);
				cFirst = cStart;

			} else {
				
				csmt--;
				cStart = new Date(csyr, csmt, 1);
				cFirst = cStart;

			}

		} else {

			if(csmt === 11) {
				
				csmt = 0;
				csyr++;

				cStart = new Date(csyr, 1, 1);
				cFirst = cStart;

			} else {
				
				csmt++;
				cStart = new Date(csyr, csmt, 1);
				cFirst = cStart;

			}

		}

		if(cFirst.getFullYear() % 4 === 0) {
			cPageYear = leap;
		} else {
			cPageYear = nonleap;
		}

		switch(csmt) {
			case csmt:
				cCurrent.innerHTML = month[csmt] + " " + csyr;
				break;
		}

		cDotw.innerHTML = "";
		cBody.innerHTML = "";
		this.createDt(cDotw, cBody, cCurrent);

	}



	selectHrForm = (cDotw, cBody, cCurrent) => {
	
		cDotw.innerHTML = "";
		cBody.innerHTML = "";

		if(cCurrent.className != "mn")
			csdt < 10 ? cCurrent.innerHTML = "0" + csdt + ", " + cCurrent.innerHTML : cCurrent.innerHTML = csdt + ", " + cCurrent.innerHTML;

		cCurrent.classList.remove("dt");
		cCurrent.classList.remove("mn");
		cCurrent.classList.add("hr");
		cCurrent.setAttribute("colspan", 2);

		for(let i=0; i<6; i++) {
			
			let $dttr = document.createElement("tr");
			switch(i) {
				case i:
					this.createHr($dttr, i);
					break;
			}

			cBody.appendChild($dttr);

		}

		let hrea = document.getElementsByClassName("hrEa");
		for(let ea=0; ea<hrea.length; ea++) {
			hrea[ea].addEventListener("click", (e) => {
				
				let value = e.currentTarget.innerHTML;
				let dot = value.indexOf(":");
				value = value.substring(0, dot);

				if(value.substring(0, dot) < 10) {
					if(value === "00") {
						cshr = 0;
					} else {
						cshr = value.replace(0, "")
					}
				} else {
					cshr = value;
				}

				this.selectMnForm(cDotw, cBody, cCurrent);

			});
		}

	}

	createHr = (element, i) => {

		let ve = 4 * (i + 1);
		let vs = ve - 4;

		for(let j=vs; j<ve; j++) {

			let $dttd = document.createElement("td");
			switch(j){
				case j:
					j < 10 ? $dttd.innerHTML = "0" + j + ":00" : $dttd.innerHTML = j + ":00";
					$dttd.setAttribute("class", "hrEa");
					element.appendChild($dttd);
					break;
			}
		}

	}

	selectHrPnForm = (cDotw, cBody, cCurrent, pn) => {

		//let cur = cCurrent.innerHTML;
		//let dot = cur.indexOf(",");
		
		pn == "prev" ? csdt-- : csdt++;

		// date가 넘어갈 경우
		if(csdt > cPageYear[cFirst.getMonth()]) {

			csmt++;
			// month가 넘어갈 경우
			if(csmt > 11) {
				csdt = 1;
				csmt = 0;
				csyr++;
			}

			cFirst = new Date(csyr, csmt, 1);
			csdt = 1;

		}

		// date가 최소일 경우
		if(csdt < 1) {
			
			csmt--;
			// month가 최소일 경우
			if(csmt < 0){
				csdt = 1;
				csmt = 11;
				csyr--;
			}

			cFirst = new Date(csyr, csmt, 1);
			csdt = cPageYear[cFirst.getMonth()];

		}

		csyr = cFirst.getFullYear();
		csmt = cFirst.getMonth();

		if(cFirst.getFullYear() % 4 === 0){
			cPageYear = leap;
		} else {
			cPageYear = nonleap;
		}

		csdt < 10 ? cCurrent.innerHTML = "0" + csdt + ", " + month[csmt] + " " + csyr : cCurrent.innerHTML = csdt + ", " + month[csmt] + " " + csyr;

		// dot != -1 ? sc.innerHTML = csdt + ", " + month[csmt] + " " + csyr : null;
		
	}

	

	selectMnForm = (cDotw, cBody, cCurrent) => {

		cBody.innerHTML = "";

		cCurrent.classList.remove("hr");
		cCurrent.classList.add("mn");
		cCurrent.setAttribute("colspan", 2);

		for(let i=0; i<3; i++) {
			
			let $dttr = document.createElement("tr");
			switch(i) {
				case i:
					this.createMn($dttr, i);
					break;
			}

			cBody.appendChild($dttr);

		}

		let mnea = document.getElementsByClassName("mnEa");
		for(let ea=0; ea<mnea.length; ea++) {
			mnea[ea].addEventListener("click", (e) => {
				
				let value = e.currentTarget.innerHTML;
				let dot = value.indexOf(":");
				csmn = value.substring(dot+1, value.length);

				csmt = this.zerofill(csmt + 1);
				csdt = this.zerofill(csdt);
				cshr = this.zerofill(cshr);
				//csmn = this.zerofill(csmn);

				let cur = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
				cur.innerHTML = "";
				cur.parentNode.firstChild.value = csyr + "-" + csmt + "-" + csdt + " " + cshr + ":" + csmn;
				cur.parentNode.classList.remove("dropdown");

			});
		}

	}

	createMn = (element, i) => {

		let ve = 4 * ( i + 1 );
		let vs = ve - 4;

		for(let j=vs; j<ve; j++) {

			let $dttd = document.createElement("td");
			switch(j){
				case j:

					let jv = j * 5;
					if(jv < 10)
						jv = "0" + jv;

					cshr < 10 ? $dttd.innerHTML = "0" + cshr + ":" + jv : $dttd.innerHTML =  cshr + ":" + jv;
					$dttd.setAttribute("class", "mnEa");
					element.appendChild($dttd);
					break;
			}

		}

	}

	selectMnPnForm = (cDotw, cBody, cCurrent, pn) => {

		pn == "prev" ? cshr-- : cshr++;

		if(cshr < 0) {

			cshr = 23;
			csdt--;
			if(csdt > cPageYear[cFirst.getMonth()]) {

				csmt++;
				// month가 넘어갈 경우
				if(csmt > 11) {
					csdt = 1;
					csmt = 0;
					csyr++;
				}
	
				cFirst = new Date(csyr, csmt, 1);
				csdt = 1;
	
			}
	
			// date가 최소일 경우
			if(csdt < 1) {
				
				csmt--;
				// month가 최소일 경우
				if(csmt < 0){
					csdt = 1;
					csmt = 11;
					csyr--;
				}
	
				cFirst = new Date(csyr, csmt, 1);
				csdt = cPageYear[cFirst.getMonth()];
	
			}
	
			csyr = cFirst.getFullYear();
			csmt = cFirst.getMonth();
	
			if(cFirst.getFullYear() % 4 === 0){
				cPageYear = leap;
			} else {
				cPageYear = nonleap;
			}
	
			csdt < 10 ? cCurrent.innerHTML = "0" + csdt + ", " + month[csmt] + " " + csyr : cCurrent.innerHTML = csdt + ", " + month[csmt] + " " + csyr;

		}

		if(cshr > 23) {

			cshr = 0;
			csdt++;
			if(csdt > cPageYear[cFirst.getMonth()]) {

				csmt++;
				// month가 넘어갈 경우
				if(csmt > 11) {
					csdt = 1;
					csmt = 0;
					csyr++;
				}
	
				cFirst = new Date(csyr, csmt, 1);
				csdt = 1;
	
			}
	
			// date가 최소일 경우
			if(csdt < 1) {
				
				csmt--;
				// month가 최소일 경우
				if(csmt < 0){
					csdt = 1;
					csmt = 11;
					csyr--;
				}
	
				cFirst = new Date(csyr, csmt, 1);
				csdt = cPageYear[cFirst.getMonth()];
	
			}
	
			csyr = cFirst.getFullYear();
			csmt = cFirst.getMonth();
	
			if(cFirst.getFullYear() % 4 === 0){
				cPageYear = leap;
			} else {
				cPageYear = nonleap;
			}
	
			csdt < 10 ? cCurrent.innerHTML = "0" + csdt + ", " + month[csmt] + " " + csyr : cCurrent.innerHTML = csdt + ", " + month[csmt] + " " + csyr;

		}

		this.selectMnForm(cDotw, cBody, cCurrent);
		
	}



	getDisplay = (e) => {
		
		let display = document.getElementById("display");
		let playlist = document.getElementById("playlist");

		display.value = 123123;
		console.log("display 가져오는 창");
		playlist.disabled = false;

	}

	getPlaylist = (e) => {

		let display = document.getElementById("display");
		let playlist = document.getElementById("playlist");

		console.log("playlist.getAttribute( disabled ) ===> " + playlist.getAttribute("disabled"));
		playlist.disabled = true;
		console.log(" true playlist.getAttribute( disabled ) ===> " + playlist.getAttribute("disabled"));
		//playlist.setAttribute("disabled", "");
	}

	selectOpts = (e) => {

		let type = e.currentTarget.firstChild.getAttribute("dt");
		let value = e.currentTarget.firstChild.value;
		let typeTitle = document.getElementById("typeTitle");

		typeTitle.textContent = type;
		typeTitle.setAttribute("repeat", value);
		e.currentTarget.parentNode.parentNode.classList.remove("dropdown");

	}

	numeric = (e) => {

		e = e || window.event;
		let value = e.target.value.replace(/[^0-9]/g, "");

		if(value.length > 1) {
			value = value.replace(/(^0+)/, ""); // 앞자리 0 빼기
		}

		event.target.value = value;

	}

	render() {
		return (
			
			<div>

				<Header />
				<div className={baseStyle("baseWrap")}>

					<div className={calStyle("schWrap")}>

						<div className={calStyle("schLeft")}>

							<div id="calendarTable">
								<table id="calendar" align="center">
									<thead>
										<tr>
											<td id="calendarPrev">
												<label>
													<FontAwesomeIcon icon="angle-left" />
												</label>
											</td>
											<td id="calendarCurrent" colSpan="5"></td>
											<td id="calendarNext">
												<label>
													<FontAwesomeIcon icon="angle-right" />
												</label>
											</td>
										</tr>
										<tr>
											<td className={calStyle("sun")}>SUN</td>
											<td>MON</td>
											<td>TUE</td>
											<td>WED</td>
											<td>THU</td>
											<td>FRI</td>
											<td className={calStyle("sat")}>SAT</td>
										</tr>
									</thead>
									<tbody id="calendarBody"></tbody>

								</table>
							</div>
							<div className={calStyle("calendarReset")} id="calendarReset">
								<FontAwesomeIcon icon="redo" spin />
								<div>TODAY</div>
							</div>
							<div className={calStyle("calendarFilter")}>Filter</div>
							<div className={calStyle("calendarSchBtn")} onClick={this.schAddForm}>
								<button>ADD</button>
							</div>
							
						</div>
						<div className={calStyle("schRight")}>
							
							<div className={calStyle("schDateWrap")}>
								<div className={calStyle("schDay")} id="schDay"></div>
								<div className={calStyle("schDate")} id="schDate"></div>
							</div>
							<div className={calStyle("schListWrap")}>
								<div className={calStyle("schTitle")} id="schTitle"></div>
								<div className={calStyle("schList")}>
									<div className={calStyle("listInfo")} id="schList">

										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk1" onChange={this.chkEa} />
												<label htmlFor="schchk1"></label>
											</div>
											<div className={calStyle("schMiddle")} onClick={this.chkForm}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#1 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>

										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk2" onChange={this.chkEa} />
												<label htmlFor="schchk2"></label>
											</div>
											<div className={calStyle("schMiddle")}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#2 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>

										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk3" onChange={this.chkEa} />
												<label htmlFor="schchk3"></label>
											</div>
											<div className={calStyle("schMiddle")}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#3 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>
										
										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk4" onChange={this.chkEa} />
												<label htmlFor="schchk4"></label>
											</div>
											<div className={calStyle("schMiddle")}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#4 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>
										
										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk5" onChange={this.chkEa} />
												<label htmlFor="schchk5"></label>
											</div>

											<div className={calStyle("schMiddle")}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#5 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>
										
										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk6" onChange={this.chkEa} />
												<label htmlFor="schchk6"></label>
											</div>

											<div className={calStyle("schMiddle")}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#6 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>
										
										<div className={calStyle("schEa")}>

											<div className={calStyle("schCheckWrap")}>
												<input type="checkbox" id="schchk7" onChange={this.chkEa} />
												<label htmlFor="schchk7"></label>
											</div>

											<div className={calStyle("schMiddle")}>
												<div className={calStyle("schDateTf")}>
													2020. 07. 22 19:30:00 ~ 2020. 07. 22 23:59:59
												</div>
												<div className={calStyle("schName")}>
													#7 TEST SCHEDULE NAME
												</div>
												<div className={calStyle("schDisplay")}>
													[ 63 ] _ COEX
												</div>
												<div className={calStyle("schPlaylist")}>
													[ 290 ] _ START PLAYLIST
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>

						</div>
						

						<div className={calStyle("schRegWrap")} id="schRegForm">

							<div className={calStyle("schRegClose")} onClick={this.schAddForm}>
								<i></i>
								<i></i>
							</div>
							<div className={calStyle("schForm")}>

								<div className={calStyle("formTitle")}>
									<p>SCHEDULE</p>
								</div>
								<div className={calStyle("formActive")}>

									<div className={calStyle("formEa")}>
										<div className={calStyle("formName")}>
											<p>TITLE</p>
										</div>
										<div className={calStyle("formInput")}>
											<input type="text" id="title" style={{"cursor": "text"}} />
										</div>
									</div>
									<div className={calStyle("formEa")}>
										<div className={calStyle("formName")}>
											<p>DISPLAY</p>
										</div>
										<div className={calStyle("formInput")} onClick={this.getDisplay}>
											<input type="text" id="display" readOnly />
										</div>
									</div>
									<div className={calStyle("formEa")}>
										<div className={calStyle("formName")}>
											<p>PLAYLIST</p>
										</div>
										<div className={calStyle("formInput")} onClick={this.getPlaylist}>
											<input type="text" id="playlist" readOnly disabled />
										</div>
									</div>
									<div className={calStyle("formEa")}>
										<div className={calStyle("formName")}>
											<p>START</p>
										</div>
										<div className={calStyle("formInput")}>
											<input type="text" id="startTime" readOnly onClick={this.selectCalendar} />
											<div className={calStyle("calendarWrap")}></div>
										</div>
									</div>
									<div className={calStyle("formEa")}>
										<div className={calStyle("formName")}>
											<p>END</p>
										</div>
										<div className={calStyle("formInput")}>
											<input type="text" id="endTime" readOnly onClick={this.selectCalendar} />
											<div className={calStyle("calendarWrap")}></div>
										</div>
									</div>

								</div>
								<div className={calStyle("repeatActive")}>
									
									<div className={calStyle("repeatTitle")} onClick={this.repeat}>
										<p>REPEAT</p>
										<FontAwesomeIcon icon="angle-down" />
									</div>
									<div className={calStyle("repeatForm")}>

										<div className={calStyle("repeatEa")}>
											<p className={calStyle("repeatName")}>TYPE</p>
											<div className={calStyle("repeatType")}>
												<div className={calStyle("typeTitle")} id="typeTitle" repeat="none" onClick={this.repeatDrop}>
													SELECT
												</div>
												<div className={calStyle("typeOption")}>
													<label className={calStyle("opts")} onClick={this.selectOpts}>
														<input type="radio" dt="SELECT" value="none"></input>
														--------
													</label>
													<label className={calStyle("opts")} onClick={this.selectOpts}>
														<input type="radio" dt="EVERY HOUR" value="hour"></input>
														EVERY HOUR
													</label>
													<label className={calStyle("opts")} onClick={this.selectOpts}>
														<input type="radio" dt="EVERY DAY" value="day"></input>
														EVERY DAY
													</label>
													<label className={calStyle("opts")} onClick={this.selectOpts}>
														<input type="radio" dt="EVERY WEEK" value="week"></input>
														EVERY WEEK
													</label>
													<label className={calStyle("opts")} onClick={this.selectOpts}>
														<input type="radio" dt="EVERY MONTH" value="month"></input>
														EVERY MONTH
													</label>
													<label className={calStyle("opts")} onClick={this.selectOpts}>
														<input type="radio" dt="EVERY YEAR" value="year"></input>
														EVERY YEAR
													</label>
												</div>
											</div>
										</div>
										<div className={calStyle("repeatEa")}>
											<p className={calStyle("repeatName")} style={{"textAlign": "center"}}>INTERVAL</p>
											<div className={calStyle("repeatInput")}>
												<input type="text" style={{"cursor": "text"}} id="interval" maxLength="2" onKeyUp={this.numeric} />
											</div>
										</div>
										<div className={calStyle("repeatEa")}>
											<p className={calStyle("repeatName")}>REPEAT END</p>
											<div className={calStyle("repeatInput")}>
												<input type="text" id="repeatTime" readOnly onClick={this.selectCalendar} />
												<div className={calStyle("calendarWrap")}></div>
											</div>
										</div>

									</div>

								</div>

							</div>

							<div className={calStyle("regFormBtn")}>
								<button>ADD</button>
								<button onClick={this.schAddForm}>CANCEL</button>
							</div>
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
	
	};
}

export default withCookies(connect(
	
	mapStateToProps,
	mapDispatchToProps
	
)(Calendar));