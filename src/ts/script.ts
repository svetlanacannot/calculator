import { Calculator } from './Calculator'
import { UI } from './UI'

const screenElement: HTMLDivElement | null = document.querySelector('#screen')
const previousOperationTextElement: HTMLDivElement | null = document.querySelector('#previousText')
const currentOperationTextElement: HTMLDivElement | null = document.querySelector('#currentText')

const allClearButton: HTMLButtonElement | null = document.querySelector('#allClearButton')
const numberButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.number')
const operationButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.operation')
const equalsButton: HTMLButtonElement | null = document.querySelector('#equalsButton')
const commaButton: HTMLButtonElement | null = document.querySelector('#commaButton')
const deleteButton: HTMLButtonElement | null = document.querySelector('#deleteButton')
const percentButton: HTMLButtonElement | null = document.querySelector('#percentButton')

if (screenElement != null && previousOperationTextElement != null && currentOperationTextElement != null) {
  const calculator = new Calculator()
  const ui = new UI(screenElement, previousOperationTextElement, currentOperationTextElement)

  allClearButton?.addEventListener('click', () => {
    calculator.clear()
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  })

  deleteButton?.addEventListener('click', () => {
    calculator.deleteLast()
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  })

  numberButtons.forEach(btn => btn.addEventListener('click', () => {
    if (btn.textContent !== null) {
      calculator.appendNumber(btn.textContent)
    }
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  }))

  operationButtons.forEach(btn => btn.addEventListener('click', () => {
    if (btn.textContent !== null) {
      calculator.appendOperation(btn.textContent)
    }
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  }))

  equalsButton?.addEventListener('click', () => {
    calculator.compute()
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  })

  commaButton?.addEventListener('click', () => {
    calculator.appendComma()
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  })

  percentButton?.addEventListener('click', () => {
    calculator.changeLastOperandToPercent()
    ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
  })
}
