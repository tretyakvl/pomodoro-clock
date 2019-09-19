import React, { Component } from 'react'
import Progress from './components/Progress'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      outerProgress: 0,
      innerProgress: 0
    }
  }

  progressOuter (progress) {
    this.setState({
      outerProgress: this.state.outerProgress + progress
    })
  }

  render () {
    return (
      <div className='clock'>
        <Progress
          outerProgress={this.state.outerProgress}
          innerProgress={this.state.innerProgress}
        />
        <div>
          <button onClick={() => this.progressOuter(5)}>inc</button>
          <button>dec</button>
        </div>
      </div>
    )
  }
}

export default App
