import { Calculator } from './Calculator'
import { UI } from './UI'

const screenElement: HTMLDivElement | null = document.querySelector('#screen')
const previousOperationTextElement: HTMLDivElement | null = document.querySelector('#previousText')
const currentOperationTextElement: HTMLDivElement | null = document.querySelector('#currentText')

const expandKeyboardButton: HTMLButtonElement | null = document.querySelector('#expandKeyboardButton')
const allClearButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.allClearButton')
const numberButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.number')
const operationButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.operation')
const equalsButton: HTMLButtonElement | null = document.querySelector('#equalsButton')
const commaButton: HTMLButtonElement | null = document.querySelector('#commaButton')
const deleteButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.deleteButton')
const percentButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.percentButton')

if (screenElement != null && previousOperationTextElement != null && currentOperationTextElement != null) {
  const calculator = new Calculator()
  const ui = new UI(screenElement, previousOperationTextElement, currentOperationTextElement)

  expandKeyboardButton?.addEventListener('click', () => {
    ui.expandKeyboard()
  })

  allClearButtons.forEach(btn => {
    btn?.addEventListener('click', () => {
      calculator.clear()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    })
  })

  deleteButtons.forEach(btn => {
    btn?.addEventListener('click', () => {
      calculator.deleteLast()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    })
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

  percentButtons.forEach(btn => {
    btn?.addEventListener('click', () => {
      calculator.changeLastOperandToPercent()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    })
  })

  document.addEventListener('keypress', e => {
    const eventKeys = {
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      operations: ['-', '+', '*', '/'],
      equals: ['=', 'Enter'],
      comma: ',',
      percent: '%',
      delete: 'Delete'
    }

    if (eventKeys.numbers.includes(e.key)) {
      calculator.appendNumber(e.key)
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    } else

    if (eventKeys.operations.includes(e.key)) {
      calculator.appendOperation(e.key)
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    } else

    if (eventKeys.equals.includes(e.key)) {
      calculator.compute()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    } else

    if (e.key === eventKeys.comma) {
      calculator.appendComma()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    } else

    if (e.key === eventKeys.delete) {
      calculator.deleteLast()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    } else

    if (e.key === eventKeys.percent) {
      calculator.changeLastOperandToPercent()
      ui.updateScreen(calculator.previousComputeSequenceArray, calculator.computeSequenceArray, calculator.computed)
    }
  })
}
