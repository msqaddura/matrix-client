import React, { Component } from 'react';
import { Login } from './components/Login/Login';
import { Board } from './components/Chat/Board';
import { socketService } from './services/SocketService';
/**
 * mixture of flyweight & component
 * most of the logic is done here specially the sockets & "routing"
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            online: false,
            messages: [],
            isPending: false,
            error: false
        };
    }

    join(username) {
        this.setState({ isPending: true, error: false });
        const socket = socketService.connect(username);
        socket
            .on('open', data => {
                console.log(`open ${data}`);
            })
            .on('error', error => {
                console.error(error);
                this.setState({ error: ' Server Error ' });
            })
            .on('connect_error', () => {
                this.setState({ error: ' Connection Error ', isPending: false });
            })
            .on('joined', message => {
                this.setState({
                    username: message.username,
                    online: true,
                    isPending: false,
                    messages:[]
                });
            })
            .on('message', message => {
                this.setState({ messages: this.state.messages.concat(message) });
            })
            .on('connect', () => {
                socketService.join(username);
            })
            .on('conflict', () => {
                this.setState({ error: ' User Exists, Try new name ' });
                socket.close();
            })
            .on('timeout', () => {
                this.setState({ error: ' You were kicked due to inactivity ' });
            })
            .on('shutdown', () => {
                this.setState({ error: ' Server was shutdown ' });
            })
            .on('disconnect', () => {
                this.setState({ username: null, online: false, messages: [] });
            });
    }

    render() {
        const { online, username, messages, error } = this.state;

        return (
            <div className="full-area">
                {online ? (
                    <Board messages={messages} username={username} />
                ) : (
                    <Login join={this.join.bind(this)} />
                )}
                {error ? (
                    <div className="fixed-bottom error-console">
                        <p> 
                            <i className="fa fa-warning" />
                            {error}
                            <i className="fa fa-warning" />
                        </p>
                    </div>
                ) : null}
            </div>
        );
    }
}

export { App };
