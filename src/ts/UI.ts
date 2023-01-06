import { createCustomElement } from './helpers';
import { ComputeSequenceType, JsonBtnType } from './interfaces/types';

export default class UI {
  private readonly root: HTMLElement;

  private readonly calculatorElement: HTMLElement;

  private readonly previousOperationTextElement: HTMLElement;

  private readonly currentOperationTextElement: HTMLElement;

  private readonly infoTextElement: HTMLElement;

  private readonly screenElement: HTMLElement;

  private readonly keyboardElement: HTMLElement;

  private readonly buttonsJson: JsonBtnType[];

  private buttonElements: HTMLElement[] = [];

  private buttonsToExpand: HTMLElement[] = [];

  constructor(
    root: HTMLElement,
    buttonsJson: JsonBtnType[],
  ) {
    this.root = root;
    this.calculatorElement = createCustomElement('div', 'calculator');
    this.screenElement = createCustomElement('div', 'screen', 'screen');
    this.previousOperationTextElement = createCustomElement('div', 'screen__previous', 'previousText');
    this.currentOperationTextElement = createCustomElement('div', 'screen__current', 'currentText');
    this.infoTextElement = createCustomElement('div', 'screen__info', 'infoText');
    this.keyboardElement = createCustomElement('div', 'keyboard', 'keyboard');
    this.buttonsJson = buttonsJson;
  }

  public getButtonElements() {
    return this.buttonElements;
  }

  public getButtonsToExpand() {
    return this.buttonsToExpand;
  }

  public updateScreen(
    previousOperands: ComputeSequenceType[],
    operands: ComputeSequenceType[],
    computed: number | null,
  ) {
    this.previousOperationTextElement.innerText = previousOperands.map((operand) => operand.value).join('');
    this.currentOperationTextElement.innerText = operands.map((operand) => operand.value).join('');
    if (computed != null) {
      this.previousOperationTextElement.innerText = previousOperands.map((operand) => operand.value).join('');
      this.currentOperationTextElement.innerText = `=${computed}`;
    }

    if (this.currentOperationTextElement.scrollWidth > this.screenElement.scrollWidth) {
      this.currentOperationTextElement.style.fontSize = '2rem';
    }
  }

  public expandKeyboard() {
    this.buttonsToExpand?.forEach((btn) => {
      if (btn.style.display === 'block') {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'block';
      }
    });
  }

  public buildUI() {
    this.root.appendChild(this.calculatorElement);
    this.calculatorElement.appendChild(this.screenElement);
    this.calculatorElement.appendChild(this.keyboardElement);
    this.screenElement.appendChild(this.previousOperationTextElement);
    this.screenElement.appendChild(this.currentOperationTextElement);
    this.screenElement.appendChild(this.infoTextElement);
    this.buttonsJson.forEach((btn) => {
      const buttonElement = createCustomElement(btn.tagName, btn.class, btn.id, btn.innerText);
      this.keyboardElement.appendChild(buttonElement);
      this.buttonElements.push(buttonElement);
      if (btn.class.includes('button--expanded')) this.buttonsToExpand.push(buttonElement);
    });
  }
}
