const keyboard = {
  elements: {
    outputArea: null,
    keyboardMain: null,
    keyboardBody: null,
    keyItems: null,
    keys: [],
  },
  properties: {
    capsLock: false,
    shift: false,
    alt: false,
    ctrl: false,
    value: '',
  },
  eventHandler: {
    oninput: null,
  },

  init() {
    this.elements.outputArea = document.createElement('textarea');
    this.elements.keyboardMain = document.createElement('section');
    this.elements.keyboardBody = document.createElement('div');
    // this.elements.keyItems = document.createElement('div');

    this.elements.outputArea.classList.add('output');
    this.elements.outputArea.setAttribute('id', 'area');
    this.elements.keyboardMain.classList.add('keyboard');
    this.elements.keyboardBody.classList.add('keyboard__body');
    // this.elements.keyItems.classList.add('keyboard__keys-item');
    this.elements.keyboardBody.appendChild(this._renderKeysRow());

    this.elements.keys = this.elements.keyboardBody.querySelectorAll(
      '.keyboard__keys-item'
    );

    this.elements.keyboardMain.appendChild(this.elements.keyboardBody);
    document.body.appendChild(this.elements.outputArea);
    document.body.appendChild(this.elements.keyboardMain);

    document.querySelectorAll('.output').forEach((element) => {
      element.addEventListener('focus', () => {
        this.typing(element.value, (curValue) => {
          element.value = curValue;
        });
      });
    });
  },
  _renderKeysRow() {
    const keyFragment = document.createDocumentFragment();
    const keyLayout = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '+',
      '-',
      'backspace',
      'tab',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      'del',
      'capslock',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'enter',
      'shiftL',
      'я',
      'ч',
      'с',
      'м',
      'и',
      'т',
      'ь',
      'б',
      'ю',
      '.',
      ',',
      '?',
      '!',
      'arrow-up',
      'shiftR',
      'ctrl',
      'alt',
      'space',
      'alt',
      'ctrl',
      'arrow-left',
      'arrow-down',
      'arrow-right',
    ];
    // const createBackspaceIcon = document.createElement('img');
    // createBackspaceIcon.setAttribute(
    //   'src',
    //   '../src/assets/icons/backspace-svgrepo-com.svg'
    // );
    keyLayout.forEach((item) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('keyboard__keys-item');

      const keyIcon = (iconName) => {
        return `<img
        class="icon"
        src="../src/assets/icons/${iconName}.svg"
        alt=""
      />`;
      };

      switch (item) {
        case 'backspace':
          keyElement.classList.add('keyboard__keys-item', 'backspace');
          keyElement.innerHTML = keyIcon('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'tab':
          keyElement.classList.add('keyboard__keys-item', 'tab');
          keyElement.innerHTML = keyIcon('tab');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\t';
            this._triggerEvent('oninput');
          });
          break;
        case 'del':
          keyElement.classList.add('keyboard__keys-item');
          keyElement.innerHTML = `<h4>Del</h4>`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'capslock':
          keyElement.classList.add('keyboard__keys-item', 'capslock');
          keyElement.innerHTML = `<h4>Capslock</h4>`;
          keyElement.addEventListener('click', () => {
            this._capsMode();
            this._triggerEvent('oninput');
          });
          break;
        case 'enter':
          keyElement.classList.add('keyboard__keys-item', 'enter');
          keyElement.innerHTML = keyIcon('enter');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this._triggerEvent('oninput');
          });
          break;
        case 'shiftL':
          keyElement.classList.add('keyboard__keys-item', 'shiftL');
          keyElement.innerHTML = `<h4>Shift</h4>`;
          keyElement.addEventListener('click', () => {
            this._toggleShift();
            this._triggerEvent('oninput');
          });
          break;
        case 'arrow-up':
          keyElement.classList.add('keyboard__keys-item', 'arrow-up');
          keyElement.innerHTML = keyIcon('arrow-up');
          keyElement.addEventListener('click', () => {
            this.properties.value = '↑';
            this._triggerEvent('oninput');
          });
          break;
        case 'shiftR':
          keyElement.classList.add('keyboard__keys-item', 'shiftR');
          keyElement.innerHTML = `<h4>Shift</h4>`;
          keyElement.addEventListener('click', () => {
            this._toggleShift();
            this._triggerEvent('oninput');
          });
          break;
        case 'ctrl':
          keyElement.classList.add('keyboard__keys-item', 'ctrl');
          keyElement.innerHTML = `<h4>Ctrl</h4>`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'alt':
          keyElement.classList.add('keyboard__keys-item', 'alt');
          keyElement.innerHTML = `<h4>Alt</h4>`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'space':
          keyElement.classList.add('keyboard__keys-item', 'space');
          keyElement.innerHTML = '';
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });
          break;
        case 'alt':
          keyElement.classList.add('keyboard__keys-item', 'alt');
          keyElement.innerHTML = `<h4>Alt</h4>`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'ctrl':
          keyElement.classList.add('keyboard__keys-item', 'ctrl');
          keyElement.innerHTML = `<h4>Ctrl</h4>`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'arrow-left':
          keyElement.classList.add('keyboard__keys-item', 'arrow-left');
          keyElement.innerHTML = keyIcon('arrow-left');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'arrow-down':
          keyElement.classList.add('keyboard__keys-item', 'arrow-down');
          keyElement.innerHTML = keyIcon('arrow-down');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;
        case 'arrow-right':
          keyElement.classList.add('keyboard__keys-item', 'arrow-right');
          keyElement.innerHTML = keyIcon('arrow-right');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent('oninput');
          });
          break;

        default:
          keyElement.textContent = item.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? item.toUpperCase()
              : item.toLowerCase();
            this._triggerEvent('oninput');
          });
          keyElement.addEventListener('keydown', () => {
            this.properties.value += this.properties.capsLock
              ? item.toUpperCase()
              : item.toLowerCase();
            keyElement.classList.add('active');
            this._triggerEvent('oninput');
          });
          keyElement.addEventListener('keyup', () => {
            this.properties.value += this.properties.capsLock
              ? item.toUpperCase()
              : item.toLowerCase();
            keyElement.classList.remove('active');
            this._triggerEvent('oninput');
          });
          break;
      }
      keyFragment.appendChild(keyElement);
    });
    return keyFragment;
  },
  _capsMode() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const item of this.elements.keys) {
      if (item.childElementCount === 0) {
        item.textContent = this.properties.capsLock
          ? item.textContent.toUpperCase()
          : item.textContent.toLowerCase();
      }
    }
  },
  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    for (const item of this.elements.keys) {
      if (item.childElementCount === 0) {
        item.textContent = this.properties.shift
          ? item.textContent.toUpperCase()
          : item.textContent.toLowerCase();
      }
    }
  },
  _triggerEvent(handlerName) {
    if (typeof this.eventHandler[handlerName] == 'function') {
      this.eventHandler[handlerName](this.properties.value);
    }
  },
  typing(initValue, oninput) {
    this.properties.value = initValue || '';
    this.eventHandler.oninput = oninput;
  },
};

window.addEventListener('DOMContentLoaded', function () {
  keyboard.init();
});
