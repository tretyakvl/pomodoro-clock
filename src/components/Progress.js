import React from 'react'
import './Progress.css'

const Progress = (props) => {
  const OUTER_RADIUS = 110
  const INNER_RADIUS = 84
  const STROKE_WIDTH = 25
  const outerCircumference = OUTER_RADIUS * 2 * Math.PI
  const innerCircumference = INNER_RADIUS * 2 * Math.PI
  const { progress, isBreak, showControls } = props
  let offset
  if (isBreak) offset = getOffset(innerCircumference, progress)
  else offset = getOffset(outerCircumference, progress)

  return (
    <svg
      className='Progress'
      viewBox='0 0 250 250'
      width='250'
      height='250'
    >
      <circle
        className='Progress__outer'
        onClick={() => { showControls('session') }}
        r={OUTER_RADIUS}
        cx='125'
        cy='125'
        fill='transparent'
        stroke='#74E900'
        strokeWidth={STROKE_WIDTH}
        strokeLinecap='round'
        strokeDasharray={outerCircumference}
        strokeDashoffset={isBreak ? 0 : offset}
      />
      <circle
        onClick={() => { showControls('break') }}
        className='Progress__inner'
        r={INNER_RADIUS}
        cx='125'
        cy='125'
        fill='transparent'
        stroke='#F6511D'
        strokeWidth={STROKE_WIDTH}
        strokeLinecap='round'
        strokeDasharray={innerCircumference}
        strokeDashoffset={isBreak ? offset : 0}
      />
    </svg>
  )
}

function getOffset (circumference, progress) {
  return -circumference * progress / 100
}

export default Progress
