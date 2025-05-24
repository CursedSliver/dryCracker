/**
 * All of this is vibe coded by ChatGPT 4o
 * VirtualKeyboard: renders a customizable on-screen keyboard inside any container
 * config: {
 *   layout: Array of rows, each row is array of key definitions
 *   onKeyPress: function(keyValue)
 * }
 */
class VirtualKeyboard {
  constructor(container, config = {}) {
    this.container = (typeof container === 'string')
      ? document.querySelector(container)
      : container;
    this.layout = config.layout || VirtualKeyboard.defaultLayout();
    this.onKeyPress = config.onKeyPress || function(k) { console.log('Key:', k); };
    this.render();
  }

  static defaultLayout() {
    return [
      ['1','2','3','4','5','6','7','8','9','0'],
      ['Q','W','E','R','T','Y','U','I','O','P'],
      ['A','S','D','F','G','H','J','K','L'],
      ['Z','X','C','V','B','N','M'],
      ['Space']
    ];
  }

  createKey(key) {
    const btn = document.createElement('div');
    btn.className = 'vk-key';
    btn.textContent = key === 'Space' ? '' : key;
    if(key === 'Space') btn.style.flex = '5';
    btn.addEventListener('click', () => this.onKeyPress(key));
    return btn;
  }

  render() {
    const kb = document.createElement('div');
    kb.className = 'virtual-keyboard';

    this.layout.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'vk-row';
      row.forEach(key => {
        rowDiv.appendChild(this.createKey(key));
      });
      kb.appendChild(rowDiv);
    });

    this.container.innerHTML = '';
    this.container.appendChild(kb);
  }
}

// Usage Example:
/*
const myContainer = document.getElementById('keyboard-container');
new VirtualKeyboard(myContainer, {
  layout: [
    ['7','8','9'],
    ['4','5','6'],
    ['1','2','3'],
    ['0','.', 'Enter']
  ],
  onKeyPress: key => alert('Pressed: ' + key)
});*/

let newStyles = document.createElement('style');
newStyles.textContent = `
.virtual-keyboard {
    display: inline-block;
    background: #f4f4f4;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    user-select: none;
}
.vk-row {
    display: flex;
    margin-bottom: 5px;
}
.vk-key {
    flex: 1;
    margin: 2px;
    padding: 10px;
    background: #fff;
    border: 1px solid #bbb;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    font-family: sans-serif;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
.vk-key:active {
    background: #e2e2e2;
}`;
document.head.appendChild(newStyles);