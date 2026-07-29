// ==UserScript==
// @license      GNU General Public License v3.0
// @name         哔哩哔哩提醒
// @namespace    http://tampermonkey.net/
// @version      2026-07-29
// @description  通过对哔哩哔哩进行篡改，使用户沉迷哔哩哔哩的状态减轻。
// @author       yukigamau
// @match        www.bilibili.com
// @match        www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

var curSite = "";

(function () {
	'use strict';

	if (!timeAlarm() && !changeSite())
		setClock();
})();

// 在熬夜时警告
function timeAlarm() {
	const now = new Date();
	const hours = now.getHours();
	if (hours < 6) {
		createAlarm();
		return true;
	}
	else
		return false;
}

function createAlarm() {
	const overlay = createOverlay();
	const text = '早睡早起身体好';
	const targetText = createTargetText(text);

	overlay.appendChild(targetText);
	document.body.appendChild(overlay);
}

// 更换网站，不接受首页推广
function changeSite() {
	var site = window.location.href;
	const needChange = [
		'https://www.bilibili.com/',
		'https://www.bilibili.com/?spm_id_from=333.337.0.0',
	]

	for (const each of needChange) {
		if (site == each) {
			window.location.href = 'https://search.bilibili.com/all';
			return true;
		}
	}

	return false;
}

function setClock() {
	setTimeout(() => {
		addLayer();
	}, 1000 * 60);
}

function addLayer() {
	const TARGET_TEXT = "凡学之不勤，必其志之尚未笃也";

	// 生成各个组件
	const overlay = createOverlay();
	const targetText = createTargetText(TARGET_TEXT);
	const input = createInput();
	const submitBtn = createSubmitBtn();

	overlay.appendChild(targetText);
	overlay.appendChild(input);
	overlay.appendChild(submitBtn);
	document.body.appendChild(overlay);

	// 聚焦输入框
	input.focus();

	submitBtn.addEventListener('click', () => {
		const sInput = input.value.trim();

		if (sInput == TARGET_TEXT) {
			overlay.remove();
		}
		else {
			alert('输入有误诶～');
			input.style.borderColor = '#ff3333';
			input.value = '';
			input.focus();
		}
	})
}

function createOverlay() {
	const overlay = document.createElement('div');

	// 设置样式
	Object.assign(overlay.style, {
		position: 'fixed',	// 固定位置，不随滚动滚动
		top: '0',
		left: '0',
		width: '100vw',
		height: '100vh',		// 铺满
		backgroundColor: 'rgba(0,0,0,0.85)',
		zIndex: '9999',		// 确保层级足够高，可覆盖所有元素
		pointerEvents: 'auto',	// 拦截鼠标点击
		display: 'flex',		// 方便后续加东西在上面
		flexDirection: 'column',	// 垂直排布
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		fontFamily: 'serif',
		gap: '20px'
	});

	return overlay;
}

function createTargetText(text) {
	const targetText = document.createElement('div');
	targetText.innerText = text;
	Object.assign(targetText.style, {
		color: '#ffffff',
		fontSize: '28px',
		fontWeight: 'normal',
		letterSpacing: '2px',

		// 防复制
		userSelect: 'none',
		webkitUserSelect: 'none',
		mozUserSelect: 'none',
		msUserSelect: 'none'
	});

	// 禁用右键菜单
	targetText.addEventListener('contextmenu', e => e.preventDefault());

	return targetText;
}

function createInput() {
	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = '请在此输入上面的文字';
	Object.assign(input.style, {
		width: '450px',
		padding: '6px 6px',
		fontSize: '26px',
		borderRadius: '3px',
		border: '2px solid #ffffff',
		backgroundColor: '#222',
		color: '#fff',
		outline: 'none',
		textAlign: 'left'
	});

	// 聚焦与失焦特效
	input.addEventListener('focus', () => input.style.borderColor = '#66ccff');
	input.addEventListener('blur', () => input.style.borderColor = '#fff');

	// 禁用粘贴
	input.addEventListener('paste', (e) => {
		e.preventDefault();
		alert('请不要偷懒哦～');
	})

	return input;
}

function createSubmitBtn() {
	const submitBtn = document.createElement('button');
	submitBtn.innerText = '提交验证';
	Object.assign(submitBtn.style, {
		padding: '10px 30px',
		fontSize: '26px',
		fontWeight: 'bold',
		color: '#000',
		backgroundColor: '#00ff00',
		border: 'none',
		borderRadius: '6px',
		cursor: 'pointer',
		transition: 'background-color 0.2s, transform 0.1s'
	});

	// 鼠标反馈
	submitBtn.addEventListener('mouseover', () => submitBtn.style.backgroundColor = '#33ff33');
	submitBtn.addEventListener('mouseout', () => submitBtn.style.backgroundColor = '#00ff00');
	submitBtn.addEventListener('mousedown', () => submitBtn.style.transform = 'scale(0.95)');
	submitBtn.addEventListener('mouseup', () => submitBtn.style.transform = 'scale(1)');

	return submitBtn;
}