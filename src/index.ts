import { setupButtonEvents, setupKeyPressEvents } from './ts/setupEvents';
import Calculator from './ts/Calculator';
import UI from './ts/UI';
import { buttons } from './keyboardButtons.json';
import './scss/main.scss';

const root = document.getElementById('root');

if (root !== null) {
  const calculator = new Calculator();
  const ui = new UI(root, buttons);

  ui.buildUI();
  setupButtonEvents(calculator, ui, ui.getButtonElements(), buttons);
  setupKeyPressEvents(calculator, ui);
}
