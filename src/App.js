import React, { Component } from 'react'
import Progress from './components/Progress'
import Display from './components/Display'
import DurationControls from './components/DurationControls'
import StartButton from './components/StartButton'
import './App.css'

const defaultState = {
  session: 25,
  break: 5,
  secondsPassed: 0,
  isBreak: false
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = defaultState
    this.setDuration = this.setDuration.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
  }

  render () {
    const { secondsPassed, isBreak } = this.state
    const sessionDuration = this.state.session
    const breakDuration = this.state.break
    const currentSessionDuration = isBreak ? breakDuration : sessionDuration
    const progress = secondsPassed * 100 / (currentSessionDuration * 60)
    const timeLeft = getTimeLeft(
      isBreak ? breakDuration : sessionDuration, secondsPassed
    )

    return (
      <div className='App'>
        <div className='App__clock'>
          <Progress
            progress={progress}
            isBreak={isBreak}
          />
          <Display
            timeLeft={timeLeft}
            currentSession={isBreak ? 'Break' : 'Session'}
            handleResetButton={this.handleResetButton}
          />
        </div>
        <div className='App__controls'>
          <DurationControls
            id='session'
            duration={sessionDuration}
            onClick={this.setDuration}
          />
          {/* <StartButton
            onClick={() => this.handleStartButton()}
          /> */}
          <DurationControls
            id='break'
            duration={breakDuration}
            onClick={this.setDuration}
          />
        </div>
      </div>
    )
  }

  setDuration (duration, id) {
    const MIN = 1
    const MAX = 60

    let newDuration = this.state[id] + duration
    if (newDuration < MIN) newDuration = MIN
    else if (newDuration > MAX) newDuration = MAX

    this.setState({ [id]: newDuration })
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

  handleResetButton () {
    clearInterval(this.timer)
    this.setState(defaultState)
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
}

function getTimeLeft (sessionDuration, secondsPassed) {
  const msPassed = sessionDuration * 60000 - secondsPassed * 1000
  const regex = /\d+:\d+(?=\s)/
  return new Date(msPassed).toTimeString().match(regex)[0]
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
