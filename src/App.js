import React, { Component } from 'react'
import Progress from './components/Progress'
import Display from './components/Display'
import DurationControls from './components/DurationControls'
import StartButton from './components/StartButton'
import Alert from './components/Alert'
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
    this.AlertRef = React.createRef()
    this.setDuration = this.setDuration.bind(this)
    this.tick = this.tick.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
    this.handleStartButton = this.handleStartButton.bind(this)
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
        <Alert ref={this.AlertRef} />
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
          <StartButton
            onClick={this.handleStartButton}
          />
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

  tick () {
    const { secondsPassed, isBreak } = this.state
    const currentSessionDuration = isBreak ? this.state.break : this.state.session
    const minutesPassed = (secondsPassed + 1) / 60

    if (minutesPassed > currentSessionDuration) {
      this.AlertRef.current.play()
      this.setState({
        secondsPassed: 0,
        isBreak: !isBreak
      })
    } else {
      this.setState({
        secondsPassed: secondsPassed + 1
      })
    }
  }

  handleResetButton () {
    clearInterval(this.timer)
    delete this.timer
    this.setState(defaultState)
    this.AlertRef.current.pause()
    this.AlertRef.current.currentTime = 0
  }

  handleStartButton () {
    if (!this.timer) {
      this.timer = setInterval(this.tick, 10)
    } else {
      clearInterval(this.timer)
      delete this.timer
    }
  }
}

function getTimeLeft (sessionDuration, secondsPassed) {
  const msPassed = sessionDuration * 60000 - secondsPassed * 1000
  const regex = /\d+:\d+(?=\s)/
  return new Date(msPassed).toTimeString().match(regex)[0]
}

export default App
