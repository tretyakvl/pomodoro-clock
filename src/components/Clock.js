import React, { Component } from 'react'
import Progress from './Progress'
import Display from './Display'
import DurationControls from './DurationControls'

class Clock extends Component {
  render () {
    const {
      progress, isBreak, timeLeft,
      handleResetButton, showControls,
      controlsShown
    } = this.props
    return (
      <div>
        <Progress
          progress={progress}
          isBreak={isBreak}
          showControls={showControls}
        />
        <Display
          timeLeft={timeLeft}
          currentSession={isBreak ? 'Break' : 'Session'}
          handleResetButton={handleResetButton}
        />
        {controlsShown && <DurationControls />}
      </div>
    )
  }
}

export default Clock
