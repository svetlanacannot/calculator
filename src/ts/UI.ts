import { computeSequenceType } from './Calculator'

export class UI {
  private readonly previousOperationTextElement: Element
  private readonly currentOperationTextElement: Element

  constructor (previousOperationTextElement: Element, currentOperationTextElement: Element) {
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
  }
}
