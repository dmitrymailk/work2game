import React, { Component } from 'react';
// import './style/normalize.css';
import { connect } from 'react-redux';
import { store } from './store';
import './App.css';
import Profile from './components/Profile/Profile'
import Chats from './components/Chats/Chats'
import Tasks from './components/Tasks/Tasks'
import Relax from './components/Relax/Relax'
import Shop from './components/Shop/Shop'
import MainFund from './components/MainFund/MainFund'

class App extends Component {

  render() {
      // if(this.accessFunc()){
         
          switch(store.getState().sectionApp.section){
            case 0: return <MainFund component={<Profile />} />
            case 1: return <MainFund component={<Chats />} />
            case 2: return <MainFund component={<Tasks />} />
            case 3: return <MainFund component={<Relax />} />
            case 4: return <MainFund component={<Shop />} />
            case 5: return <MainFund component={<Profile />} />
            default: return <MainFund component={<Profile />} />
          }
    
  }
}
export default connect(
  state => ({state}),
  dispatch =>({}))(App);
