import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

class History extends Component {
  componentDidMount() {
    const { dispatch }　= this.props
    fetchCalendarResults()
    .then((entries) => dispatch(receiveEntries(entries)))
    .then(({ entries }) => {
      // This means that if I have not entered any information in for the current day
      // if it is false, dispatch addentry pass it [timeToString()]: getDailyReminderValue()
      // and we display today:  "👋 Don't forget to log your data today!"
      // in order to do that, we need to go ahead and add that as a property on our state under the key today
      if (!entries[timeToString]) {
      dispatch(addEntry({
        [timeToString()]: getDailyReminderValue()
      }))
    }
    })
  }
// what this item {today, ...metrics} is either run:0, bike:10 etc
// or today:  "👋 Don't forget to log your data today!"
// it depends of whatever's in our redux state for that specific day.
// by (), we get that implicite return
renderItem = ({ today, ...metrics }, formattedDate, key) => (
  <View>
    {today
      ? <Text>{JSON.stringify(today)}</Text>
      : <Text>{JSON.stringify(metrics)}</Text>}
  </View>
)
// we don't need to use => function because we don't use "this" keyword
// if the specific item in our redux for the day is null,
renderEmptyDate(formattedDate) {
 return (
   <View>
     <Text>No Data for this day</Text>
   </View>
 )
}

  render() {
    // console.log(this.props)
    // {entries: {…}, dispatch: ƒ}
    // dispatch: ƒ dispatch(action)
    // entries: {2017-03-21: null, 2017-03-22: null, 2017-03-23: null, 2017-03-24: null, 2017-03-25: null, …}
    const { entries } = this.props
    // when calender renders, if we've entered in information for specific day,
    // get the view of renderItem, if not, renderEmptyDate
    return (

        <UdaciFitnessCalendar
          items={entries}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
        />
    )
  }
}

function mapStateToProps(entries) {
  return {
    entries
  }
}


export default connect(mapStateToProps)(History)
