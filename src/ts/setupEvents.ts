import {
  Operations, ButtonTypes, Numbers, SeparateButtonsKeys, Brackets,
} from './interfaces/enums';
import { JsonBtnType } from './interfaces/types';
import Calculator from './Calculator';
import UI from './UI';

export function setupButtonEvents(
  calculator: Calculator,
  ui: UI,
  buttonElements: HTMLElement[],
  buttonsJson: JsonBtnType[],
) {
  buttonElements.forEach((buttonElement, index) => {
    buttonElement.addEventListener('click', () => {
      switch (buttonsJson[index].type) {
        case ButtonTypes.EXPAND_BUTTON: ui.expandKeyboard(); break;
        case ButtonTypes.ALL_CLEAR_BUTTON: calculator.clear(); break;
        case ButtonTypes.DELETE_BUTTON: calculator.deleteLast(); break;
        case ButtonTypes.EQUALS_BUTTON: calculator.compute(); break;
        case ButtonTypes.COMMA_BUTTON: calculator.appendComma(); break;
        case ButtonTypes.PERCENT_BUTTON: calculator.changeLastOperandToPercent(); break;
        case ButtonTypes.NUMBER_BUTTON: {
          if (buttonElement.textContent !== null) {
            calculator.appendNumber(buttonElement.textContent);
          }
          break;
        }
        case ButtonTypes.OPERATION_BUTTON: {
          if (buttonElement.textContent !== null
            && Object.values(Operations).includes(buttonElement.textContent as Operations)) {
            calculator.appendOperation(buttonElement.textContent as Operations);
          }
          break;
        }
        case ButtonTypes.BRACKET_BUTTON: {
          if (buttonElement.textContent !== null) {
            calculator.appendBracket(buttonElement.textContent);
          }
          break;
        }
        default: break;
      }

      if (buttonsJson[index].type !== ButtonTypes.EXPAND_BUTTON) {
        ui.updateScreen(
          calculator.getPreviousComputeSequenceArray(),
          calculator.getComputeSequenceArray(),
          calculator.getComputed(),
        );
      }
    });
  });
}

export function setupKeyPressEvents(calculator: Calculator, ui: UI) {
  document.addEventListener('keydown', (e) => {
    const eventKeys = {
      numbers: Object.values(Numbers),
      operations: Object.values(Operations),
      brackets: Object.values(Brackets),
      equals: [SeparateButtonsKeys.EQUALS, SeparateButtonsKeys.ENTER],
      comma: SeparateButtonsKeys.COMMA,
      percent: SeparateButtonsKeys.PERCENT,
      delete: SeparateButtonsKeys.DELETE,
    };

    if (eventKeys.numbers.includes(e.key as Numbers)) {
      calculator.appendNumber(e.key);
    } else if (eventKeys.operations.includes(e.key as Operations)
    && Object.values(Operations).includes(e.key as Operations)) {
      calculator.appendOperation(e.key as Operations);
    } else if (eventKeys.equals.includes(e.key as SeparateButtonsKeys)) {
      calculator.compute();
    } else if (eventKeys.brackets.includes(e.key as Brackets)) {
      calculator.appendBracket(e.key);
    } else if (e.key === eventKeys.comma) {
      calculator.appendComma();
    } else if (e.key === eventKeys.delete) {
      calculator.deleteLast();
    } else if (e.key === eventKeys.percent) {
      calculator.changeLastOperandToPercent();
    }

    ui.updateScreen(
      calculator.getPreviousComputeSequenceArray(),
      calculator.getComputeSequenceArray(),
      calculator.getComputed(),
    );
  });
}
