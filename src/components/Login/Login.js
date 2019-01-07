import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    get isDisabled() {
        return !this.state.value || this.props.nopermit;
    }
    handleChange(event) {
    //trim the spaces leading aand trailing
        this.setState({ value: event.target.value.trim() });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.join(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        return (
            <div className="d-flex align-items-center full-area">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Username..."
                    />
                    <br />
                    <input type="submit" value="Join as Guest " disabled={this.isDisabled} />
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    join: PropTypes.func,
    nopermit: PropTypes.bool
};

export { Login };
