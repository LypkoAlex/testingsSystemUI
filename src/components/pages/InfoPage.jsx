import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

export default class InfoPage extends Component {
    @observable testId = '';
    static propTypes = {
        testStore : MobxTypes.observableObject
    };

    handleChangeTestId = (e) => {
        this.testId = e.target.value;
    }

    render() {
        return (
            <Row>
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <Col md={12}>
                            <b>1. Aim of this site :</b>
                        <br/>
                            After good study & preparing the website help you to test your knowledge level And pass the exam, the website let you feeling as you are in the real exam mode.
                        <br/>
                            <b>2. the site contents :</b>
                        <br/>
                            contains 4 speciality , Medicine , Dentistry , Pharmacy and Nursing.
                        <br/>
                            <b>3. Diffrences between study mode and Exam mode in the site :</b>
                        <br/>
                            Study mode : depends to which speciality & subject you want to test your self.
                            Exam mode : include limited questions through limited time , as you are in the real exam of your speciality.
                        <br/>
                            <b>4. Search button :</b>
                        <br/>
                            you can any time search for any information in your speciality by using word or multiple words as disease , symptom , sign or drug..etc.
                        <br/>
                            <b>5.Restore button :</b>
                        <br/>
                            if you are on training then you want to go bathroom , drink water or to sleep , you can save your question by click to "save button" which will be above
                            the question then will give you a "code" this code will let you contiunue training next day.
                        <br/>
                            <b>6.Feedback button :</b>
                        <br/>
                            if you have any comments , suggest or new questions & files would you share with us.
                        <br/>
                            <b>7. to join our team and work with us , please click <a href='https://docs.google.com/forms/d/e/1FAIpQLSexKCrs065sEllx7GMXL-50BrKdp79f89EFM3zqBtovH9Pfaw/viewform' target="_blank">here</a></b>
                        </Col>
                    </Panel>
                </Col>
            </Row>
        );
    }
}
