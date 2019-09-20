import React, { Component } from 'react'
import './Progress.css'

class Progress extends Component {
  render () {
    const outerCircumference = 691
    const innerCircumference = 490
    const { innerProgress, outerProgress } = this.props
    const outerOffset = getOffset(outerCircumference, outerProgress)
    const innerOffset = getOffset(innerCircumference, innerProgress)

    return (
      <svg
        className='Progress'
        viewBox='0 0 250 250'
        width='250'
        height='250'
      >
        <circle
          className='Progress__outer'
          r='110'
          cx='125'
          cy='125'
          fill='transparent'
          stroke='#74E900'
          strokeWidth='30'
          strokeLinecap='round'
          strokeDasharray={outerCircumference}
          strokeDashoffset={outerOffset}
        />
        <circle
          className='Progress__inner'
          r='78'
          cx='125'
          cy='125'
          fill='transparent'
          stroke='#F6511D'
          strokeWidth='30'
          strokeLinecap='round'
          strokeDasharray={innerCircumference}
          strokeDashoffset={innerOffset}
        />
      </svg>
    )
  }
}

function getOffset (circumference, progress) {
  return -circumference * progress / 100
}

export default Progress
