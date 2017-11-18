import React from 'react';
import {
Text,
View,
Platform,
StyleSheet,
} from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import  reducer  from './reducers'
import History from './components/History'
import { TabNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }））

// the name of tab is history and component rendered is History
// second Argument is to specify some options for things like how they look and what noy

export default class App extends React.Component {

  render() {

    return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <View style={{height:20}} />
         <Tabs />
      </View>
    </Provider>
    );
  }
}
// View {flex 1} takes up all the available space on the phone
// so, any children components expand the full size of phone.
{/* <Ionicons name='ios-pizza' color='red' size={100}/> */}
