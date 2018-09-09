import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			activeRoomMessages: [],
			newMessageText: '',
      username: '',
      content: '',
      sentAt: '',
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
			this.setState({ messages: this.state.messages.concat( message ) },
			() => {
			this.activeRoomMessages(this.props.activeRoom);
      this.scrollToBottom();
			});
	    });

}

    createMessage(newMessageText) {
		if (!this.props.activeRoom || !newMessageText) { return; }
		var timestamp = new Date().toLocaleTimeString('en-US', { day: 'numeric', hour: 'numeric', hour12: true, minute: 'numeric' });
		this.messagesRef.push({
			content: newMessageText,
			sentAt: timestamp,
		  roomId: this.props.activeRoom.key,
      username: this.props.user ? this.props.user.displayName : 'Guest',
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
      <p className = "display-name">{message.username}</p>
      <p><span>{message.content } </span>
			<span id = "Time-posted">{ " " + message.sentAt}</span>
			</p>

      </div>
      </li>
    ))}

     </ul>

   <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessageText); } }>
   <textarea value={ this.state.newMessageText } onChange={ this.handleChange.bind(this) }  name="newMessageText" placeholder=" Post a message here"/>
   <input type='submit' value="Submit"/>

	</form>
<div ref={thisDiv => (this.bottomOfMessages = thisDiv)} />
</main>
   );
 }
}

export default MessageList;
