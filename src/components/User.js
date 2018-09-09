import React, { Component } from 'react';
import './User.css';


class User extends Component {
    constructor(props) {
        super(props)

        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);

    }

    logIn() {

            const provider = new this.props.firebase.auth.GoogleAuthProvider();
            this.props.firebase.auth().signInWithPopup(provider);

}
    logOut() {
        this.props.firebase.auth().signOut();

    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    render() {
    const str = this.props.user ? this.props.user.displayName.split(' ')[0] : 'Guest';
      var chatuser = str.toUpperCase();

        return (
            <section>
                <div className="greeting">
                    <p>Welcome, { chatuser }!</p>

                        <button className="log-in" onClick={() => this.logIn()}>Log in</button>
                        :
                        <button className="log-out" onClick={() => this.logOut()}>Log out</button>
                    }

                </div>
            </section>

        );
    }
}

export default User;
