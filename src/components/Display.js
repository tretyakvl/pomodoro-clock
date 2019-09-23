import './Display.css'
import React from 'react'

const Display = (props) => {
  const { currentSession, timeLeft, handleResetButton } = props
  const ResetIcon = () => {
    return (
      <svg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12.2881 5.25684C15.5682 3.85545 19.0986 3.86926 22.1971 5.02552L23.2051 2.50076C23.6318 1.43186 25.1377 1.41249 25.5918 2.47001L28.4386 9.10031C28.7201 9.75588 28.4169 10.5155 27.7613 10.797L21.131 13.6438C20.0735 14.0979 18.9949 13.0467 19.4216 11.9779L20.5999 9.02639C18.4597 8.25252 16.1445 8.30889 14.0383 9.1918C9.45153 11.1145 7.18739 16.4667 9.25418 21.1712C11.2148 25.6341 16.4597 27.8333 21.0997 25.8411C23.1338 24.9677 24.7445 23.4163 25.6888 21.4365C25.835 21.13 26.1946 20.9904 26.5101 21.1162L29.3139 22.2356C29.6583 22.3731 29.8151 22.771 29.6603 23.108C28.3288 26.0064 25.9602 28.4402 22.7986 29.7977C16.0245 32.7063 8.17513 29.5727 5.26652 22.7987C2.36123 16.0324 5.51661 8.14997 12.2881 5.25684Z' />
      </svg>
    )
  }
  return (
    <div className={`Display Display--${currentSession}`}>
      <span
        className='Display__current'
        id='timer-label'
      >
        {currentSession}
      </span>
      <span
        className='Display__remaining'
        id='time-left'
      >
        {timeLeft}
      </span>
      <button
        className='Display__reset'
        id='reset'
        onClick={handleResetButton}
      >
        <ResetIcon />
      </button>
    </div>
  )
}

export default Display
