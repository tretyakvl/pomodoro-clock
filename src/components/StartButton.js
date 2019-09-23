import React from 'react'
import './StartButton.css'

const StartButton = (props) => {
  const PlayIcon = () => {
    return (
      <svg width='40' height='46' viewBox='0 0 40 46' xmlns='http://www.w3.org/2000/svg'>
        <path d='M37.8939 19.2858L6.46447 0.590065C3.91082 -0.928233 0 0.545145 0 4.30046V41.6829C0 45.0519 3.63403 47.0823 6.46447 45.3933L37.8939 26.7066C40.6976 25.0445 40.7065 20.9478 37.8939 19.2858Z' />
      </svg>
    )
  }

  return (
    <button
      className='StartButton'
      id='start_stop'
      onClick={props.onClick}
    >
      <PlayIcon />
    </button>
  )
}

export default StartButton
