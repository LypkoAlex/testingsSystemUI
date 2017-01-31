import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
@inject('testStore') @observer
export default class TestPage extends Component {
    @observable testId = '';
    static propTypes = {
        testStore : MobxTypes.observableObject
    };

    handleChangeTestId = (e) => {
        this.testId = e.target.value;
    }

    render() {
        const { question } = this.props.testStore;
        return (
            <Row>
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={12}>
                            <FormControl
                                className='feedbackTextArea'
                                placeholder='enter test id'
                                onChange={this.handleChangeTestId}
                                value={this.testId}
                            />
                            <Link
                                className='btn btn-default feedbackTextArea pull-right'
                                to={'/test/' + this.testId}
                                disabled={!this.testId}
                            >
                                Restore
                            </Link>
                        </Col>
                    </Panel>
                </Col>
            </Row>
        );
    }
}
