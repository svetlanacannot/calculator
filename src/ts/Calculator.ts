import { computeBracketsSequence, computeSequenceByPriority, validateBrackets } from './helpers';
import { ComputeSequenceType } from './interfaces/types';
import {
  Brackets, Operations, SeparateButtonsKeys, SequenceItems,
} from './interfaces/enums';

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

  public appendOperation(operation: Operations): void {
    if (this.computed !== null) {
      this.previousComputeSequenceArray.push(
        { type: SequenceItems.EQUALS, value: SeparateButtonsKeys.EQUALS },
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
    if (operation === Operations.ROOT || operation === Operations.POWER) {
      this.computeSequenceArray.push({ type: SequenceItems.BRACKET, value: Brackets.LEFT });
    }
  }

  public appendBracket(bracket: string) {
    this.computeSequenceArray.push({ type: SequenceItems.BRACKET, value: bracket });
  }

  public appendComma() {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1];

    if (lastOperand?.type === SequenceItems.NUMBER
      && lastOperand?.value.charAt(lastOperand.value.length - 1) !== '.') {
      lastOperand.value += '.';
    }
  }

  public changeLastOperandToPercent() {
    const lastOperand = this.computeSequenceArray[this.computeSequenceArray.length - 1];
    const previousOperand = this.computeSequenceArray[this.computeSequenceArray.length - 3];

    if (lastOperand?.type === SequenceItems.NUMBER && previousOperand != null) {
      lastOperand.value = ((parseFloat(previousOperand.value) * parseFloat(lastOperand.value)) / 100).toString();
    }
  }

  public clear() {
    if (this.computeSequenceArray.length === 0) {
      this.previousComputeSequenceArray = [];
    } else if (this.computed != null) {
      this.previousComputeSequenceArray.push(
        { type: SequenceItems.EQUALS, value: SeparateButtonsKeys.EQUALS },
        { type: SequenceItems.NUMBER, value: this.computed.toString() },
      );
    }
    this.computeSequenceArray = [];
    this.computed = null;
  }

  public deleteLast() {
    if (this.computed !== null) {
      this.previousComputeSequenceArray.push(
        { type: SequenceItems.EQUALS, value: SeparateButtonsKeys.EQUALS },
        { type: SequenceItems.NUMBER, value: this.computed.toString() },
      );
      this.computed = null;
    }
    if (this.computeSequenceArray.length === 0) {
      this.previousComputeSequenceArray = [];
    } else {
      const computeSequenceArrayLastIndex = this.computeSequenceArray.length - 1;
      const valueOfLastElement = this.computeSequenceArray[computeSequenceArrayLastIndex].value;
      this.computeSequenceArray[computeSequenceArrayLastIndex].value = valueOfLastElement.slice(0, -1);
      if (this.computeSequenceArray[computeSequenceArrayLastIndex].value === '') {
        this.computeSequenceArray.pop();
      }
    }
  }

  public compute() {
    if (this.computed !== null) {
      this.moveComputedToPreviousSequence(this.computed.toString());
    }

    if (this.computeSequenceArray.length !== 0) {
      let tempSequenceArray: ComputeSequenceType[] = [];
      this.previousComputeSequenceArray = [...this.computeSequenceArray];

      if (!validateBrackets(this.computeSequenceArray)) {
        this.computeSequenceArray = [{ type: 'exception', value: 'Brackets are not closed' }];
      } else {
        const leftBracketsIndexesArray: Array<number> | null = this.computeSequenceArray
          .map((item, index) => (item.value === Brackets.LEFT ? index : null))
          ?.filter((item) => item !== null) as Array<number> | null;

        const rightBracketsIndexesArray: Array<number> | null = this.computeSequenceArray
          .map((item, index) => (item.value === Brackets.RIGHT ? index : null))
          ?.filter((item) => item !== null) as Array<number> | null;

        leftBracketsIndexesArray?.reverse().forEach((leftBracketIndex) => {
          tempSequenceArray = computeBracketsSequence(
            this.computeSequenceArray,
            rightBracketsIndexesArray,
            leftBracketIndex,
          );
        });

        const computed = computeSequenceByPriority(tempSequenceArray.length !== 0
          ? tempSequenceArray
          : this.computeSequenceArray);
        this.computed = parseFloat(computed.value);
        this.computeSequenceArray = [computed];
      }
    }
  }

  private moveComputedToPreviousSequence(computed: string): void {
    this.previousComputeSequenceArray.push(
      { type: SequenceItems.EQUALS, value: SeparateButtonsKeys.EQUALS },
      { type: SequenceItems.NUMBER, value: computed },
    );
    this.computeSequenceArray = [];
    this.computed = null;
  }
}
