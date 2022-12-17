export type computeSequenceType = Array<{ type: string, value: string }>
export enum operations {
  multiply = '*',
  divide = '÷',
  plus = '+',
  minus = '-',
}
export enum brackets {
  left = '(',
  right = ')'
}
export class Calculator {
  protected _previousComputeSequenceArray: computeSequenceType = []
  protected _computeSequenceArray: computeSequenceType = []
  protected _computed: number | null = null

  public get previousComputeSequenceArray (): computeSequenceType {
    return this._previousComputeSequenceArray
  }

  private set previousComputeSequenceArray (previousComputeSequenceArray: computeSequenceType) {
    this._previousComputeSequenceArray = previousComputeSequenceArray
  }

  public get computeSequenceArray (): computeSequenceType {
    return this._computeSequenceArray
  }

  private set computeSequenceArray (computeSequenceArray: computeSequenceType) {
    this._computeSequenceArray = computeSequenceArray
  }

  public get computed (): number | null {
    return this._computed
  }

  private set computed (computed: number | null) {
    this._computed = computed
  }

  public appendNumber (number: string): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]

    if (lastOperand?.value.length > 19) { return }

    if (lastOperand == null || lastOperand.type === 'operation' || lastOperand.type === 'bracket') {
      this.computeSequenceArray.push({ type: 'number', value: number })
    } else if (lastOperand.type === 'number' || (this.computeSequenceArray.length === 1 && lastOperand.value === '-')) {
      lastOperand.type = 'number'
      lastOperand.value += number
    }
  }

  public appendOperation (operation: string): void {
    if (this.computed !== null) {
      this.previousComputeSequenceArray.push({ type: 'operation', value: '=' }, { type: 'number', value: this.computed.toString() })
    }
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]
    this.computed = null

    if (lastOperand?.type === 'operation') {
      lastOperand.value = operation
    } else {
      this.computeSequenceArray.push({ type: 'operation', value: operation })
    }
  }

  public appendBracket (bracket: string): void {
    this.computeSequenceArray.push({ type: 'bracket', value: bracket })
  }

  public appendComma (): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]

    if (lastOperand?.type === 'number' && lastOperand?.value.charAt(lastOperand?.value?.length - 1) !== '.') {
      lastOperand.value += '.'
    }
  }

  public changeLastOperandToPercent (): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]
    const previousOperand = this.computeSequenceArray[this.computeSequenceArray.length - 3]

    if (lastOperand?.type === 'number' && previousOperand != null) {
      lastOperand.value = (parseFloat(previousOperand.value) * parseFloat(lastOperand.value) / 100).toString()
    }
  }

  public clear (): void {
    if (this.computeSequenceArray.length === 0) {
      this.previousComputeSequenceArray = []
    } else if (this.computed != null) {
      this.previousComputeSequenceArray.push({ type: 'operation', value: '=' }, { type: 'number', value: this.computed.toString() })
    }
    this.computeSequenceArray = []
    this.computed = null
  }

  public deleteLast (): void {
    if (this.computeSequenceArray.length !== 0) {
      this.computeSequenceArray[this.computeSequenceArray.length - 1].value = this.computeSequenceArray[this.computeSequenceArray.length - 1].value.slice(0, -1)
      if (this.computeSequenceArray[this.computeSequenceArray.length - 1].value === '') {
        this.computeSequenceArray.pop()
      }
    }
  }

  public compute (): void {
    if (this.computed !== null) {
      this.previousComputeSequenceArray.push({ type: 'equals', value: '=' }, { type: 'number', value: this.computed.toString() })
      this.computeSequenceArray = []
      this.computed = null
      return
    }

    // mathComputeSequenceArray.splice(index - 1, 3, { type: 'number', value: computed.toString() })

    if (this.computeSequenceArray.length !== 0) {
      this.previousComputeSequenceArray = this.computeSequenceArray

      if (!this.validateBrackets(this.computeSequenceArray)) {
        this.computeSequenceArray = [{ type: 'exception', value: 'Brackets are not closed' }]
        return
      }

      const tempComputeSequenceArray = [...this.computeSequenceArray]

      const leftBracketsIndexesArray: number[] = []
      const rightBracketsIndexesArray: number[] = []

      tempComputeSequenceArray.forEach((item, index) => {
        if (item.value === '(') leftBracketsIndexesArray.push(index)
        else if (item.value === ')') rightBracketsIndexesArray.push(index)
      })

      leftBracketsIndexesArray.reverse().forEach(leftBracketIndex => {
        const pairRightBracketIndex = rightBracketsIndexesArray.find(rightBracketIndex => rightBracketIndex > leftBracketIndex)
        if (pairRightBracketIndex != null) {
          const pairSequenceArray = tempComputeSequenceArray.filter((sequenceItem, sequenceItemIndex) =>
            sequenceItemIndex > leftBracketIndex && sequenceItemIndex < pairRightBracketIndex)
          const computed = this.computeSequenceByPriority(pairSequenceArray)
          tempComputeSequenceArray.splice(leftBracketIndex, pairRightBracketIndex, computed)
        }
      })

      const computed = this.computeSequenceByPriority(tempComputeSequenceArray)

      this.computed = parseFloat(computed.value)
    }
  }

  private validateBrackets (computeSequenceArray: computeSequenceType): boolean {
    const leftBracketsArray = computeSequenceArray.filter(computeItem => computeItem.value === '(')
    const rightBracketsArray = computeSequenceArray.filter(computeItem => computeItem.value === ')')
    return leftBracketsArray.length === rightBracketsArray.length
  }

  private computeSequenceByPriority (computeSequenceArray: computeSequenceType): { type: string, value: string } {
    const operationsArray = [operations.multiply, operations.divide, operations.minus, operations.plus]
    const mathComputeSequenceArray = [...computeSequenceArray]

    operationsArray.forEach(operationValue => {
      while (mathComputeSequenceArray.find(computeItem => computeItem.value === operationValue) != null) {
        mathComputeSequenceArray.forEach((item, index) => {
          if (item.value === operationValue) {
            const previousOperand = mathComputeSequenceArray[index - 1]
            const currentOperand = mathComputeSequenceArray[index + 1]
            const computed = this.copmuteTwoOperands(item.value,
              parseFloat(previousOperand.value),
              parseFloat(currentOperand.value))
            if (computed != null) {
              mathComputeSequenceArray.splice(index - 1, 3, { type: 'number', value: computed.toString() })
            }
          }
        })
      }
    })

    return mathComputeSequenceArray[0]
  }

  private copmuteTwoOperands (operation: string, previousOperand: number, currentOperand: number): number | null {
    switch (operation) {
      case operations.plus: return parseFloat((previousOperand + currentOperand).toFixed(10))
      case operations.minus: return parseFloat((previousOperand - currentOperand).toFixed(10))
      case operations.multiply: return parseFloat((previousOperand * currentOperand).toFixed(10))
      case operations.divide: if (currentOperand !== 0) return parseFloat((previousOperand / currentOperand).toFixed(10))
    }
    return null
  }
}
