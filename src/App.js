import React from 'react'

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { conformToMask } from 'text-mask-core/dist/textMaskCore'

import ActionFace from 'material-ui/svg-icons/action/face'
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on'
import IconButton from 'material-ui/IconButton'

import RateConfig from './RateConfig'
import RateExamples from './RateExamples'
import MaskedTextField from './MaskedTextField'
import buildRateTable from './helpers/buildRateTable'
import config from './config'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      denominations: config.denominations,
      maskConfig: config.maskConfig,
      rateConfig: config.rateConfig,
      rateTable: config.rateTable,
      values: {},
    }
    this.inputs = {}
    this.numberMask = createNumberMask(this.state.maskConfig)

    // Method bindings.
    this.cleanNumValue = this.cleanNumValue.bind(this)
    this.updateRateTable = this.updateRateTable.bind(this)
    this.onRateConfigChange = this.onRateConfigChange.bind(this)
    this.onResetRateConfigs = this.onResetRateConfigs.bind(this)
    this.makeRateValues = this.makeRateValues.bind(this)
  }

  // 1) Update the rate table.
  // 2) Initialize the payrate input elements.
  componentDidMount() {
    this.updateRateTable().then(() => {
      const initHourlyRate = 20
      this.inputs.hourly.textMaskInputElement.update(initHourlyRate)
      this.inputs.hourly.inputElement.focus()
      this.updateValues('hourly', initHourlyRate)
    })
  }

  // This method takes a masked number (str)
  // and returns a cleaned value (int/float).
  // Example:
  //   - cleanNumValue('$ 1,000') -> 1000
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

  // Build a new rate table from the current rate config.
  updateRateTable() {
    return new Promise((resolve, reject) => {
      const rateTable = buildRateTable(this.state.rateConfig)
      this.setState({ rateTable }, resolve)
    })
  }

  // Handler for a rate config reset event.
  // This method would:
  //   1) Reset all rate configs to default values.
  //   2) Rebuild the rate table
  //   3) Update all values based on the new rate table.
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

  // Handler for a rate config change event.
  // This method would:
  //   1) Update the rate config
  //   2) Rebuild the rate table
  //   3) Update all values based on the new rate table.
  onRateConfigChange(configKey) {
    return (event, newValue) => {
      const config = this.state.rateConfig[configKey]
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

  // Get the cleaned value for a specific denomination.
  getInputValue(denomination) {
    return this.cleanNumValue(
      this.inputs[denomination].inputElement.input.value
    )
  }

  // Return an object with masked values for each denomination.
  makeRateValues(hourlyRate) {
    const values = {}
    const cleanedValue = this.cleanNumValue(hourlyRate)
    for (const denomination of this.state.denominations) {
      let value = `${cleanedValue * this.state.rateTable.hourly[denomination]}`
      value = conformToMask(value, this.numberMask(value))
      values[denomination] = value.conformedValue
    }
    return values
  }

  // Handler for a payrate input change event.
  // This method would update all other input values appropriately.
  onUpdateValues(denomination) {
    return (event) => {
      // Clean the input value.
      const cleanedValue = this.cleanNumValue(event.target.value)
      this.updateValues(denomination, cleanedValue)
    }
  }

  // Internal handler for `this.onUpdateValues`.
  updateValues(eventDenomination, value) {
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
      <div className="app">
        <div className="header">
          <MonetizationOn className="header-logo" />
          <h2>Payrate calculator</h2>
        </div>
        <div className="payrate-input-group">
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
        </div>
        <br />
        <br />
        <br />
        <RateExamples
          denominations={this.state.denominations}
          makeRateValues={this.makeRateValues}
        />
        <br />
        <br />
        <RateConfig
          rateConfig={this.state.rateConfig}
          onResetRateConfigs={this.onResetRateConfigs}
          onRateConfigChange={this.onRateConfigChange}
        />
        <br />
        <br />
        <div className="footer">
          <p>Made by </p>
          <IconButton className="logo-link" href="https://github.com/tunedmystic">
            <ActionFace className="logo" />
          </IconButton>
          <p> in nyc.</p>
        </div>
      </div>
    )
  }
}

export default App
