console.log(`NoUI v1.2
©2024 - 2025 NoSoft.All Rights Reserved.|版权归属于NoSoft。

Ｎ　　　Ｎ　　　　　　　　　Ｕ　　　Ｕ　　ＩＩＩＩＩ
ＮＮ　　Ｎ　　　　　　　　　Ｕ　　　Ｕ　　　　Ｉ
ＮＮ　　Ｎ　　　ｏｏｏ　　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　Ｎ　Ｎ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　Ｎ　Ｎ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　ＮＮ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　ＮＮ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　　Ｎ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　　Ｎ　　　ｏｏｏ　　　　ＵＵＵ　　　ＩＩＩＩＩ`);
function NoUIMenu() {
	const contextMenu = document.getElementById('noui-menu');

	document.addEventListener('contextmenu', (e) => {
		e.preventDefault(); // 防止默认右键菜单弹出

		// 获取窗口的宽度和高度
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// 获取菜单的宽度和高度
		const menuWidth = contextMenu.offsetWidth;
		const menuHeight = contextMenu.offsetHeight;

		// 计算菜单的左上角位置
		let posX = e.pageX;
		let posY = e.pageY;

		// 检查右边界
		if (posX + menuWidth > windowWidth) {
			posX = windowWidth - menuWidth - 2; // 调整为靠右
		}

		// 检查下边界
		if (posY + menuHeight > windowHeight) {
			posY = windowHeight - menuHeight - 2; // 调整为靠下
		}

		// 设置菜单的位置
		contextMenu.style.visibility = 'visible';
		contextMenu.style.left = `${posX}px`;
		contextMenu.style.top = `${posY}px`;
	});

	document.addEventListener('click', () => {
		contextMenu.style.visibility = 'hidden'; // 点击任意位置隐藏菜单
	});
}
document.addEventListener('DOMContentLoaded', () => {
    const radius = document.body.getAttribute('data-radius') || '0';
    document.documentElement.style.setProperty('--radius', `${radius}px`);
	
});
