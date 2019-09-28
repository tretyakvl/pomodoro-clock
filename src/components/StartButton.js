import React from 'react'
import './StartButton.css'

const StartButton = (props) => {
  const { isStarted, controlsShown } = props
  const Icon = () => {
    if (controlsShown) {
      return (
        <svg width='40' height='40' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
          <path d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z' />
        </svg>
      )
    } else if (isStarted) {
      return (
        <svg width='40' height='45.71' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'>
          <path d='M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z' />
        </svg>
      )
    }
    return (
      <svg style={{ marginLeft: '0.6em' }} width='40' height='46' viewBox='0 0 40 46' xmlns='http://www.w3.org/2000/svg'>
        <path d='M37.8939 19.2858L6.46447 0.590065C3.91082 -0.928233 0 0.545145 0 4.30046V41.6829C0 45.0519 3.63403 47.0823 6.46447 45.3933L37.8939 26.7066C40.6976 25.0445 40.7065 20.9478 37.8939 19.2858Z' />
      </svg>
    )
  }

  return (
    <button
      className='StartButton App__button bounceIn'
      id='start_stop'
      onClick={props.onClick}
    >
      <Icon />
    </button>
  )
}

export default StartButton
