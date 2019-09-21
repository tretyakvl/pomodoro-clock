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
      },
      session: {
        started: false,
        name: 'session',
        timeLeft: '25:00',
        intervalInstance: null
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

  updateClock () {
    const sessionCopy = Object.assign({}, this.state.session)
    const timeLeft = sessionCopy.timeLeft
    sessionCopy.timeLeft = countDonw(timeLeft)
    this.setState({
      session: sessionCopy
    })
  }

  handleStartButton () {
    const isStarted = this.state.session.started
    const sessionCopy = Object.assign({}, this.state.session)
    if (!isStarted) {
      sessionCopy.intervalInstance = setInterval(() => {
        this.updateClock()
      }, 1000)
      sessionCopy.started = true
      this.setState({
        session: sessionCopy
      })
    } else {
      clearInterval(sessionCopy.intervalInstance)
      sessionCopy.intervalInstance = null
      sessionCopy.started = false
      this.setState({
        session: sessionCopy
      })
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='App__clock'>
          <Progress
            outerProgress={this.state.progress.outer}
            innerProgress={this.state.progress.inner}
          />
          <Display
            timeLeft={this.state.session.timeLeft}
            currentSession={this.state.session.name}
          />
        </div>
        <div className='App__controls'>
          <DurationControls
            id='session'
            duration={this.state.duration.session}
            onClick={this.setDuration}
          />
          <StartButton
            onClick={() => this.handleStartButton()}
          />
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

function countDonw (timeString) {
  const dateObj = new Date(0)
  const [min, sec] = timeString.split(':')
  dateObj.setMinutes(min)
  dateObj.setSeconds(sec - 1)
  const newTimeString = dateObj.toLocaleTimeString('ru-RU', {
    hours: false,
    minutes: '2-digit',
    seconds: '2-digit'
  }).replace(/^\d+:/, '')
  return newTimeString
}

export default App
