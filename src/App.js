import React, { Component } from 'react'
import Progress from './components/Progress'
import Display from './components/Display'
import DurationControls from './components/DurationControls'
import StartButton from './components/StartButton'
import './App.css'

const MINUTE = 60000
const SECOND = 1000

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionDuration: 25 * MINUTE,
      breakDuration: 5 * MINUTE,
      timePassed: 0,
      isBreak: false
    }
  }

  setDuration (duration, type) {
    const MIN = 1
    const MAX = 60
    const durationCopy = Object.assign({}, this.state.duration)
    let newDuration = durationCopy[type] + duration
    if (newDuration < MIN) newDuration = MIN
    else if (newDuration > MAX) newDuration = MAX
    durationCopy[type] = newDuration
    if (type === 'session') {
      const sessionCopy = Object.assign({}, this.state.session)
      sessionCopy.timeLeft = getTimeString(newDuration)
      this.setState({
        session: sessionCopy,
        duration: durationCopy
      })
    } else {
      this.setState({
        duration: durationCopy
      })
    }
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

  reset () {
    clearInterval(this.state.session.intervalInstance)
    this.setState({
      session: {
        started: false,
        name: 'session',
        timeLeft: '25:00',
        intervalInstance: null
      },
      progress: {
        break: 0,
        session: 0
      }
    })
  }

  handleStartButton () {
    const isStarted = this.state.session.started
    const sessionCopy = Object.assign({}, this.state.session)
    if (!isStarted) {
      const duration = this.state.session.duration < 9
        ? `0${this.state.duration.session}:00` : `${this.state.duration.session}:00`
      sessionCopy.intervalInstance = setInterval(() => {
        this.updateClock()
        this.progress()
      }, 1000)
      sessionCopy.started = true
      sessionCopy.timeLeft = duration
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
            onClick={() => this.reset()}
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

function getTimeString (num) {
  if (num < 9) {
    return `0${num}:00`
  }
  return `${num}:00`
}

export default App
