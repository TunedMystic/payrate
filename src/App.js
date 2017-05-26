import React from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import RateConfig from './RateConfig'
import './App.css'
import buildRateTable from './helpers/buildRateTable'
  
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      denominations: [
        'hourly', 'daily', 'weekly',
        'monthly', 'yearly'
      ],
      maskConfig: {
        prefix: '$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2,
        allowLeadingZeroes: true
      },
      rateConfig: {
        hoursPerDay: {
          value: 8,
          default: 8,
          min: 1,
          max: 24,
          label: 'Hours per Day'
        },
        daysPerWeek: {
          value: 5,
          default: 5,
          min: 1,
          max: 7,
          label: 'Days per Week'
        },
        weeksPerMonth: {
          value: 4,
          default: 4,
          min: 1,
          max: 4,
          label: 'Weeks per Month'
        },
        monthsPerYear: {
          value: 12,
          default: 12,
          min: 1,
          max: 12,
          label: 'Months per Year'
        },
      },
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
    return (event) => {
      console.log('rate config change: ', configKey)
      const config = this.state.rateConfig[configKey]
      const value = parseInt(event.target.value, 10)
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
      this.inputs[denomination].inputElement.value
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
        {
          this.state.denominations.map(denomination => (
            <MaskedInput
              className="payrate-input"
              key={denomination}
              mask={this.numberMask}
              placeholder={`${denomination} rate`}
              onChange={this.onUpdateValues(denomination)}
              ref={(input) => {this.inputs[denomination] = input}}
            />
          ))
        }
        <h3>Config</h3>
        <RateConfig
          rateConfig={this.state.rateConfig}
          onResetRateConfigs={this.onResetRateConfigs}
          onRateConfigChange={this.onRateConfigChange}
        />
      </div>
    )
  }
}

export default App
