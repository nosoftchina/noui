console.log(`NoUI v1.3
©2024 - 2025 NoSoft.All Rights Reserved.|版权归属于NoSoft。
https://github.com/nosoftchina/noui

Ｎ　　　Ｎ　　　　　　　　　Ｕ　　　Ｕ　　ＩＩＩＩＩ
ＮＮ　　Ｎ　　　　　　　　　Ｕ　　　Ｕ　　　　Ｉ
ＮＮ　　Ｎ　　　ｏｏｏ　　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　Ｎ　Ｎ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　Ｎ　Ｎ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　ＮＮ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　ＮＮ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　　Ｎ　　ｏ　　　ｏ　　Ｕ　　　Ｕ　　　　Ｉ
Ｎ　　　Ｎ　　　ｏｏｏ　　　　ＵＵＵ　　　ＩＩＩＩＩ`);
function NoUIMenu(config) {
  // 移除已存在的菜单（防止重复创建）
  const existingMenu = document.getElementById('noui-menu');
  if (existingMenu) {
    document.body.removeChild(existingMenu);
  }

  // 创建菜单DOM结构
  const menu = document.createElement('div');
  menu.id = 'noui-menu';
  menu.style.display = 'none';
  
  const ul = document.createElement('ul');
  ul.style.overflow = 'hidden';
  
  // 添加菜单项
  config.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    
    li.addEventListener('click', () => {
      if (typeof item.action === 'function') {
        item.action();
      } else {
        console.log(`NoUI Menu:有菜单项 ${item.text} 被点击，但没有绑定任何操作。`);
      }
      hideMenu();
    });
    
    ul.appendChild(li);
  });
  
  menu.appendChild(ul);
  document.body.appendChild(menu);
  
  // 隐藏菜单函数
  function hideMenu() {
    menu.style.display = 'none';
  }
  
  // 显示菜单函数
  function showMenu(x, y) {
    // 防止溢出
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    
    const adjustedX = x + menuWidth > windowWidth ? windowWidth - menuWidth - 5 : x;
    const adjustedY = y + menuHeight > windowHeight ? windowHeight - menuHeight - 5 : y;
    
    menu.style.left = `${adjustedX}px`;
    menu.style.top = `${adjustedY}px`;
    menu.style.display = 'block';
  }
  
  // 全局点击隐藏菜单
  document.addEventListener('click', hideMenu);
  
  // 返回一个函数用于绑定到特定元素
  return function(element) {
    if (!element) element = document;
    
    element.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      showMenu(e.clientX, e.clientY);
    });
  };
}
document.addEventListener('DOMContentLoaded', () => {
    const radius = document.body.getAttribute('data-radius') || '0';
    document.documentElement.style.setProperty('--radius', `${radius}px`);
});
