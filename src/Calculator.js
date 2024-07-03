import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (display === '0' && !isNaN(value)) {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const safeEval = (exp) => {
    // eslint-disable-next-line no-new-func
    return new Function('return ' + exp)();
  };

  const handleCalculate = () => {
    try {
      const result = safeEval(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleScientificFunction = (func) => {
    try {
      let result;
      switch (func) {
        case 'sin':
        case 'cos':
        case 'tan':
          result = Math[func](parseFloat(display) * Math.PI / 180);
          break;
        case 'log':
          result = Math.log10(parseFloat(display));
          break;
        case 'ln':
          result = Math.log(parseFloat(display));
          break;
        case 'sqrt':
          result = Math.sqrt(parseFloat(display));
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const renderButton = (value, className = '') => (
    <button className={className} onClick={() => handleButtonClick(value)}>{value}</button>
  );

  const renderFunctionButton = (value, displaySymbol) => (
    <button className="function" onClick={() => handleScientificFunction(value)}>{displaySymbol}</button>
  );

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {renderFunctionButton('sin', 'sin')}
        {renderFunctionButton('cos', 'cos')}
        {renderFunctionButton('tan', 'tan')}
        <button className="clear" onClick={handleClear}>C</button>
        {renderFunctionButton('log', 'log')}
        {renderFunctionButton('ln', 'ln')}
        {renderFunctionButton('sqrt', '√')}
        {renderButton('/', 'operator')}
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
        {renderButton('*', 'operator')}
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
        {renderButton('-', 'operator')}
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
        {renderButton('+', 'operator')}
        {renderButton('0')}
        {renderButton('.')}
        <button className="equals" onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;