export type computeSequenceType = Array<{ type: string, value: string }>
export enum operations {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '÷',
  leftRoundBracket = '(',
  rightRoundBracket = ')'
};
export class Calculator {
  private _previousComputeSequenceArray: computeSequenceType = []
  private _computeSequenceArray: computeSequenceType = []
  private _computed: number | null = null

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

    if (lastOperand?.type === 'number') {
      lastOperand.value += number
    } else {
      if (this.computeSequenceArray.length === 1 && lastOperand.value === '-') {
        lastOperand.type = 'number'
        lastOperand.value += number
      } else {
        this.computeSequenceArray.push({ type: 'number', value: number })
      }
    }
  }

  public appendOperation (operation: string): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]
    this.computed = null

    if (lastOperand?.type === 'operation') {
      lastOperand.value = operation
    } else {
      this.computeSequenceArray.push({ type: 'operation', value: operation })
    }
  }

  public appendComma (): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]

    if (lastOperand?.type === 'number' && lastOperand?.value.charAt(lastOperand?.value?.length - 1) !== '.') {
      lastOperand.value += '.'
    }
  }

  public compute (): void {
    let previousOperand: number | null = null
    let currentOperand: number | null = null
    let operation: string | null = null
    let computed: number | null = null

    this.computeSequenceArray.forEach(({ type, value }) => {
      if (type === 'number') {
        if (previousOperand === null) previousOperand = parseFloat(value)
        else if (currentOperand === null) currentOperand = parseFloat(value)
      } else {
        if (operation === null) operation = value
      }
    })

    if (computed === null && previousOperand !== null && currentOperand !== null && operation !== null) {
      computed = parseFloat(this.computeSequenceByPriority(this.computeSequenceArray).value)

      currentOperand = null
      operation = null
    }

    this.computed = computed

    if (computed !== null) {
      this.previousComputeSequenceArray = this.computeSequenceArray
      if (this.computed != null) {
        this.previousComputeSequenceArray.push({ type: 'operation', value: '=' }, { type: 'number', value: this.computed.toString() })
      }

      this.computeSequenceArray = new Array({ type: 'number', value: computed.toString() })
    }
  }

  public clear (): void {
    this.computeSequenceArray = []
    this.computed = null
  }

  private computeSequenceByPriority (computeSequenceArray: computeSequenceType): { type: string, value: string } {
    const operationsArray = [operations.multiply, operations.divide, operations.minus, operations.plus]

    operationsArray.forEach(operationValue => {
      while (computeSequenceArray.find(computeItem => computeItem.value === operationValue) != null) {
        computeSequenceArray.forEach((item, index) => {
          if (item.value === operationValue) {
            const operation = item
            const previousOperand = computeSequenceArray[index - 1]
            const currentOperand = computeSequenceArray[index + 1]
            const computed = this.copmuteTwoOperands(operation.value, parseFloat(previousOperand.value), parseFloat(currentOperand.value))
            if (computed != null) {
              computeSequenceArray.splice(index - 1, 3, { type: 'number', value: computed.toString() })
            }
          }
        })
      }
    })

    return computeSequenceArray[0]
  }

  private copmuteTwoOperands (operation: string, previousOperand: number, currentOperand: number): number | null {
    switch (operation) {
      case operations.plus: return parseFloat((previousOperand + currentOperand).toFixed(10))
      case operations.minus: return parseFloat((previousOperand - currentOperand).toFixed(10))
      case operations.multiply: return parseFloat((previousOperand * currentOperand).toFixed(10))
      case operations.divide: if (currentOperand !== 0) { return parseFloat((previousOperand / currentOperand).toFixed(10)) };
    }
    return null
  }
}
