import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar, Panel, Modal } from 'react-bootstrap';

@inject('authStore') @observer
export default class TestPage extends Component {
    @observable password = '';
    @observable login    = '';

    static propTypes = {
        testStore : MobxTypes.observableObject
    };

    handleChangeLogin = (e) => {
        this.login = e.target.value;
    }

    handleChangePassword = (e) => {
        this.password = e.target.value;
    }

    handleSignIn = () => {
        const { auth } = this.props.authStore;
        auth({
            login : this.login,
            password : this.password
        });
    }

    render() {
        return (
            <Row>
                <Col md={4} mdOffset={4}>
                    <Panel>
                        <FormControl
                            onChange    = {this.handleChangeLogin}
                            type        = 'text'
                            placeholder = 'login'>
                        </FormControl>
                        <FormControl
                            onChange = {this.handleChangePassword}
                            type     = 'password' placeholder='pasword'>
                        </FormControl>
                        <Button
                            className = 'questionForm pull-right'
                            disabled  = {!(this.password && this.login)}
                            onClick   = {this.handleSignIn}
                        >SignIn</Button>
                    </Panel>
                </Col>
            </Row>
        );
    }
}
