const buildRateTable = (config) => {
  const rateTable = {}
  const baseDenomination = 1

  // Calculate hourly rate values.
  rateTable.hourly = {}
  rateTable.hourly.hourly = baseDenomination
  rateTable.hourly.daily = (
    baseDenomination *
    config.hoursPerDay.value
  )
  rateTable.hourly.weekly = (
    baseDenomination *
    config.hoursPerDay.value *
    config.daysPerWeek.value
  )
  rateTable.hourly.monthly = (
    baseDenomination *
    config.hoursPerDay.value *
    config.daysPerWeek.value *
    config.weeksPerMonth.value
  )
  rateTable.hourly.yearly = (
    baseDenomination *
    config.hoursPerDay.value *
    config.daysPerWeek.value *
    config.weeksPerMonth.value *
    config.monthsPerYear.value
  )

  // Calculate daily rate values.
  rateTable.daily = {}
  rateTable.daily.hourly = (
    baseDenomination /
    config.hoursPerDay.value
  )
  rateTable.daily.daily = baseDenomination
  rateTable.daily.weekly = (
    baseDenomination *
    config.daysPerWeek.value
  )
  rateTable.daily.monthly = (
    baseDenomination *
    config.daysPerWeek.value *
    config.weeksPerMonth.value
  )
  rateTable.daily.yearly = (
    baseDenomination *
    config.daysPerWeek.value *
    config.weeksPerMonth.value *
    config.monthsPerYear.value
  )

  // Calculate weekly rate values.
  rateTable.weekly = {}
  rateTable.weekly.hourly = (
    baseDenomination /
    config.daysPerWeek.value /
    config.hoursPerDay.value
  )
  rateTable.weekly.daily = (
    baseDenomination /
    config.daysPerWeek.value
  )
  rateTable.weekly.weekly = baseDenomination
  rateTable.weekly.monthly = (
    baseDenomination *
    config.weeksPerMonth.value
  )
  rateTable.weekly.yearly = (
    baseDenomination *
    config.weeksPerMonth.value *
    config.monthsPerYear.value
  )

  // Calculate monthly rate values.
  rateTable.monthly = {}
  rateTable.monthly.hourly = (
    baseDenomination /
    config.weeksPerMonth.value /
    config.daysPerWeek.value /
    config.hoursPerDay.value
  )
  rateTable.monthly.daily = (
    baseDenomination /
    config.weeksPerMonth.value /
    config.daysPerWeek.value
  )
  rateTable.monthly.weekly = (
    baseDenomination /
    config.weeksPerMonth.value
  )
  rateTable.monthly.monthly = baseDenomination
  rateTable.monthly.yearly = (
    baseDenomination *
    config.monthsPerYear.value
  )

  // Calculate yearly rate values.
  rateTable.yearly = {}
  rateTable.yearly.hourly = (
    baseDenomination /
    config.monthsPerYear.value /
    config.weeksPerMonth.value /
    config.daysPerWeek.value /
    config.hoursPerDay.value
  )
  rateTable.yearly.daily = (
    baseDenomination /
    config.monthsPerYear.value /
    config.weeksPerMonth.value /
    config.daysPerWeek.value
  )
  rateTable.yearly.weekly = (
    baseDenomination /
    config.monthsPerYear.value /
    config.weeksPerMonth.value
  )
  rateTable.yearly.monthly = (
    baseDenomination /
    config.monthsPerYear.value
  )
  rateTable.yearly.yearly = baseDenomination

  return rateTable
}

export default buildRateTable;

