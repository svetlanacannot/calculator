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
      ? parseFloat((previousOperand / currentOperand).toFixed(10)) : null;
    default: return null;
  }
}

export function computeSequenceByPriority(computeSequenceArray: ComputeSequenceType[]): ComputeSequenceType {
  const operationsArray = [Operations.MULTIPLY, Operations.DIVIDE, Operations.MINUS, Operations.PLUS];
  const mathComputeSequenceArray = [...computeSequenceArray];

  operationsArray.forEach((operationValue) => {
    while (mathComputeSequenceArray.find((computeItem) => computeItem.value === operationValue) != null) {
      mathComputeSequenceArray.forEach((item, index) => {
        if (item.value === operationValue) {
          const previousOperand = mathComputeSequenceArray[index - 1];
          const currentOperand = mathComputeSequenceArray[index + 1];
          const computed = computeTwoOperands(
            item.value,
            parseFloat(previousOperand.value),
            parseFloat(currentOperand.value),
          );
          if (computed != null) {
            mathComputeSequenceArray.splice(index - 1, 3, { type: SequenceItems.NUMBER, value: computed.toString() });
          }
        }
      });
    }
  });

  return mathComputeSequenceArray[0];
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
    const computed = computeSequenceByPriority(pairSequenceArray);
    tempComputeSequenceArray.splice(leftBracketIndex, pairRightBracketIndex, computed);
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
