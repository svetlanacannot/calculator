import { Calculator } from "./Calculator";

const previousOperationText = document.querySelector('#previousText');
const currentOperationText = document.querySelector('#currentText');

const allClearButton = document.querySelector('#allClearButton')
const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const equalsButton = document.querySelector('#equalsButton')
const commaButton = document.querySelector('#commaButton')

if(previousOperationText != null && currentOperationText != null){
    const calculator = new Calculator(previousOperationText, currentOperationText);

    allClearButton?.addEventListener('click', () => {
        calculator.clear()
        calculator.updateScreen()
    })

    numberButtons.forEach(btn => btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerHTML)
        calculator.updateScreen()
    }))

    operationButtons.forEach(btn => btn.addEventListener('click', () => {
        calculator.appendOperation(btn.innerHTML)
        calculator.updateScreen()
    }))

    equalsButton?.addEventListener('click', () => {
        calculator.compute()
        calculator.updateScreen()
    })

    commaButton?.addEventListener('click', () => {
        calculator.appendComma()
        calculator.updateScreen()
    })
}