import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfoMessage extends Component {
    render() {
        return (
            <li className="chat-message is-info">
                <i className="fa fa-fire" />
                <span>
                    {' '}
                    <b> {this.props.username} </b>
                </span>
                <span>
                    {' '}
                    <span>{this.props.text} </span>
                </span>
            </li>
        );
    }
}

InfoMessage.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.string,
    username: PropTypes.string
};

export { InfoMessage };
