import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar, Panel, Modal } from 'react-bootstrap';

@inject('feedback') @observer
export default class TestPage extends Component {
    @observable text        = '';
    @observable email       = '';
    @observable name        = '';
    @observable isShowModal = false;
    static propTypes = {
        testStore : MobxTypes.observableObject
    };

        modalControl = () => {
        this.isShowModal = !this.isShowModal;
    }

    handleChangeName = (e) => {
        this.name = e.target.value;
    }

    handleChangeText = (e) => {
        this.text = e.target.value;
    }

    handleChangeEmail = (e) => {
        this.email = e.target.value;
    }

    sendFeedback = () => {
        const { sendFeedback } = this.props.feedback;
        sendFeedback({
            email : this.email,
            text  : this.text
        });
        this.modalControl();
    }

    render() {
        return (
            <Row>
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={6}>
                            <FormControl
                                placeholder='Email'
                                value={this.email}
                                onChange={this.handleChangeEmail}
                            />
                        </Col>
                        <Col md={6}>
                            <FormControl
                                value={this.name}
                                onChange={this.handleChangeName}
                                placeholder='Name'
                            />
                        </Col>
                        <Col md={12}>
                            <FormControl
                                className='feedbackTextArea'
                                placeholder='Text'
                                componentClass='textarea'
                                value={this.text}
                                onChange={this.handleChangeText}
                            />
                            <Button
                                className='feedbackTextArea pull-right'
                                onClick={this.sendFeedback}
                                disabled={!(this.email && this.name && this.text)}
                            >
                                SEND
                            </Button>
                        </Col>
                    </Panel>
                </Col>
                <Modal show={this.isShowModal} onHide={this.modalControl}>
                    <Modal.Header closeButton>
                        <h4 className='alignCenter'>Thanks for feedback.</h4>
                    </Modal.Header>
                </Modal>
            </Row>
        );
    }
}
