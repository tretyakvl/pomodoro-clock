import React from 'react'
import './Alert.css'
import sound from './Alert.wav'

const Alert = React.forwardRef((props, ref) => {
  return (
    <audio
      id='beep'
      ref={ref}
      src={sound}
    >
        Your browser does not support the
      <code>audio</code> element.
    </audio>
  )
})

export default Alert
