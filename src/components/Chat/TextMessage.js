import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextMessage extends Component {
    render() {
        return (
            <li className="chat-message is-text">
                <i className="fa fa-envelope" />
                <span className="chat-message-time">
                    {' '}
          ({new Date(this.props.timestamp).toLocaleTimeString()})
                </span>
                <span className="chat-message-username">
                    {' '}
                    <b>{this.props.username}</b>{' '}
                </span>{' '}
        :
                <span className="chat-message-text">
                    {' '}
                    <i> {this.props.text}</i>
                </span>
            </li>
        );
    }
}

TextMessage.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.string,
    username: PropTypes.string
};

export { TextMessage };
