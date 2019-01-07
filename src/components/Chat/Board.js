import React, { Component } from 'react';
import { TextMessage } from './TextMessage';
import { InfoMessage } from './InfoMessage';
import { Sender } from './Sender';
import PropTypes from 'prop-types';
import { MESSAGE_TYPES } from '../../common/MessageTypes';
import { socketService } from '../../services/SocketService';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    onLeave() {
        socketService.leave();
    }

    render() {
        return (
            <div className="full-area full-flex">
                <header>
                    <button onClick={this.onLeave.bind(this)}>
                        <i className="fa fa-close fa-lg" />
                    </button>
                    <h2>{this.props.username}</h2>
                </header>
                <main className="flex-stretch">
                    <ul className="chat-list">
                        {this.props.messages.map((message, index) => {
                            if (message.type === MESSAGE_TYPES.MESSAGE) {
                                return (
                                    <TextMessage
                                        key={index}
                                        timestamp={message.timestamp}
                                        username={message.username}
                                        text={message.text}
                                    />
                                );
                            } else {
                                return (
                                    <InfoMessage
                                        key={index}
                                        timestamp={message.timestamp}
                                        username={message.username}
                                        text={message.text}
                                    />
                                );
                            }
                        })}
                    </ul>
                </main>
                <footer>
                    <Sender />
                </footer>
            </div>
        );
    }
}
Board.propTypes = {
    messages: PropTypes.array,
    username: PropTypes.string,
    leave: PropTypes.func
};

export { Board };
