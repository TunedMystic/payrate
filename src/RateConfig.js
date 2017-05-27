import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
// import Paper from 'material-ui/Paper';
import './RateConfig.css'

// const style = {
//   // height: 100,
//   // width: 100,
//   // margin: 20,
//   textAlign: 'center',
//   display: 'inline-block',
// };

// const style = {
//   display: 'flex',
//   flexWrap: 'wrap',
//   justifyContent: 'space-around'
// };

// const style = {
//   config: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   configItem: {
//     width: '30rem'
//   },
//   slider: {
//     marginTop: '0.5rem',
//     marginBottom: '2.5rem'
//   }
// }


class RateConfig extends React.Component {
  render() {
    return (
      <div className="config">
      {
        Object.keys(this.props.rateConfig).map(configKey => {
          const config = this.props.rateConfig[configKey]
          return (
            <div key={configKey} className="config-item">
              <label>{config.label}: {this.props.rateConfig[configKey].value}</label>
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
    )
  }
}

export default RateConfig
