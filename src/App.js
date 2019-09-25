import React, { Component } from 'react'
import StartButton from './components/StartButton'
import Alert from './components/Alert'
import './App.css'
import Clock from './components/Clock'

const defaultState = {
  session: 25,
  break: 5,
  secondsPassed: 0,
  isBreak: false,
<<<<<<< HEAD
  controlsShown: null
=======
  controlsShown: false
>>>>>>> b8e39189fa50525c018bcb38fa394c78e27279b9
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = defaultState
    this.AlertRef = React.createRef()
    this.setDuration = this.setDuration.bind(this)
    this.showControls = this.showControls.bind(this)
    this.tick = this.tick.bind(this)
    this.handleResetButton = this.handleResetButton.bind(this)
    this.handleStartButton = this.handleStartButton.bind(this)
  }

<<<<<<< HEAD
  showControls (type) {
    this.setState({
      controlsShown: type
=======
  showControls () {
    this.setState({
      controlsShown: true
>>>>>>> b8e39189fa50525c018bcb38fa394c78e27279b9
    })
  }

  render () {
    const { secondsPassed, isBreak, controlsShown } = this.state
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
<<<<<<< HEAD
        <div className='App__clock'>
          <Progress
            progress={progress}
            isBreak={isBreak}
            showControls={this.showControls}
          />
          <Display
            timeLeft={timeLeft}
            currentSession={isBreak ? 'Break' : 'Session'}
            handleResetButton={this.handleResetButton}
          />
          {controlsShown && <DurationControls
            id={controlsShown}
            duration={this.state[controlsShown]}
            onClick={this.setDuration}
          />}
        </div>
=======
        <Clock
          progress={progress}
          isBreak={isBreak}
          timeLeft={timeLeft}
          handleResetButton={this.handleResetButton}
          showControls={this.showControls}
          controlsShown={controlsShown}
        />
>>>>>>> b8e39189fa50525c018bcb38fa394c78e27279b9
        <div className='App__controls'>
          <StartButton
            onClick={this.handleStartButton}
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
