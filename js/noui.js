console.log(`NoUI v1.4|New Version is new style|Newly upgraded glassmorphism style
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
  const existingMenu = document.getElementById("noui-menu");
  if (existingMenu) {
    document.body.removeChild(existingMenu);
  }

  // 创建菜单DOM结构
  const menu = document.createElement("div");
  menu.id = "noui-menu";
  menu.className = "noui-card";
  menu.style.display = "none";

  const ul = document.createElement("ul");
  ul.style.overflow = "hidden";

  // 添加菜单项
  config.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;

    li.addEventListener("click", () => {
      if (typeof item.action === "function") {
        item.action();
      } else {
        console.warn(
          `NoUI Menu:有菜单项 ${item.text} 被点击，但没有绑定任何操作`
        );
      }
      hideMenu();
    });

    ul.appendChild(li);
  });

  menu.appendChild(ul);
  document.body.appendChild(menu);

  // 隐藏菜单函数
  function hideMenu() {
    menu.style.display = "none";
  }

  // 显示菜单函数
  function showMenu(x, y) {
    // 防止溢出
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;

    const adjustedX =
      x + menuWidth > windowWidth ? windowWidth - menuWidth - 5 : x;
    const adjustedY =
      y + menuHeight > windowHeight ? windowHeight - menuHeight - 5 : y;

    menu.style.left = `${adjustedX}px`;
    menu.style.top = `${adjustedY}px`;
    menu.style.display = "block";
  }

  // 全局点击隐藏菜单
  document.addEventListener("click", hideMenu);

  // 返回一个函数用于绑定到特定元素
  return function (element) {
    if (!element) element = document;

    element.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      showMenu(e.clientX, e.clientY);
    });
  };
}

function NoUIDialog(config) {
  // 验证必填参数
  if (!config || !config.title) {
    console.error("NoUI Dialog:未提供title参数");
    return;
  }

  // 处理options
  let options = config.options;
  if (!options || !Array.isArray(options) || options.length === 0) {
    options = [
      {
        option: "明白",
        action: () => closeDialog(),
      },
    ];
    console.warn("NoUI Dialog:未提供options参数，使用默认选项“明白”");
  }

  // 创建DOM元素
  const overlay = document.createElement("div");
  overlay.className = "noui-dialog-overlay";

  const dialog = document.createElement("div");
  dialog.className = "noui-card noui-dialog";

  const title = document.createElement("h3");
  title.className = "noui-dialog-title";
  title.textContent = config.title;

  dialog.appendChild(title);

  if (config.content) {
    const content = document.createElement("div");
    content.className = "noui-dialog-content";
    content.innerHTML = config.content;
    dialog.appendChild(content);
  }

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "noui-dialog-options";

  options.forEach((opt) => {
    const button = document.createElement("button");
    button.className = "noui-button";
    button.textContent = opt.option;
    button.addEventListener("click", () => {
      if (typeof opt.action === "function") {
        opt.action();
      }
      closeDialog();
    });
    optionsContainer.appendChild(button);
  });

  dialog.appendChild(optionsContainer);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // 添加动画类
  setTimeout(() => {
    overlay.classList.add("show");
    dialog.classList.add("show");
  }, 10);

  // 关闭弹窗函数
  function closeDialog() {
    overlay.classList.remove("show");
    dialog.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 300);
  }

  // 点击遮罩层关闭
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeDialog();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const radius = document.body.getAttribute('data-radius') || '0';
    document.documentElement.style.setProperty('--radius', `${radius}px`);
});

// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
document.addEventListener('click', function(e) {
    const targetElement = e.target.closest('.noui-ripple, .noui-button');

    if (targetElement) {
      // 创建涟漪元素
      const ripple = document.createElement('span');
      ripple.classList.add('noui-ripple-effect');
      
      // 获取元素实际尺寸（包括padding和border）
      const rect = targetElement.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(targetElement);
      
      // 计算包含边框和内边距的总尺寸
      const width = rect.width;
      const height = rect.height;
      
      // 计算涟漪直径（取元素对角线长度确保全覆盖）
      const diameter = Math.sqrt(width * width + height * height);
      const radius = diameter / 2;
      
      // 计算涟漪中心位置（考虑滚动偏移）
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 设置涟漪样式
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius + scrollLeft}px`;
      ripple.style.top = `${e.clientY - rect.top - radius + scrollTop}px`;
      
      // 确保容器有正确样式（不改变原始display属性）
      if (computedStyle.position === 'static') {
        targetElement.style.position = 'relative';
      }
      if (computedStyle.overflow !== 'hidden') {
        targetElement.style.overflow = 'hidden';
      }
      
      // 添加涟漪元素
      targetElement.appendChild(ripple);
      
      // 动画结束后移除
      setTimeout(() => {
        if (ripple.parentNode === targetElement) {
          ripple.remove();
        }
      }, 600);
    }
  });
});