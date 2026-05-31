/**
 * NoUI - Lightweight UI Library
 * @version 1.4
 * @copyright 2024-2025 NoSoft. All Rights Reserved.
 * @license MIT
 * @see https://github.com/nosoftchina/noui
 */
(function (globalScope) {
  'use strict';

  /**
   * Creates a custom context menu
   * @param {Object} config - Menu configuration
   * @param {Array} config.items - Array of menu items with text and action properties
   * @returns {Function} Function to bind the menu to an element
   */
  function NoUIMenu(config) {
    // Remove existing menu to prevent duplicates
    var existingMenu = document.getElementById('noui-menu');
    if (existingMenu) {
      document.body.removeChild(existingMenu);
    }

    // Create menu DOM structure
    var menu = document.createElement('div');
    menu.id = 'noui-menu';
    menu.className = 'noui-card';
    menu.style.display = 'none';

    var ul = document.createElement('ul');
    ul.style.overflow = 'hidden';

    // Add menu items
    for (var i = 0; i < config.items.length; i++) {
      (function (item) {
        var li = document.createElement('li');
        li.textContent = item.text;

        li.addEventListener('click', function () {
          if (typeof item.action === 'function') {
            item.action();
          } else {
            console.warn('NoUI Menu: Menu item "' + item.text + '" clicked but no action bound');
          }
          hideMenu();
        });

        ul.appendChild(li);
      })(config.items[i]);
    }

    menu.appendChild(ul);
    document.body.appendChild(menu);

    // Hide menu function
    function hideMenu() {
      menu.style.display = 'none';
    }

    // Show menu function with boundary checking
    function showMenu(x, y) {
      menu.style.display = 'block';

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var menuWidth = menu.offsetWidth;
      var menuHeight = menu.offsetHeight;

      var adjustedX = x;
      var adjustedY = y;

      // Horizontal adjustment
      if (x + menuWidth > windowWidth - 10) {
        adjustedX = Math.max(10, windowWidth - menuWidth - 10);
      }

      // Vertical adjustment
      if (y + menuHeight > windowHeight - 10) {
        adjustedY = Math.max(10, windowHeight - menuHeight - 10);
      }

      menu.style.left = adjustedX + 'px';
      menu.style.top = adjustedY + 'px';
    }

    // Global click to hide menu
    document.addEventListener('click', hideMenu);

    // Return function to bind to specific element
    return function (element) {
      if (!element) element = document;

      element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showMenu(e.clientX, e.clientY);
      });
    };
  }

  /**
   * Creates a dialog box
   * @param {Object} config - Dialog configuration
   * @param {string} config.title - Dialog title (required)
   * @param {string} [config.content] - Dialog content (optional)
   * @param {Array} [config.options] - Array of options with option text and action
   */
  function NoUIDialog(config) {
    // Validate required parameters
    if (!config || !config.title) {
      console.error('NoUI Dialog: title parameter not provided');
      return;
    }

    // Handle options with default fallback
    var options = config.options;
    if (!options || !Array.isArray(options) || options.length === 0) {
      options = [{
        option: '明白',
        action: function () { closeDialog(); }
      }];
      console.warn('NoUI Dialog: options parameter not provided, using default "明白"');
    }

    // Create DOM elements
    var overlay = document.createElement('div');
    overlay.className = 'noui-dialog-overlay';

    var dialog = document.createElement('div');
    dialog.className = 'noui-card noui-dialog';

    var title = document.createElement('h3');
    title.className = 'noui-dialog-title';
    title.textContent = config.title;

    dialog.appendChild(title);

    if (config.content) {
      var content = document.createElement('div');
      content.className = 'noui-dialog-content';
      content.innerHTML = config.content;
      dialog.appendChild(content);
    }

    var optionsContainer = document.createElement('div');
    optionsContainer.className = 'noui-dialog-options';

    for (var i = 0; i < options.length; i++) {
      (function (opt) {
        var button = document.createElement('button');
        button.className = 'noui-button';
        button.textContent = opt.option;
        button.addEventListener('click', function () {
          if (typeof opt.action === 'function') {
            opt.action();
          }
          closeDialog();
        });
        optionsContainer.appendChild(button);
      })(options[i]);
    }

    dialog.appendChild(optionsContainer);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Add animation class
    setTimeout(function () {
      overlay.classList.add('show');
      dialog.classList.add('show');
    }, 10);

    // Close dialog function
    function closeDialog() {
      overlay.classList.remove('show');
      dialog.classList.remove('show');
      setTimeout(function () {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 300);
    }

    // Click overlay to close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeDialog();
      }
    });
  }

  // Initialize radius from data attribute when DOM is ready
  function initRadius() {
    var radius = document.body.getAttribute('data-radius') || '0';
    document.documentElement.style.setProperty('--radius', radius + 'px');
  }

  // Ripple effect handler
  function handleRipple(e) {
    var targetElement = e.target.closest('.noui-ripple, .noui-button');

    if (targetElement) {
      var ripple = document.createElement('span');
      ripple.classList.add('noui-ripple-effect');

      var rect = targetElement.getBoundingClientRect();
      var computedStyle = window.getComputedStyle(targetElement);

      var width = rect.width;
      var height = rect.height;

      // Calculate ripple diameter (diagonal for full coverage)
      var diameter = Math.sqrt(width * width + height * height);
      var radius = diameter / 2;

      // Calculate ripple center position
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      ripple.style.width = ripple.style.height = diameter + 'px';
      ripple.style.left = (e.clientX - rect.left - radius + scrollLeft) + 'px';
      ripple.style.top = (e.clientY - rect.top - radius + scrollTop) + 'px';

      // Ensure container has correct styles
      if (computedStyle.position === 'static') {
        targetElement.style.position = 'relative';
      }
      if (computedStyle.overflow !== 'hidden') {
        targetElement.style.overflow = 'hidden';
      }

      targetElement.appendChild(ripple);

      // Remove after animation
      setTimeout(function () {
        if (ripple.parentNode === targetElement) {
          ripple.remove();
        }
      }, 600);
    }
  }

  // DOM Ready initialization
  function onDOMContentLoaded() {
    initRadius();

    document.addEventListener('click', handleRipple);
  }

  // Register DOMContentLoaded listener
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
  } else {
    onDOMContentLoaded();
  }

  // Expose to global scope
  globalScope.NoUIMenu = NoUIMenu;
  globalScope.NoUIDialog = NoUIDialog;

})(typeof window !== 'undefined' ? window : this);
