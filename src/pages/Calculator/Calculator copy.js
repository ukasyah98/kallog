import React from 'react'
import './Calculator.css'

export default function () {
  return (
    <div className="container">
      <p>
        This component works exactly like the calculator you know. Click any number to start calculating!
      </p>
      <div className="calculator">
        <div className="calculator__display">0</div>

        <div className="calculator__keys">
          <button className="key--operator" data-action="add">
            &amp;
          </button>
          <button className="key--operator" data-action="subtract">
            &#8741;
          </button>
          <button className="key--operator" data-action="multiply">(</button>
          <button className="key--operator" data-action="divide">)</button>
          <div className="key--alphabets">
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <button>D</button>
            <button>D</button>
            <button>F</button>
            <button>G</button>
            <button>H</button>
            <button>I</button>
            <button>J</button>
          </div>
          {/* <button data-action="decimal">.</button>
          <button data-action="clear">AC</button> */}
          <button className="key--delete">DEL</button>
          <button className="key--equal" data-action="calculate">=</button>
          {/* <button className="key--tumbal">XX</button> */}
        </div>
      </div>
    </div>
  )
}