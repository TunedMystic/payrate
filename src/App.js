import React from 'react'
// import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
// import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
import MaskedTextField from './MaskedTextField'

import './App.css'
import RateConfig from './RateConfig'
import buildRateTable from './helpers/buildRateTable'
import config from './config'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      denominations: config.denominations,
      maskConfig: config.maskConfig,
      rateConfig: config.rateConfig,
      rateTable: {},
      values: {},
    }
    this.inputs = {};
    this.numberMask = createNumberMask(this.state.maskConfig)

    // Method bindings.
    this.cleanNumValue = this.cleanNumValue.bind(this)
    this.updateRateTable = this.updateRateTable.bind(this)
    this.onRateConfigChange = this.onRateConfigChange.bind(this)
    this.onResetRateConfigs = this.onResetRateConfigs.bind(this)
  }

  componentDidMount() {
    this.updateRateTable()
  }

  cleanNumValue(rawValue) {
    if (rawValue === '') {
      return ''
    }
    const strippedVal = (
      rawValue
      .replace(this.state.maskConfig.prefix, '')
      .split(this.state.maskConfig.thousandsSeparatorSymbol).join('')
    )
    return parseFloat(strippedVal, 10)
  }

  updateRateTable() {
    return new Promise((resolve, reject) => {
      console.log('[updateRateTable]')
      const rateTable = buildRateTable(this.state.rateConfig)
      this.setState({ rateTable }, resolve)
    })
  }

  onResetRateConfigs() {
    const { rateConfig } = this.state;
    Object.keys(rateConfig).map(configKey => {
      const config = rateConfig[configKey]
      config.value = config.default
      return null
    })
    this.setState(
      { rateConfig },
      this.recalculateValues
    )
  }

  onRateConfigChange(configKey) {
    return (event, newValue) => {
      console.log('rate config change: ', configKey)
      // debugger;
      const config = this.state.rateConfig[configKey]
      // const value = parseInt(event.target.value, 10)
      const value = newValue
      if (config.min <= value <= config.max) {
        // Set state.
        this.setState({
          ...this.state,
          rateConfig: {
            ...this.state.rateConfig,
            [configKey]: {
              ...this.state.rateConfig[configKey],
              value
            }
          }
        }, this.recalculateValues)
      }
    }
  }

  recalculateValues() {
    // Rebuild rate table.
    this.updateRateTable().then(() => {
      // Update all denominations.
      const hourlyValue = this.getInputValue('hourly')
      this.updateValues('hourly', hourlyValue)
    })
  }

  getInputValue(denomination) {
    return this.cleanNumValue(
      this.inputs[denomination].inputElement.input.value
    )
  }

  onUpdateValues(denomination) {
    return (event) => {
      // Clean the input value.
      const cleanedValue = this.cleanNumValue(event.target.value)
      this.updateValues(denomination, cleanedValue)
    }
  }

  updateValues(eventDenomination, value) {
    console.log('[updateValues]')
    console.log(this.state.rateConfig)
    // Calculate the equivalent amount for all other denominations.
    for (const denomination of this.state.denominations) {
      if (denomination !== eventDenomination) {
        const newValue = value * this.state.rateTable[eventDenomination][denomination]
        this.inputs[denomination].textMaskInputElement.update(newValue || '')
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Payrate calculator</h1>
        {/* <RaisedButton label="Default" /> */}
        {
          this.state.denominations.map(denomination => (
            <MaskedTextField
              className="payrate-input"
              key={denomination}
              name={`${denomination} rate`}

              /* Text mask */
              mask={this.numberMask}
              onChange={this.onUpdateValues(denomination)}
              ref={(input) => {this.inputs[denomination] = input}}

              /* Material UI */
              floatingLabelText={`${denomination} rate`}
              floatingLabelFixed={true}
            />
          ))
        }
        <h3>Config</h3>
        <RateConfig
          rateConfig={this.state.rateConfig}
          onResetRateConfigs={this.onResetRateConfigs}
          onRateConfigChange={this.onRateConfigChange}
        />
        <br />
      </div>
    )
  }
}

export default App
