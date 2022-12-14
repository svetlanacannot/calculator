import { computeSequenceType } from './Calculator'

export class UI {
  private readonly previousOperationTextElement: HTMLDivElement
  private readonly currentOperationTextElement: HTMLDivElement
  private readonly screenElement: HTMLDivElement

  constructor (screenElement: HTMLDivElement, previousOperationTextElement: HTMLDivElement, currentOperationTextElement: HTMLDivElement) {
    this.screenElement = screenElement
    this.previousOperationTextElement = previousOperationTextElement
    this.currentOperationTextElement = currentOperationTextElement
  }

  public updateScreen (previousOperands: computeSequenceType, operands: computeSequenceType, computed: number | null): void {
    this.previousOperationTextElement.innerHTML = previousOperands.map(operand => operand.value).join('')
    this.currentOperationTextElement.innerHTML = operands.map(operand => operand.value).join('')
    if (computed != null) {
      this.previousOperationTextElement.innerHTML = previousOperands.map(operand => operand.value).join('')
      this.currentOperationTextElement.innerHTML = '=' + computed.toString()
    }

    if (this.currentOperationTextElement.scrollWidth > this.screenElement.scrollWidth) {
      this.currentOperationTextElement.style.fontSize = '2rem'
    }
  }

  public expandKeyboard (): void {
    const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button--expanded')

    btns.forEach(btn => {
      if (btn.style.display === 'block') {
        btn.style.display = 'none'
      } else {
        btn.style.display = 'block'
      }
    })
  }
}
