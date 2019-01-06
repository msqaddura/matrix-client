import React, { Component } from 'react';
import { socketService } from '../../services/SocketService';
class Sender extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    //trim leading spaces
        this.setState({ value: event.target.value.replace(/^\s+/g, '') });
    }

    handleSubmit(event) {
        event.preventDefault();
        socketService.sendMessage(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        return (
            <form className="d-flex chat-sender" onSubmit={this.handleSubmit}>
                <div className="flex-grow-1">
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input type="submit" value="Submit" disabled={!this.state.value} />
                </div>
            </form>
        );
    }
}
export { Sender };
