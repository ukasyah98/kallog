import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import './Calculator.css'

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function () {
  const [expression, setExpression] = React.useState('')

  const onOperatorClick = (e) => {
    const className = e.target.className
    console.log(className)
  }

  return (
    <div className="container">
      {/* <p>
        This component works exactly like the calculator you know. Click any number to start calculating!
      </p> */}
      <div className="calculator">
        <div className="calculator__display">
        {expression || <i style={{ visibility: 'hidden' }}>x</i>}
        </div>

        <div className="calculator__keys">
          <button className="key--and" onClick={onOperatorClick}>&amp;</button>
          <button className="key--or" onClick={onOperatorClick}>&#8741;</button>
          <button className="key--ope" onClick={onOperatorClick}>(</button>
          <button className="key--clo" onClick={onOperatorClick}>)</button>
          <div
            style={{
              gridColumn: '1 / 4', gridRow: '2 / 4',
              background: 'transparent',
              overflowX: 'hidden',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <PerfectScrollbar>
              <div style={{ height: 0 }}>
                <div className="calculator__alphabets">
                  {Array(alphabets.length).fill(1).map((_, i) => (
                    <button key={`grd-${i}`}>{alphabets[i]}</button>
                  ))}
                  <button style={{ pointerEvents: 'none' }}></button>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <button style={{ gridColumn: '4', gridRow: '2' }}>DEL</button>
          <button className="key--samdeng" style={{ gridColumn: '4', gridRow: '3' }}>=</button>
          {/* 
          <div className="key--alphabets">
            <button>A</button>
          </div> */}
          {/* <button data-action="decimal">.</button>
          <button data-action="clear">AC</button> */}
          {/* <button className="key--delete">DEL</button>
          <button className="key--equal" data-action="calculate">=</button> */}
          {/* <button className="key--tumbal">XX</button> */}
        </div>
      </div>
    </div>
  )
}