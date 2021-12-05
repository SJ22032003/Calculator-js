const calculatorDisplay = document.querySelector('h1');
const inputBtns  =document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const loader = document.getElementById('loader');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Calucate first and second value on operator
const calculate = {
    '/':(firstNumber , secondNumber) => firstNumber/secondNumber,
    '*':(firstNumber , secondNumber) => firstNumber*secondNumber,
    '+':(firstNumber , secondNumber) => firstNumber+secondNumber,
    '-':(firstNumber , secondNumber) => firstNumber-secondNumber,
    '=':(firstNumber , secondNumber) => secondNumber,
}

// functionss----------------

function sendNumberValue(number){
    //Replace current display value if first value is entered
    if(awaitingNextValue === true){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else{
        calculatorDisplay.textContent = calculatorDisplay.textContent === '0' ? number : calculatorDisplay.textContent += number;
    }
}
function addDecimal(){
    // if operator pressed , dont add decimmal
    if(awaitingNextValue){
        return;  
    }
    //If no decimal , add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}



function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent Multiple operator
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return
    };
    // Assign FirstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    } else{
        const calculation = calculate[operatorValue](firstValue , currentValue);
        calculatorDisplay.classList.add('animate__animated', 'animate__zoomIn');
        calculatorDisplay.textContent = calculation;
        setTimeout(() => {
            calculatorDisplay.classList.remove('animate__animated', 'animate__zoomIn');
        },800)
        firstValue = calculation;
    }

    //Next value
    awaitingNextValue = true;
    operatorValue = operator;
}



//Reset display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.classList.add('animate__animated', 'animate__zoomOut')
    calculatorDisplay.textContent = '0';
    setTimeout(()=>{
        calculatorDisplay.classList.remove('animate__animated', 'animate__zoomOut')
    },150)
}

//event Listner---------------------

//Add event listners for number , ops, decimal

inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){   // numbers doesnt have any classes assign to them
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } 
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))  
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal())  
    }
});

// clearbtn
clearBtn.addEventListener('click', resetAll);

//window
window.onload= function(){
    loader.hidden = false;
    setTimeout(() => {
        loader.hidden = true;
    },2000);
};