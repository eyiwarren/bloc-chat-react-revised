import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import './components/MessageList.css';
import User from './components/User';



var config = {
    apiKey: "AIzaSyDT5moRPuBtWcSK77p_WqTkIH70Ssb2F9k",
    authDomain: "bloc-chat-f0dab.firebaseapp.com",
    databaseURL: "https://bloc-chat-f0dab.firebaseio.com",
    projectId: "bloc-chat-f0dab",
    storageBucket: "bloc-chat-f0dab.appspot.com",
    messagingSenderId: "893150501510"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    activeRoom: null,
    user: null
    };
  }

  setRoom(room) {
  this.setState({activeRoom: room});
  }

  setUser(user) {
    this.setState({user: user})
    console.log(user);
  }

  render() {
    const activeUser = this.state.user === null ? 'Guest' : this.state.user.displayName;
    return (
          <div className="App">
          <div>
          <User firebase={firebase} setUser={this.setUser.bind(this)} activeUser={activeUser} />
          </div>
          <aside id="sidebar">
          <h1 id="subtitle">Bloc Chat</h1>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setRoom={this.setRoom.bind(this)} />
        </aside>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={activeUser} />

      </div>
    );
  }
}

export default App;
