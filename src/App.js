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
        break: 0,
        session: 0
      },
      duration: {
        session: 1,
        break: 1
      },
      session: {
        started: false,
        name: 'session',
        timeLeft: '01:00',
        intervalInstance: null
      }
    }
    this.setDuration = this.setDuration.bind(this)
    this.progress = this.progress.bind(this)
  }

  setDuration (duration, type) {
    const durationCopy = Object.assign({}, this.state.duration)
    durationCopy[type] = durationCopy[type] + duration
    this.setState({
      duration: durationCopy
    })
  }

  changeSession () {
    const sessionCopy = Object.assign({}, this.state.session)
    const newName = sessionCopy.name === 'session' ? 'break' : 'session'
    sessionCopy.name = newName
    sessionCopy.timeLeft = `${this.state.duration[newName]}:00`
    this.setState({
      session: sessionCopy
    })
  }

  progress () {
    const currentSession = this.state.session.name
    const progressCopy = Object.assign({}, this.state.progress)
    const progress = 100 / (this.state.duration[currentSession] * 60)
    let newProgress = progressCopy[currentSession] + progress

    if (newProgress > 100) {
      newProgress = 0
      this.changeSession()
    }

    progressCopy[currentSession] = newProgress
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
        this.progress()
      }, 100)
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
            outerProgress={this.state.progress.session}
            innerProgress={this.state.progress.break}
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
    minutes: '2-digit',
    seconds: '2-digit'
  }).replace(/^\d+:/, '')
  return newTimeString
}

export default App
