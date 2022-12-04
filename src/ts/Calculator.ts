export class Calculator{
    private currentOperationTextElement:Element;
    private previousOperationTextElement:Element;
    private previousOperands:Array<{type:string, value:string}> = new Array();
    private operands:Array<{type:string, value:string}> = new Array();
    private computed:number|null = null;

    constructor(previousOperationTextElement:Element, currentOperationTextElement:Element){
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
    }

    public appendNumber(number:string){
        let lastOperand = this.operands[this.operands.length - 1];

        if(lastOperand?.type === 'number'){
            lastOperand.value += number
        } else {
            if(this.operands.length === 1 && lastOperand.value === '-'){
                lastOperand.type = 'number';
                lastOperand.value += number;
            } else {
                this.operands.push({type: 'number', value: number})
            }
        }
    }

    public appendOperation(operand:string){
        let lastOperand = this.operands[this.operands.length - 1];
        this.computed = null
        if(lastOperand?.type === 'operation'){
            lastOperand.value = operand
        } else {
            this.operands.push({type: 'operation', value: operand})
        }
    }

    public appendComma(){
        let lastOperand = this.operands[this.operands.length - 1]
        if(lastOperand?.type === 'number' && lastOperand?.value.charAt(lastOperand?.value?.length-1) != '.'){
            lastOperand.value += '.'
        }
    }

    public compute(){
        let previousOperand:number|null = null;
        let currentOperand:number|null = null;
        let operation:string|null = null;
        let computed:number|null = null;

        this.operands.forEach(({type, value}) => {
            if(type === 'number'){
                if(previousOperand === null) previousOperand = parseFloat(value);
                else if (currentOperand === null) currentOperand = parseFloat(value);
            } else {
                if(operation === null) operation = value;
            }

            if(computed === null
                && previousOperand !== null
                && currentOperand !== null
                && operation !== null){
                    switch(operation){
                        case '+': computed = parseFloat((previousOperand + currentOperand).toFixed(10)); break;
                        case '-': computed = parseFloat((previousOperand - currentOperand).toFixed(10)); break;
                        case '*': computed = parseFloat((previousOperand * currentOperand).toFixed(10)); break;
                        case '÷': if(currentOperand != 0) { computed = parseFloat((previousOperand / currentOperand).toFixed(10)); }; 
                    }

                previousOperand = computed;
                currentOperand = null;
                operation = null;
                computed = null;
            }
        })

        this.computed = previousOperand;
        if(previousOperand !== null){
            this.previousOperands = this.operands;
            this.operands = new Array({type: 'number', value: previousOperand.toString()})
        }
    }

    public clear(){
        this.operands = new Array();
        this.computed = null;
    }

    public updateScreen(){
        this.previousOperationTextElement.innerHTML = this.previousOperands.map(operand => operand.value).join('');
        this.currentOperationTextElement.innerHTML = this.operands.map(operand => operand.value).join('')
        if(this.computed != null){
            this.previousOperationTextElement.innerHTML = this.previousOperands.map(operand => operand.value).join('');
            this.currentOperationTextElement.innerHTML = '=' + this.computed;
            this.previousOperands.push({type: 'operation', value: '='}, {type: 'number', value: this.computed.toString()})
        }
    }
}