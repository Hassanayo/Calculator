import React, {useState} from "react";
import './App.css'
import Screen from "./Screen/Screen";
import Button from "./Button/Button";


const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  const [calc, setCalc] = useState({
    number: 0,
    result: 0,
    sign: ""
})
/* functions */
  function numClickHandler(e){
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.number).length < 16){
      setCalc({
        ...calc,
        number : 
          calc.number === 0 && value === "0"
          ? "0" 
          : removeSpaces(calc.number) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.number + value)))
          : toLocaleString(calc.number + value),
        result: !calc.sign ? 0 : calc.result
      })
    }
  };
  function commaClickHandler(e){
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".") ? calc.number + value : calc.number,
    })

  }
  function signClickHandler(e){
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      result: !calc.result && calc.number ? calc.number : calc.result,
      number: 0
    });

  };
  function equalsClickHandler(){
    if (calc.sign && calc.number) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        result:
          calc.number === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.result)),
                  Number(removeSpaces(calc.number)),
                  calc.sign
                )
              ),
        sign: "",
        number: 0,
      });
    }
  };
  
  function invertClickHandler(){
      setCalc({
        ...calc,
        number: calc.number ? toLocaleString(removeSpaces(calc.number) * -1) : 0,
        result: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
        sign: "",
      });
    };
  
  function percentClickHandler(){
      let number = calc.number ? parseFloat(removeSpaces(calc.number)) : 0;
      let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;

      setCalc({
        ...calc,
        number: (number /= Math.pow(100, 1)),
        result: (result /= Math.pow(100, 1)),
        sign: ""
      })
    };
    function resetClickHandler(){
      setCalc({
        ...calc,
        number: "0",
        result: "0",
        sign: "" 
      });
    };
  
  


const renderButtons = btnValues.flat().map((btn,i)=> {
  return(
      <Button
      key={i}
      value={btn}
      styles={btn === "=" ? "equals": ""} 
      clicked={
        btn === "C" 
        ? resetClickHandler : 
        btn === "+-" 
        ? invertClickHandler :
        btn === "%" 
        ? percentClickHandler : 
        btn === "="
        ? equalsClickHandler :
        btn === "/" || btn === "X" || btn === "-" || btn === "+"
        ? signClickHandler :
        btn === "."
        ? commaClickHandler
        : numClickHandler
        
      }
      />
  )
})
  


  
  return (
    <div>
      
      <div className="wrapper">
        <Screen value={calc.number ? calc.number : calc.result}/>
        <div className="buttonBox">
          {renderButtons}
        </div>


      </div>
      
      
      
    </div>
      
      
  );
}

export default App;
