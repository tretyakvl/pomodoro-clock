import React, { Component } from 'react'
import Progress from './Progress'
import Display from './Display'

class Clock extends Component {
  render () {
    const { progress, isBreak, timeLeft, handleResetButton } = this.props
    return (
      <div>
        <Progress
          progress={progress}
          isBreak={isBreak}
        />
        <Display
          timeLeft={timeLeft}
          currentSession={isBreak ? 'Break' : 'Session'}
          handleResetButton={handleResetButton}
        />
      </div>
    )
  }
}

export default Clock
