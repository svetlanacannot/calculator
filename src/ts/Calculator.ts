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

      if (computed === null &&
                previousOperand !== null &&
                currentOperand !== null &&
                operation !== null) {
        switch (operation) {
          case operations.plus: computed = parseFloat((previousOperand + currentOperand).toFixed(10)); break
          case operations.minus: computed = parseFloat((previousOperand - currentOperand).toFixed(10)); break
          case operations.multiply: computed = parseFloat((previousOperand * currentOperand).toFixed(10)); break
          case operations.divide: if (currentOperand !== 0) { computed = parseFloat((previousOperand / currentOperand).toFixed(10)) };
        }

        previousOperand = computed
        currentOperand = null
        operation = null
        computed = null
      }
    })

    this.computed = previousOperand

    if (previousOperand !== null) {
      this.previousComputeSequenceArray = this.computeSequenceArray
      this.computeSequenceArray = new Array({ type: 'number', value: (previousOperand as number).toString() })
      if (this.computed != null) {
        this.previousComputeSequenceArray.push({ type: 'operation', value: '=' }, { type: 'number', value: (this.computed as number).toString() })
      }
    }
  }

  public clear (): void {
    this.computeSequenceArray = []
    this.computed = null
  }
}
