import React from 'react';
import clsx from 'clsx';
import './ContentBox.css';


export function ContentBox({ className, children, style }) {
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
}
