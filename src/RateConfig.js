import React from 'react';

class RateConfig extends React.Component {
  render() {
    return (
      <div>
      {
        Object.keys(this.props.rateConfig).map(configKey => {
          const config = this.props.rateConfig[configKey]
          return (
            <div key={configKey}>
              <label>{config.label}</label>
              <input
                type="number"
                min={config.min}
                max={config.max}
                value={this.props.rateConfig[configKey].value}
                onChange={this.props.onRateConfigChange(configKey)}
              />
            </div>
          )
        })
      }
      <button onClick={this.props.onResetRateConfigs}>Reset configs</button>
      </div>
    )
  }
}

export default RateConfig
