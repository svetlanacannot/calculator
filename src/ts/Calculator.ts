export class Calculator{
    private currentOperationTextElement:Element;
    private previousOperationTextElement:Element;

    private previousOperand = '';
    private currentOperand = '';
    private operation = '';
    private computed:number|null = null;

    constructor(previousOperationTextElement:Element, currentOperationTextElement:Element){
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
    }

    public appendNumber(number:string){
        if(this.currentOperand == '0'){
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    public appendOperation(operand:string){
        if(this.computed == null){
            this.previousOperand = this.currentOperand;
        } else {
            this.previousOperand = this.computed?.toString();
            this.computed = null;
        }
        this.currentOperand = '';
        this.operation = operand;
    }

    public appendComma(){
        if(this.computed == null){
            if(this.currentOperand.charAt(this.currentOperand.length-1) != '.'){
                this.currentOperand += '.'
            }
        } else{
            this.currentOperand = this.computed.toString();
            if(this.currentOperand.charAt(this.currentOperand.length-1) != '.'){
                this.currentOperand += '.'
                this.computed = null;
            }
        }
    }

    public compute(){
        let previousOperand = parseFloat(this.previousOperand)
        let currentOperand = parseFloat(this.currentOperand)
        
        switch(this.operation){
            case '+': this.computed = previousOperand + currentOperand; break;
            case '-': this.computed = previousOperand - currentOperand; break;
            case '*': this.computed = previousOperand * currentOperand; break;
            case '÷': if(currentOperand != 0) { this.computed = previousOperand / currentOperand; }; 
        }

        this.previousOperand = '';
        this.operation = '';
    }

    public clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
        this.computed = null;
    }

    public updateScreen(){
        if(this.computed != null){
            this.previousOperationTextElement.innerHTML = this.currentOperationTextElement.innerHTML;
            this.currentOperationTextElement.innerHTML = "=" + this.computed;
        } else {
            if(this.currentOperand == '' && this.previousOperand != ''){
                this.previousOperationTextElement.innerHTML += '=' + this.previousOperand
            }

            if(this.previousOperand == ''){
                this.previousOperationTextElement.innerHTML = this.previousOperand
            }

            this.currentOperationTextElement.innerHTML = this.previousOperand + this.operation + this.currentOperand;
        }
    }
}