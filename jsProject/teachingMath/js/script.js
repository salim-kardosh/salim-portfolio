let result = 0;
let checkButton = document.getElementById('checkButton');
let randNum_1, randNum_2, operator;
let resultDiv = document.getElementById('forAnimate');
let resultArr = [];
let sum = 0;
function reloadPage() {
    window.location.reload(); 
  }

function startGameFunc() {
    let mathoperators = ["+", "-", "*", "/"];
    let numbersRange = document.getElementById('numbersRange').value;

    if (isNaN(numbersRange) || numbersRange === "") {
        alert("בחר טווח מספרים לפני תחילת המשחק");
        return;
    }

    if (numbersRange == 1) {
        randNum_1 = Math.floor(Math.random() * 10 + 1);
        randNum_2 = Math.floor(Math.random() * 10 + 1);
    } else if (numbersRange == 2) {
        randNum_1 = Math.floor(Math.random() * 100 + 1);
        randNum_2 = Math.floor(Math.random() * 100 + 1);
    } else if (numbersRange == 3) {
        randNum_1 = Math.floor(Math.random() * 1000 + 1);
        randNum_2 = Math.floor(Math.random() * 1000 + 1);
    }

    let numsContainer = document.getElementById('numsContainer');
    let addARow = document.getElementById('addARow');

    let getRandOperator = function (operators) {
        let choseOperatore = document.getElementById('choseOperatore').value;
        let OneMathOperator;

        switch (choseOperatore) {
            case "0":
                OneMathOperator = operators[Math.floor(Math.random() * operators.length)];
                break;
            case "1":
                OneMathOperator = "+";
                break;
            case "2":
                OneMathOperator = "-";
                break;
            case "3":
                OneMathOperator = "/";
                break;
            case "4":
                OneMathOperator = "*";
                break;
            default:
                OneMathOperator = operators[Math.floor(Math.random() * operators.length)];
                break;
        }
        return OneMathOperator;
    }

    operator = getRandOperator(mathoperators);

    function displayAndCalculate() {
        switch (operator) {
            case "+":
                result = randNum_1 + randNum_2;
                break;
            case "-":
                result = randNum_1 - randNum_2;
                break;
            case "*":
                result = randNum_1 * randNum_2;
                break;
            case "/":
                if (randNum_2 !== 0 && randNum_1 % randNum_2 === 0) {
                    result = randNum_1 / randNum_2;
                } else {
                    operator = getRandOperator(["+", "-", "*"]);
                    displayAndCalculate();
                }
                break;
            default:
                break;
        }
    }

    displayAndCalculate();
    numsContainer.innerHTML = `${randNum_1} ${operator} ${randNum_2}  = `;
}

checkButton.addEventListener('click', function () {
    let costumerAnswer = parseInt(document.getElementById('mainInput').value.replace(/[^0-9]/g, ''));
    console.log(costumerAnswer);
    

    if (isNaN(costumerAnswer)) {
        alert("לא ענית למשוואה !");
        return;
    }

    if (costumerAnswer === result) {
        addARow.innerHTML += `
            <tr>
                <td>${randNum_1} ${operator} ${randNum_2}</td>
                <td style="direction: ltr;">${result}</td>
                <td style="direction: ltr;">${costumerAnswer}</td>
                <td>10</td>
            </tr>
        `;
        document.getElementById('mainInput').value = '';
        resultDiv.textContent = 'Correct! 😀';
        resultDiv.classList.add('animate__bounceIn', 'animate__animated');
        setTimeout(() => {
            resultDiv.classList.remove('animate__bounceIn', 'animate__animated');
            resultDiv.textContent = '';
        }, 3000);
        resultArr.push(parseInt(10));
        console.log(resultArr);
        if (resultArr.length < 10){
            startGameFunc();
        }else{
           
         sum = resultArr.reduce((accumulator, currentValue) =>{
                return accumulator + currentValue;
            },0)
           
            resultDiv.innerHTML = `<p style="font-size: 4rem; color: ghostwhite;   direction: ltr;">Your scoure is : ${sum} % </p>`;
            resultDiv.classList.add('animate__bounceIn', 'animate__animated');
            setTimeout(reloadPage, 4000);
        }
        
    } else {
        addARow.innerHTML += `
            <tr>
                <td>${randNum_1} ${operator} ${randNum_2}</td>
                <td style="direction: ltr;">${result}</td>
                <td style="direction: ltr;">${costumerAnswer}</td>
                <td>0</td>
            </tr>
        `;
        document.getElementById('mainInput').value = '';
        resultDiv.textContent = 'Wrong! 😌';
        resultDiv.classList.add('animate__shakeX', 'animate__animated');
        setTimeout(() => {
            resultDiv.classList.remove('animate__bounceIn', 'animate__animated');
            resultDiv.textContent = '';
        }, 3000);
        resultArr.push(parseInt(0));
        if (resultArr.length < 10){
            startGameFunc();
        }else{
            sum = resultArr.reduce((accumulator, currentValue) =>{
                return accumulator + currentValue;
            },0)
           
            resultDiv.innerHTML = `<p style="font-size: 4rem; color: ghostwhite;   direction: ltr;">Your scoure is : ${sum} % </p>`;
            resultDiv.classList.add('animate__bounceIn', 'animate__animated');
            setTimeout(reloadPage, 4000);
        }
        

    }
});

document.getElementById('mainInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkButton.click();
    }
});
