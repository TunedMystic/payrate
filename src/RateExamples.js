import React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './RateExamples.css'


class RateExamples extends React.Component {
  constructor() {
    super()
    this.state = {
      hourlyRates: ['10', '20', '30']
    }
  }

  render() {
    const makeTableRow = (hourlyRate) => {
      const rowValues = this.props.makeRateValues(hourlyRate)
      return (
        <TableRow key={hourlyRate}>
        {
          this.props.denominations.map(denomination => (
            <TableRowColumn key={denomination}>$ {rowValues[denomination]}</TableRowColumn>
          ))
        }
        </TableRow>
      )
    }

    return (
      <div className="rate-examples-group">
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Hourly</TableHeaderColumn>
              <TableHeaderColumn>Daily</TableHeaderColumn>
              <TableHeaderColumn>Weekly</TableHeaderColumn>
              <TableHeaderColumn>Monthly</TableHeaderColumn>
              <TableHeaderColumn>Yearly</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.hourlyRates.map(hourlyRate => makeTableRow(hourlyRate))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default RateExamples
