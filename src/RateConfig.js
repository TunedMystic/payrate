import React from 'react';

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import './RateConfig.css'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'


class RateConfig extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive() {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    return (
      <div className="config">
        <FlatButton
          label="Config"
          labelPosition="before"
          className="config-button-color"
          onClick={this.toggleActive}
          icon={
            this.state.active ?
            <HardwareKeyboardArrowUp className="config-button-color" />
            :
            <HardwareKeyboardArrowDown className="config-button-color" />
          }
        />
        <br />

        <div className={this.state.active ? '' : 'hidden'}>
          {
            Object.keys(this.props.rateConfig).map(configKey => {
              const config = this.props.rateConfig[configKey]
              return (
                <div key={configKey} className="config-item">
                  <label className="config-label">{config.label}: <strong>{this.props.rateConfig[configKey].value}</strong></label>
                  <Slider
                    className="config-slider"
                    type="number"
                    min={config.min}
                    max={config.max}
                    step={1}
                    value={this.props.rateConfig[configKey].value}
                    onChange={this.props.onRateConfigChange(configKey)}
                  />
                </div>
              )
            })
          }
          <div>
            <RaisedButton onClick={this.props.onResetRateConfigs} label="Reset configs" />
          </div>
        </div>
      </div>
    )
  }
}

export default RateConfig
