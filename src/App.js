import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/HomeV2/Home'
// import LogicCalculator from './pages/LogicCalculator/LogicCalculator'

export default () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} />
        {/* <Route exact path="/" component={LogicCalculator} /> */}
      </Switch>
    </div>
  )
}