import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			activeRoomMessages: [],
			newMessageText: '',
      username: 'Guest',
      roomId: '',
		};
		this.messagesRef = this.props.firebase.database().ref('messages');
	}


	activeRoomMessages(activeRoom) {
			if (!activeRoom) {return;}
			this.setState(
				{ activeRoomMessages: this.state.messages.filter(message => message.roomId === activeRoom.key) },
				() => this.scrollToBottom()
			);
		}

		componentWillReceiveProps(nextProps) {
				this.activeRoomMessages(nextProps.activeRoom);
			}

    componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat( message ) });
			this.activeRoomMessages(this.props.activeRoom);
				this.scrollToBottom();
			});
	}

    createMessage(newMessageText) {
		if (!this.props.activeRoom || !newMessageText) { return; }
		this.messagesRef.push({
			content: newMessageText,
			sentAt: Date(),
		  roomId: this.props.activeRoom,
    username: this.state.username,
    });
  this.setState({ newMessageText: '' });
}

handleChange(event) {
		this.setState({newMessageText: event.target.value });
	}

	scrollToBottom() {
		this.bottomOfMessages.scrollIntoView();
	}

  render() {
		return (
      <main id="messages-component">
      <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
      <ul id="message-list">
    {this.state.activeRoomMessages.map(message => (
      <li key={message.key} >

      <div className="content">
      {message.username}: {message.content }

      {" " + message.sentAt}
      </div>
      </li>
    ))}
     </ul>

   <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessageText); } }>
   <textarea value={ this.state.newMessageText } onChange={ this.handleChange.bind(this) }  name="newMessageText" placeholder="Post a message here"/>
   <input type='submit'/>
	</form>
<div ref={thisDiv => (this.bottomOfMessages = thisDiv)} />
</main>
   );
 }
}

export default MessageList;
