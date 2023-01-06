export interface ComputeSequenceType { type: string, value: string }
export interface JsonBtnType {
  type: string;
  tagName: string;
  class: string;
  id: null | string;
  innerText: string;
}

export interface ScreenElements {
  screenElement: HTMLElement,
  previousTextElement: HTMLElement,
  currentTextElement: HTMLElement,
  infoTextElement: HTMLElement
}

export interface KeyboardPartials {
  keyboard: HTMLElement,
  buttonsJson: JsonBtnType[],
  buttonsToExpand: NodeListOf<HTMLButtonElement>
}
