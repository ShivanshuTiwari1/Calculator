//global variables
let op1="";
let operator="";
let takingOp1 = true;
let op2="";
let runningResult=null;
let displayValue = "";
let decimal = false;

//Make sure input is valid
function add(a, b)
{
    return a+b;
    
}

//Make sure input is valid
function subtract(a, b)
{
    return (a-b);
}

//Make sure input is valid
function multiply(a, b)
{
    return a*b;
}

//Make sure input is valid
function divide(a, b)
{
    if(b == 0)
        return "Divide by zero error!";
    else
        return a/b;
}

function operate(op1, op, op2)
{
    if(op == '+')
        return add(op1, op2);
    else if(op == '-')
        return subtract(op1, op2);
    else if(op == '*')
        return multiply(op1, op2);
    else if(op == '/')
        return divide(op1, op2);
}
function updateDisplay()
{
    let display = document.querySelector('#show');
    display.textContent = displayValue;
}
function numOpClick() //works with num and op keys
{
    //Could be a number or an operator
    let cname = this.getAttribute('class');
    
    if(cname == "num")
    {
        if(!(this.textContent == '.' && decimal == true))
            displayValue += this.textContent;
        /*Possibilities - 
        1.) first left operand
        2.) right operand
        */
       if(takingOp1 == true) //The number entered is a very first input
       {
           if(op1 == "")
                displayValue = this.textContent;
           if(this.textContent == '.') 
           {
                if(decimal == false)
                {
                    op1 += this.textContent;
                    decimal = true;
                }
                
           }
           else
                op1 += this.textContent;
       }
       else
       {
           if(op2 == "")
            displayValue = this.textContent;
            if(this.textContent == '.') 
           {
                if(decimal == false)
                {
                    op2 += this.textContent;
                    decimal = true;
                }
                
           }
           else
                op2 += this.textContent;
       }
    }
    else
    {
        //an operator is pressed
        /*Possibilities - 
        1.) runningValue is empty that means its a first operation
        2.) runningValue is non-empty, meaning we need to evaluate previous expression value.
        */
        if(op2 == "")
        {
            operator = this.textContent;
            takingOp1 = false;
        }
        else
        {
            runningResult = operate(parseFloat(op1), operator, parseFloat(op2));
            runningResult = Math.round((runningResult + Number.EPSILON) * 1000000) / 1000000;
            op1 = runningResult.toString();
            op2 = "";
            operator = this.textContent;
            displayValue = runningResult;
        }
        decimal = false;
    }
    updateDisplay();

}

function otherKeyClick()
{
    if(this.textContent == "=")
    {
        if(op1 != "" && operator != "" && op2 != "")
        {
            runningResult = operate(parseFloat(op1), operator, parseFloat(op2));
            runningResult = Math.round((runningResult + Number.EPSILON) * 1000000) / 1000000;
            op1 = runningResult.toString();
            op2 = "";
            operator = "";
            displayValue = runningResult;
            
        }
        else
        {
            displayValue = "Invalid Operation! Check inputs and order.";   
        }
    }
    else //clear
    {
        op1="";
        operator="";
        takingOp1 = true;
        op2="";
        runningResult=null;
        displayValue="";
    }
    updateDisplay();
}

// adding event listeners to keys
const numOps = document.querySelectorAll(".num, .op");

numOps.forEach(num => {
    num.addEventListener('click', numOpClick);
});

const otherkeys = document.querySelectorAll(".other");
otherkeys.forEach(key => {
    key.addEventListener('click', otherKeyClick);
});

//adding keyboard support

document.addEventListener('keydown', (event) => {
    let keyPressed = event.key;
    let numId = "num"+keyPressed;
    let numEle = document.getElementById(numId);
    if(numEle !== null) //if number key is pressed
    {
        numEle.click();
    }
    else if(keyPressed == ".")
    {
        document.getElementById('period').click();
    }
    else if(keyPressed == "+")
    {
        document.getElementById('sum').click();
    }
    else if(keyPressed == "-")
    {
        document.getElementById('sub').click();
    }
    else if(keyPressed == "*")
    {
        document.getElementById('mul').click();
    }
    else if(keyPressed == "/")
    {
        document.getElementById('div').click();
    }
    else if(keyPressed == "Enter")
    {
        document.getElementById('Enter').click();
    }
    
    
    
    
});