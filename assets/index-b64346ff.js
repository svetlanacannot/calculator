var f=Object.defineProperty;var B=(e,t,n)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var l=(e,t,n)=>(B(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))o(u);new MutationObserver(u=>{for(const r of u)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(u){const r={};return u.integrity&&(r.integrity=u.integrity),u.referrerpolicy&&(r.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?r.credentials="include":u.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(u){if(u.ep)return;u.ep=!0;const r=n(u);fetch(u.href,r)}})();var c=(e=>(e.MULTIPLY="*",e.DIVIDE="\xF7",e.PLUS="+",e.MINUS="-",e))(c||{}),p=(e=>(e.COMMA=",",e.PERCENT="%",e.EQUALS="=",e.ENTER="Enter",e.DELETE="Backspace",e))(p||{}),b=(e=>(e.LEFT="(",e.RIGHT=")",e))(b||{}),i=(e=>(e.NUMBER="number",e.OPERATION="operation",e.BRACKET="bracket",e.EQUALS="equals",e))(i||{}),s=(e=>(e.NUMBER_BUTTON="numberButton",e.OPERATION_BUTTON="operationButton",e.DELETE_BUTTON="deleteButton",e.ALL_CLEAR_BUTTON="allClearButton",e.EQUALS_BUTTON="equalsButton",e.PERCENT_BUTTON="percentButton",e.COMMA_BUTTON="commaButton",e.EXPAND_BUTTON="expandButton",e.BRACKET_BUTTON="bracketButton",e))(s||{}),g=(e=>(e.ZERO="0",e.ONE="1",e.TWO="2",e.THREE="3",e.FOUR="4",e.FIVE="5",e.SIX="6",e.SEVEN="7",e.EIGHT="8",e.NINE="9",e))(g||{});function N(e,t,n,o){n.forEach((u,r)=>{u.addEventListener("click",()=>{switch(o[r].type){case s.EXPAND_BUTTON:t.expandKeyboard();break;case s.ALL_CLEAR_BUTTON:e.clear();break;case s.DELETE_BUTTON:e.deleteLast();break;case s.EQUALS_BUTTON:e.compute();break;case s.COMMA_BUTTON:e.appendComma();break;case s.PERCENT_BUTTON:e.changeLastOperandToPercent();break;case s.NUMBER_BUTTON:{u.textContent!==null&&e.appendNumber(u.textContent);break}case s.OPERATION_BUTTON:{u.textContent!==null&&e.appendOperation(u.textContent);break}case s.BRACKET_BUTTON:{u.textContent!==null&&e.appendBracket(u.textContent);break}}o[r].type!==s.EXPAND_BUTTON&&t.updateScreen(e.getPreviousComputeSequenceArray(),e.getComputeSequenceArray(),e.getComputed())})})}function v(e,t){document.addEventListener("keydown",n=>{const o={numbers:Object.values(g),operations:Object.values(c),brackets:Object.values(b),equals:[p.EQUALS,p.ENTER],comma:p.COMMA,percent:p.PERCENT,delete:p.DELETE};o.numbers.includes(n.key)?e.appendNumber(n.key):o.operations.includes(n.key)?e.appendOperation(n.key):o.equals.includes(n.key)?e.compute():o.brackets.includes(n.key)?e.appendBracket(n.key):n.key===o.comma?e.appendComma():n.key===o.delete?e.deleteLast():n.key===o.percent&&e.changeLastOperandToPercent(),t.updateScreen(e.getPreviousComputeSequenceArray(),e.getComputeSequenceArray(),e.getComputed())})}function S(e){const t=e.filter(o=>o.value===b.LEFT),n=e.filter(o=>o.value===b.RIGHT);return t.length===n.length}function x(e,t,n){switch(e){case c.PLUS:return parseFloat((t+n).toFixed(10));case c.MINUS:return parseFloat((t-n).toFixed(10));case c.MULTIPLY:return parseFloat((t*n).toFixed(10));case c.DIVIDE:return n!==0?parseFloat((t/n).toFixed(10)):null;default:return null}}function A(e){const t=[c.MULTIPLY,c.DIVIDE,c.MINUS,c.PLUS],n=[...e];return t.forEach(o=>{for(;n.find(u=>u.value===o)!=null;)n.forEach((u,r)=>{if(u.value===o){const a=n[r-1],m=n[r+1],h=x(u.value,parseFloat(a.value),parseFloat(m.value));h!=null&&n.splice(r-1,3,{type:i.NUMBER,value:h.toString()})}})}),n[0]}function C(e,t,n){var r;const o=[...e],u=(r=t==null?void 0:t.find(a=>a>n))!=null?r:null;if(u!==null){const a=o.filter((h,y)=>y>n&&y<u),m=A(a);o.splice(n,u,m)}return o}function d(e,t=null,n=null,o=null){const u=document.createElement(e);return t&&(u.className=t),n&&(u.id=n),o&&(u.innerText=o),u}class q{constructor(){l(this,"previousComputeSequenceArray",Array());l(this,"computeSequenceArray",Array());l(this,"computed",null)}getPreviousComputeSequenceArray(){return this.previousComputeSequenceArray}getComputeSequenceArray(){return this.computeSequenceArray}getComputed(){return this.computed}appendNumber(t){const n=this.computeSequenceArray[this.computeSequenceArray.length-1];(n==null?void 0:n.value.length)>19||(n==null||n.type===i.OPERATION||n.type===i.BRACKET?this.computeSequenceArray.push({type:i.NUMBER,value:t}):(n.type===i.NUMBER||this.computeSequenceArray.length===1&&n.value===c.MINUS)&&(n.type=i.NUMBER,n.value+=t))}appendOperation(t){this.computed!==null&&this.previousComputeSequenceArray.push({type:i.EQUALS,value:p.EQUALS},{type:i.NUMBER,value:this.computed.toString()});const n=this.computeSequenceArray[this.computeSequenceArray.length-1];this.computed=null,(n==null?void 0:n.type)===i.OPERATION?n.value=t:this.computeSequenceArray.push({type:i.OPERATION,value:t})}appendBracket(t){this.computeSequenceArray.push({type:i.BRACKET,value:t})}appendComma(){const t=this.computeSequenceArray[this.computeSequenceArray.length-1];(t==null?void 0:t.type)===i.NUMBER&&(t==null?void 0:t.value.charAt(t.value.length-1))!=="."&&(t.value+=".")}changeLastOperandToPercent(){const t=this.computeSequenceArray[this.computeSequenceArray.length-1],n=this.computeSequenceArray[this.computeSequenceArray.length-3];(t==null?void 0:t.type)===i.NUMBER&&n!=null&&(t.value=(parseFloat(n.value)*parseFloat(t.value)/100).toString())}clear(){this.computeSequenceArray.length===0?this.previousComputeSequenceArray=[]:this.computed!=null&&this.previousComputeSequenceArray.push({type:i.EQUALS,value:p.EQUALS},{type:i.NUMBER,value:this.computed.toString()}),this.computeSequenceArray=[],this.computed=null}deleteLast(){if(this.computeSequenceArray.length===0)this.previousComputeSequenceArray=[];else{const t=this.computeSequenceArray.length-1,n=this.computeSequenceArray[t].value;this.computeSequenceArray[t].value=n.slice(0,-1),this.computeSequenceArray[t].value===""&&this.computeSequenceArray.pop()}}compute(){var t,n;if(this.computed!==null){this.moveComputedToPreviousSequence(this.computed.toString());return}if(this.computeSequenceArray.length!==0){if(this.previousComputeSequenceArray=this.computeSequenceArray,!S(this.computeSequenceArray)){this.computeSequenceArray=[{type:"exception",value:"Brackets are not closed"}];return}const o=(t=this.computeSequenceArray.map((a,m)=>a.value===b.LEFT?m:null))==null?void 0:t.filter(a=>a!==null),u=(n=this.computeSequenceArray.map((a,m)=>a.value===b.RIGHT?m:null))==null?void 0:n.filter(a=>a!==null);o==null||o.reverse().forEach(a=>{this.computeSequenceArray=C(this.computeSequenceArray,u,a)});const r=A(this.computeSequenceArray);this.computed=parseFloat(r.value)}}moveComputedToPreviousSequence(t){this.previousComputeSequenceArray.push({type:i.EQUALS,value:p.EQUALS},{type:i.NUMBER,value:t}),this.computeSequenceArray=[],this.computed=null}}class U{constructor(t,n){l(this,"root");l(this,"calculatorElement");l(this,"previousOperationTextElement");l(this,"currentOperationTextElement");l(this,"infoTextElement");l(this,"screenElement");l(this,"keyboardElement");l(this,"buttonsJson");l(this,"buttonElements",[]);l(this,"buttonsToExpand",[]);this.root=t,this.calculatorElement=d("div","calculator"),this.screenElement=d("div","screen","screen"),this.previousOperationTextElement=d("div","screen__previous","previousText"),this.currentOperationTextElement=d("div","screen__current","currentText"),this.infoTextElement=d("div","screen__info","infoText"),this.keyboardElement=d("div","keyboard","keyboard"),this.buttonsJson=n}getButtonElements(){return this.buttonElements}getButtonsToExpand(){return this.buttonsToExpand}updateScreen(t,n,o){this.previousOperationTextElement.innerText=t.map(u=>u.value).join(""),this.currentOperationTextElement.innerText=n.map(u=>u.value).join(""),o!=null&&(this.previousOperationTextElement.innerText=t.map(u=>u.value).join(""),this.currentOperationTextElement.innerText=`=${o}`),this.currentOperationTextElement.scrollWidth>this.screenElement.scrollWidth&&(this.currentOperationTextElement.style.fontSize="2rem")}expandKeyboard(){var t;(t=this.buttonsToExpand)==null||t.forEach(n=>{n.style.display==="block"?n.style.display="none":n.style.display="block"})}buildUI(){this.root.appendChild(this.calculatorElement),this.calculatorElement.appendChild(this.screenElement),this.calculatorElement.appendChild(this.keyboardElement),this.screenElement.appendChild(this.previousOperationTextElement),this.screenElement.appendChild(this.currentOperationTextElement),this.screenElement.appendChild(this.infoTextElement),this.buttonsJson.forEach(t=>{const n=d(t.tagName,t.class,t.id,t.innerText);this.keyboardElement.appendChild(n),this.buttonElements.push(n),t.class.includes("button--expanded")&&this.buttonsToExpand.push(n)})}}const E=[{type:"bracketButton",tagName:"button",class:"button button--orange button--expanded bracketButton",id:null,innerText:"("},{type:"bracketButton",tagName:"button",class:"button button--orange button--expanded bracketButton",id:null,innerText:")"},{type:"operationButton",tagName:"button",class:"button button--orange operation button--expanded",id:null,innerText:"\u221A"},{type:"operationButton",tagName:"button",class:"button button--orange operation button--expanded",id:null,innerText:"^"},{type:"allClearButton",tagName:"button",class:"button button--muted button--portrait allClearButton",id:null,innerText:"AC"},{type:"deleteButton",tagName:"button",class:"button button--muted  button--portrait deleteButton",id:null,innerText:"D"},{type:"percentButton",tagName:"button",class:"button button--orange button--portrait percentButton",id:null,innerText:"%"},{type:"operationButton",tagName:"button",class:"button button--orange operation  button--portrait",id:null,innerText:"\xF7"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"7"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"8"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"9"},{type:"operationButton",tagName:"button",class:"button button--orange operation",id:null,innerText:"*"},{type:"bracketButton",tagName:"button",class:"button button--orange button--landscape bracketButton",id:null,innerText:"("},{type:"allClearButton",tagName:"button",class:"button button--muted button--landscape allClearButton",id:null,innerText:"AC"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"4"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"5"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"6"},{type:"operationButton",tagName:"button",class:"button button--orange operation",id:null,innerText:"-"},{type:"bracketButton",tagName:"button",class:"button button--orange button--landscape bracketButton",id:null,innerText:")"},{type:"deleteButton",tagName:"button",class:"button button--muted button--landscape deleteButton",id:null,innerText:"D"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"1"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"2"},{type:"numberButton",tagName:"button",class:"button number",id:null,innerText:"3"},{type:"operationButton",tagName:"button",class:"button button--orange operation",id:null,innerText:"+"},{type:"operationButton",tagName:"button",class:"button button--orange button--landscape operation",id:null,innerText:"\u221A"},{type:"percentButton",tagName:"button",class:"button button--orange button--landscape percentButton",id:null,innerText:"%"},{type:"expandButton",tagName:"button",class:"button button--pressed-in button--portrait",id:"expandKeyboardButton",innerText:"\u21D4"},{type:"numberButton",tagName:"button",class:"button button--wide-on-landscape button--pressed-in-on-landscape number",id:null,innerText:"0"},{type:"commaButton",tagName:"button",class:"button",id:"commaButton",innerText:"."},{type:"operationButton",tagName:"button",class:"button button--orange operation  button--landscape",id:null,innerText:"\xF7"},{type:"operationButton",tagName:"button",class:"button button--orange button--landscape operation",id:null,innerText:"^"},{type:"equalsButton",tagName:"button",class:"button button--orange",id:"equalsButton",innerText:"="}];const T=document.getElementById("root");if(T!==null){const e=new q,t=new U(T,E);t.buildUI(),N(e,t,t.getButtonElements(),E),v(e,t)}