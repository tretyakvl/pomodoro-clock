import React, { Component } from 'react'
import StartButton from './components/StartButton'
import Alert from './components/Alert'
import Progress from './components/Progress'
import Display from './components/Display'
import DurationControls from './components/DurationControls'
import './App.css'

const defaultState = {
  session: 25,
  break: 5,
  secondsPassed: 0,
  isBreak: false,
  controlsShown: null
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = defaultState
    this.AlertRef = React.createRef()
    this.setDuration = this.setDuration.bind(this)
    this.showControls = this.showControls.bind(this)
    this.closeControls = this.closeControls.bind(this)
    this.tick = this.tick.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
    this.handleStartButton = this.handleStartButton.bind(this)
  }

  showControls (type) {
    this.setState({
      controlsShown: type
    })
  }

  closeControls () {
    this.setState({
      controlsShown: null
    })
  }

  render () {
    const { secondsPassed, isBreak, controlsShown } = this.state
    const sessionDuration = this.state.session
    const breakDuration = this.state.break
    const currentSessionDuration = isBreak ? breakDuration : sessionDuration
    const progress = secondsPassed * 100 / (currentSessionDuration * 60)

    let timeLeft
    let startButtonHandler
    let currentSession

    if (controlsShown) {
      timeLeft = getTimeLeft(this.state[controlsShown], 0)
      startButtonHandler = this.closeControls
      currentSession = controlsShown
    } else {
      timeLeft = getTimeLeft(
        isBreak ? breakDuration : sessionDuration, secondsPassed
      )
      startButtonHandler = this.handleStartButton
      currentSession = isBreak ? 'Break' : 'Session'
    }

    return (
      <div className='App'>
        <Alert ref={this.AlertRef} />
        <div className='App__clock'>
          <Progress
            progress={progress}
            isBreak={isBreak}
            showControls={this.showControls}
          />
          <Display
            timeLeft={timeLeft}
            currentSession={currentSession}
            handleResetButton={this.handleResetButton}
          />
          {controlsShown && <DurationControls
            id={controlsShown}
            duration={this.state[controlsShown]}
            onClick={this.setDuration}
          />}
        </div>
        <div className='App__controls'>
          <StartButton
            onClick={startButtonHandler}
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
      this.timer = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timer)
      delete this.timer
    }
  }
}

function getTimeLeft (sessionDuration, secondsPassed) {
  if (sessionDuration === 60 & secondsPassed === 0) {
    return '60:00'
  }

  const msPassed = sessionDuration * 60000 - secondsPassed * 1000
  const regex = /\d+:\d+(?=\s)/
  return new Date(msPassed).toTimeString().match(regex)[0]
}

export default App
