// 温度进度条
import React, { Component } from 'react'

class DivProgress extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
    return (
      <div style={{
        width: this.props.width ? this.props.width : 280,
        height: this.props.height ? this.props.height : 21,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{
          width: this.props.titleWidth ? this.props.titleWidth : 75,
          height: this.props.height ? this.props.height : 21,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          color: this.props.titleColor ? this.props.titleColor : '#fff',
        }}>
          {this.props.title ? this.props.title : ''}
        </div>

        <div style={{
          width: 200 - 14 - 50,
          height: this.props.height ? this.props.height : 21,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
        }}>
          <div style={{
            width: this.props.value && this.props.maxValue ? this.props.value / this.props.maxValue * (200 - 14 - 50) : 0,
            maxWidth: 200 - 14 - 50,
            height: 5,
            transition: 'width 0.5s',
            background: this.props.value / this.props.maxValue < 0.8 ? 'linear-gradient(to right,rgba(94, 168, 225, 0),rgba(94, 168, 225, 1))' : 'linear-gradient(to right,rgba(235, 26, 85, 0),rgba(235, 26, 85, 1))',
          }}></div>
          <div style={{
            width: 14,
            height: this.props.height ? this.props.height : 21,
            background: this.props.value / this.props.maxValue < 0.8 ? 'rgba(94, 168, 225, 0.2)' : 'rgba(235, 26, 85, 0.2)',
            position: 'absolute',
            transition: 'left 0.5s',
            left: (this.props.value / this.props.maxValue) * (200 - 14 - 50) - 9,
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 1,
              height: this.props.height ? this.props.height : 21,
              background: this.props.value / this.props.maxValue < 0.8 ? 'rgba(94, 168, 225, 1)' : 'rgba(235, 26, 85,1)',
            }}></div>
          </div>
        </div>

        <div style={{
          width: 50,
          height: this.props.height ? this.props.height : 21,
          color: this.props.titleColor ? this.props.titleColor : '#fff',
        }}>
          {(this.props.value ? this.props.value : 0) + ' ' + (this.props.unit ? this.props.unit : '')}
        </div>

      </div>
    )
  }
}
export default DivProgress