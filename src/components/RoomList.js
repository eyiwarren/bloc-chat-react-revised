import React, { Component } from 'react';
import './RoomList.css';


 class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    rooms: [],
    newRoomName: ''
  };

  this.roomsRef = this.props.firebase.database().ref('rooms');

}

createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: ''  });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
     const room = snapshot.val();
     room.key = snapshot.key;
     this.setState({ rooms: this.state.rooms.concat( room ) })

     });
   }

   render() {
       return (
         <section id="room-component">
          <ul id="room-list">
          {this.state.rooms.map( (room, key) => (
          <li key={room.key}>
          <button onClick={ () => this.props.setRoom(room) } className="room-name">{ room.name }</button>
        </li>
        ))}
      </ul>
      <div className="create-room-text">
      <form onSubmit={ (e) => this.createRoom(e) }>
          <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
          <input type="submit" value="Create New Room"/>
        </form>
        </div>
      </section>
   );
  }
}

export default RoomList;
