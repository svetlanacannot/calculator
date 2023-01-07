import {
  Brackets, Operations, SequenceItems,
} from './interfaces/enums';
import { ComputeSequenceType } from './interfaces/types';

export function validateBrackets(computeSequenceArray: ComputeSequenceType[]): boolean {
  const leftBracketsArray = computeSequenceArray.filter((computeItem) => computeItem.value === Brackets.LEFT);
  const rightBracketsArray = computeSequenceArray.filter((computeItem) => computeItem.value === Brackets.RIGHT);
  return leftBracketsArray.length === rightBracketsArray.length;
}

export function computeTwoOperands(operation: string, previousOperand: number, currentOperand: number): number | null {
  switch (operation) {
    case Operations.PLUS: return parseFloat((previousOperand + currentOperand).toFixed(10));
    case Operations.MINUS: return parseFloat((previousOperand - currentOperand).toFixed(10));
    case Operations.MULTIPLY: return parseFloat((previousOperand * currentOperand).toFixed(10));
    case Operations.DIVIDE: return currentOperand !== 0
      ? parseFloat((previousOperand / currentOperand).toFixed(10))
      : null;
    case Operations.POWER: {
      let tempComputed = previousOperand;
      for (let i = 1; i <= currentOperand - 1; i += 1) {
        tempComputed *= previousOperand;
      }
      return tempComputed;
    }
    default: return null;
  }
}

export function computeSequenceByPriority(computeSequenceArray: ComputeSequenceType[]): ComputeSequenceType {
  const operationsArray = [Operations.POWER, Operations.MULTIPLY, Operations.DIVIDE, Operations.MINUS, Operations.PLUS];
  const tempSequenceArray = [...computeSequenceArray];

  operationsArray.forEach((operationValue) => {
    while (tempSequenceArray.find((computeItem) => computeItem.value === operationValue) != null) {
      tempSequenceArray.forEach((item, index) => {
        if (item.value === operationValue) {
          const previousOperand = tempSequenceArray[index - 1];
          const currentOperand = tempSequenceArray[index + 1];
          const computed = computeTwoOperands(
            item.value,
            parseFloat(previousOperand.value),
            parseFloat(currentOperand.value),
          );
          if (computed != null) {
            tempSequenceArray.splice(index - 1, 3, { type: SequenceItems.NUMBER, value: computed.toString() });
          }
        }
      });
    }
  });

  return tempSequenceArray[0];
}

export function computeBracketsSequence(
  computeSequenceArray: ComputeSequenceType[],
  rightBracketsIndexesArray: number[] | null,
  leftBracketIndex: number,
): ComputeSequenceType[] {
  const tempComputeSequenceArray = [...computeSequenceArray];
  const pairRightBracketIndex: null | number = rightBracketsIndexesArray?.find(
    (rightBracketIndex) => rightBracketIndex > leftBracketIndex,
  ) ?? null;
  if (pairRightBracketIndex !== null) {
    const pairSequenceArray = tempComputeSequenceArray.filter(
      (_sequenceItem, sequenceItemIndex) => sequenceItemIndex > leftBracketIndex
      && sequenceItemIndex < pairRightBracketIndex,
    );
    const computed = pairSequenceArray.length !== 1
      ? computeSequenceByPriority(pairSequenceArray)
      : { type: 'number', value: pairSequenceArray[0].value };

    if (tempComputeSequenceArray[leftBracketIndex - 2].type === SequenceItems.NUMBER) {
      if (tempComputeSequenceArray[leftBracketIndex - 1].type !== SequenceItems.OPERATION) {
        tempComputeSequenceArray.splice(
          leftBracketIndex - 1,
          0,
          { type: SequenceItems.OPERATION, value: Operations.MULTIPLY },
        );
      }
      tempComputeSequenceArray.splice(
        leftBracketIndex + 1,
        pairRightBracketIndex,
        computed,
      );
    } else {
      tempComputeSequenceArray.splice(leftBracketIndex - 1, pairRightBracketIndex, computed);
    }

    if (tempComputeSequenceArray[leftBracketIndex - 1]?.value === Operations.ROOT
      || tempComputeSequenceArray[leftBracketIndex - 1]?.value === Operations.POWER) {
      tempComputeSequenceArray.splice(leftBracketIndex, 1);
    }
  }

  return tempComputeSequenceArray;
}

export function createCustomElement(
  tagName: string,
  className: string | null = null,
  id: string | null = null,
  innerText: string | null = null,
): HTMLElement {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (id) element.id = id;
  if (innerText) element.innerText = innerText;

  return element;
}
