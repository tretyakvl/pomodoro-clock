import React, { Component } from 'react'
import Progress from './components/Progress'
import Display from './components/Display'
import LengthControls from './components/LengthControls'
import StartButton from './components/StartButton'
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
      <div className='App'>
        <div className='App__clock'>
          <Progress
            outerProgress={this.state.outerProgress}
            innerProgress={this.state.innerProgress}
          />
          <Display />
        </div>
        <div className='App__controls'>
          <LengthControls
            for='session'
            duration={this.state.sessionDuration}
          />
          <StartButton />
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
