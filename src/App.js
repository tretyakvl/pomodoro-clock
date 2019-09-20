import React, { Component } from 'react'
import Progress from './components/Progress'
import Display from './components/Display'
import DurationControls from './components/DurationControls'
import StartButton from './components/StartButton'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: {
        inner: 0,
        outer: 0
      },
      duration: {
        session: 25,
        break: 5
      }
    }
    this.setDuration = this.setDuration.bind(this)
    this.setProgress = this.setProgress.bind(this)
  }

  setDuration (duration, type) {
    const durationCopy = Object.assign({}, this.state.duration)
    durationCopy[type] = durationCopy[type] + duration
    this.setState({
      duration: durationCopy
    })
  }

  setProgress (progress, type) {
    const progressCopy = Object.assign({}, this.state.progress)
    progressCopy[type] = progressCopy[type] + progress
    this.setState({
      progress: progressCopy
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
          <DurationControls
            id='session'
            duration={this.state.duration.session}
            onClick={this.setDuration}
          />
          <StartButton />
          <DurationControls
            id='break'
            duration={this.state.duration.break}
            onClick={this.setDuration}
          />
        </div>
      </div>
    )
  }
}

export default App
