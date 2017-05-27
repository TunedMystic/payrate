const config = {
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
  rateTable: {
    hourly: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
    daily: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
    weekly: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
    monthly: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
    yearly: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
  }
}

export default config;
