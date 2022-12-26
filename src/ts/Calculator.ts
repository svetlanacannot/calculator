import { computeBracketsSequence, computeSequenceByPriority, validateBrackets } from './helpers';
import { ComputeSequenceType } from './interfaces/types';
import { Brackets, Operations, SequenceItems } from './interfaces/enums';

export default class Calculator {
  private previousComputeSequenceArray = Array<ComputeSequenceType>();

  private computeSequenceArray = Array<ComputeSequenceType>();

  private computed: number | null = null;

  public getPreviousComputeSequenceArray(): ComputeSequenceType[] {
    return this.previousComputeSequenceArray;
  }

  public getComputeSequenceArray(): ComputeSequenceType[] {
    return this.computeSequenceArray;
  }

  public getComputed(): number | null {
    return this.computed;
  }

  public appendNumber(number: string): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1];

    if (lastOperand?.value.length > 19) { return; }

    if (lastOperand == null
      || lastOperand.type === SequenceItems.OPERATION
      || lastOperand.type === SequenceItems.BRACKET) {
      this.computeSequenceArray.push({ type: SequenceItems.NUMBER, value: number });
    } else if (lastOperand.type === SequenceItems.NUMBER
      || (this.computeSequenceArray.length === 1
        && lastOperand.value === Operations.MINUS)) {
      lastOperand.type = SequenceItems.NUMBER;
      lastOperand.value += number;
    }
  }

  public appendOperation(operation: string): void {
    if (this.computed !== null) {
      this.previousComputeSequenceArray.push(
        { type: SequenceItems.OPERATION, value: Operations.EQUALS },
        { type: SequenceItems.NUMBER, value: this.computed.toString() },
      );
    }
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1];
    this.computed = null;

    if (lastOperand?.type === SequenceItems.OPERATION) {
      lastOperand.value = operation;
    } else {
      this.computeSequenceArray.push({ type: SequenceItems.OPERATION, value: operation });
    }
  }

  public appendBracket(bracket: string): void {
    this.computeSequenceArray.push({ type: SequenceItems.BRACKET, value: bracket });
  }

  public appendComma(): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1];

    if (lastOperand?.type === SequenceItems.NUMBER
      && lastOperand?.value.charAt(lastOperand.value.length - 1) !== '.') {
      lastOperand.value += '.';
    }
  }

  public changeLastOperandToPercent(): void {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1];
    const previousOperand = this.computeSequenceArray[this.computeSequenceArray.length - 3];

    if (lastOperand?.type === SequenceItems.NUMBER && previousOperand != null) {
      lastOperand.value = ((parseFloat(previousOperand.value) * parseFloat(lastOperand.value)) / 100).toString();
    }
  }

  public clear(): void {
    if (this.computeSequenceArray.length === 0) {
      this.previousComputeSequenceArray = [];
    } else if (this.computed != null) {
      this.previousComputeSequenceArray.push(
        { type: SequenceItems.OPERATION, value: Operations.EQUALS },
        { type: SequenceItems.NUMBER, value: this.computed.toString() },
      );
    }
    this.computeSequenceArray = [];
    this.computed = null;
  }

  public deleteLast(): void {
    const { computeSequenceArray } = this;
    if (computeSequenceArray.length !== 0) {
      const computeSequenceArrayLastIndex = computeSequenceArray.length - 1;
      computeSequenceArray[computeSequenceArrayLastIndex].value.slice(0, -1); // CHECK IF THIS WORKS
      if (computeSequenceArray[computeSequenceArrayLastIndex].value === '') {
        computeSequenceArray.pop();
      }
    }
  }

  public compute(): void {
    if (this.computed !== null) {
      this.moveComputedToPreviousSequence(this.computed.toString());
      return;
    }

    if (this.computeSequenceArray.length !== 0) {
      this.previousComputeSequenceArray = this.computeSequenceArray;

      if (!validateBrackets(this.computeSequenceArray)) {
        this.computeSequenceArray = [{ type: 'exception', value: 'Brackets are not closed' }];
        return;
      }

      const leftBracketsIndexesArray: Array<number> | null = this.computeSequenceArray
        .map((item, index) => (item.value === Brackets.LEFT ? index : null))
        ?.filter((item) => item !== null) as Array<number> | null;

      const rightBracketsIndexesArray: Array<number> | null = this.computeSequenceArray
        .map((item, index) => (item.value === Brackets.RIGHT ? index : null))
        ?.filter((item) => item !== null) as Array<number> | null;

      leftBracketsIndexesArray?.reverse().forEach((leftBracketIndex) => {
        computeBracketsSequence(this.computeSequenceArray, rightBracketsIndexesArray, leftBracketIndex);
      });

      const computed = computeSequenceByPriority(this.computeSequenceArray);
      this.computed = parseFloat(computed.value);
    }
  }

  private moveComputedToPreviousSequence(computed: string): void {
    this.previousComputeSequenceArray.push(
      { type: SequenceItems.OPERATION, value: Operations.EQUALS },
      { type: SequenceItems.NUMBER, value: computed },
    );
    this.computeSequenceArray = [];
    this.computed = null;
  }
}
