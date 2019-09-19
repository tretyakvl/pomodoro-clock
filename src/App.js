import React, { Component } from 'react'
import Progress from './components/Progress'
import LengthControls from './components/LengthControls'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      outerProgress: 0,
      innerProgress: 0,
      sessionDuration: 25,
      breakDuration: 5
    }
  }

  progressOuter (progress) {
    this.setState({
      outerProgress: this.state.outerProgress + progress
    })
  }

  render () {
    return (
      <div className='clock'>
        <Progress
          outerProgress={this.state.outerProgress}
          innerProgress={this.state.innerProgress}
        />
        <div className='App__controls'>
          <LengthControls
            for='session'
            duration={this.state.sessionDuration}
          />
          <LengthControls
            for='break'
            duration={this.state.breakDuration}
          />
        </div>
      </div>
    )
  }
}

export default App
