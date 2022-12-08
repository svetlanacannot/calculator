export type computeSequenceType = Array<{ type: string, value: string }>
export enum operations {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '÷'
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

  public appendComma (): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]

    if (lastOperand?.type === 'number' && lastOperand?.value.charAt(lastOperand?.value?.length - 1) !== '.') {
      lastOperand.value += '.'
    }
  }

  public changeLastOperandToPercent (): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1]
    const previousOperand = this.computeSequenceArray[this.computeSequenceArray.length - 3]

    if (lastOperand?.type === 'number') {
      lastOperand.value = (parseFloat(previousOperand.value) * parseFloat(lastOperand.value) / 100).toString()
    }
  }

  public compute (): void {
    if (this.computed === null) {
      if (this.computeSequenceArray.length !== 0) {
        this.previousComputeSequenceArray = this.computeSequenceArray
        this.computed = parseFloat(this.computeSequenceByPriority(this.computeSequenceArray).value)
        this.computeSequenceArray = new Array({ type: 'number', value: this.computed.toString() })
      }
    } else {
      this.previousComputeSequenceArray.push({ type: 'operation', value: '=' }, { type: 'number', value: this.computed.toString() })
      this.computeSequenceArray = []
      this.computed = null
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
      this.computeSequenceArray.pop()
    }
  }

  private computeSequenceByPriority (computeSequenceArray: computeSequenceType): { type: string, value: string } {
    const operationsArray = [operations.multiply, operations.divide, operations.minus, operations.plus]
    const mathComputeSequenceArray = [...computeSequenceArray]

    operationsArray.forEach(operationValue => {
      while (mathComputeSequenceArray.find(computeItem => computeItem.value === operationValue) != null) {
        mathComputeSequenceArray.forEach((item, index) => {
          if (item.value === operationValue) {
            const operation = item
            const previousOperand = mathComputeSequenceArray[index - 1]
            const currentOperand = mathComputeSequenceArray[index + 1]
            const computed = this.copmuteTwoOperands(operation.value,
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
      case operations.divide: if (currentOperand !== 0) { return parseFloat((previousOperand / currentOperand).toFixed(10)) };
    }
    return null
  }
}
