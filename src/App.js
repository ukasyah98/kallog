import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import LogicCalculator from './pages/LogicCalculator/LogicCalculator'

export default () => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/" component={LogicCalculator} />
      </Switch>
    </div>
  )
}