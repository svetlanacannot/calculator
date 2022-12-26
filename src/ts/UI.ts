import { ComputeSequenceType } from './interfaces/types';

export default class UI {
  private readonly previousOperationTextElement: HTMLDivElement;

  private readonly currentOperationTextElement: HTMLDivElement;

  private readonly screenElement: HTMLDivElement;

  private readonly btnsToExpand: NodeListOf<HTMLButtonElement>;

  constructor(
    screenElement: HTMLDivElement,
    previousOperationTextElement: HTMLDivElement,
    currentOperationTextElement: HTMLDivElement,
    btnsToExpand: NodeListOf<HTMLButtonElement>,
  ) {
    this.screenElement = screenElement;
    this.previousOperationTextElement = previousOperationTextElement;
    this.currentOperationTextElement = currentOperationTextElement;
    this.btnsToExpand = btnsToExpand;
  }

  public updateScreen(
    previousOperands: ComputeSequenceType[],
    operands: ComputeSequenceType[],
    computed: number | null,
  ): void {
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

  public expandKeyboard(): void {
    this.btnsToExpand.forEach((btn) => {
      if (btn.style.display === 'block') {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'block';
      }
    });
  }
}
