import React, { Component } from 'react'
import './LengthControls.css'

class LengthControls extends Component {
  render () {
    const id = this.props.for
    const Arrow = () => {
      return (
        <svg width='9' height='14' viewBox='0 0 9 14' xmlns='http://www.w3.org/2000/svg'>
          <path d='M0.212668 6.09385L6.09414 0.212668C6.3777 -0.0708895 6.83769 -0.0708895 7.12125 0.212668L7.80729 0.898715C8.09055 1.18197 8.09085 1.64075 7.8085 1.92461L3.1472 6.6074L7.8082 11.2905C8.09085 11.5744 8.09025 12.0331 7.80699 12.3164L7.12094 13.0024C6.83739 13.286 6.3774 13.286 6.09384 13.0024L0.212668 7.12095C-0.0708894 6.83739 -0.0708894 6.3774 0.212668 6.09385Z' />
        </svg>
      )
    }
    return (
      <div
        className={`LengthControls LengthControls--${id}`}
      >
        <span
          className='LengthControls__label'
          id={`${id}-label`}
        >
          {`${id} length`}
        </span>
        <div className='LengthControls__controls'>
          <button
            id={`${id}-decrement`}
          >
            <Arrow />
          </button>
          <span id={`${id}-length`}>
            {this.props.duration}
          </span>
          <button
            id={`${id}-decrement`}
          >
            <Arrow />
          </button>
        </div>
      </div>
    )
  }
}

export default LengthControls