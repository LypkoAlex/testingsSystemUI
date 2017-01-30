import React, { Component, PropTypes }              from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable }                               from 'mobx';

import { FormGroup, Col, FormControl, InputGroup, Button, Row } from 'react-bootstrap';

import SpecialitiesList from '../widgets/SpecialitiesList.jsx'
@inject('specialitiesStore') @observer
export default class SpecialityPage extends Component {
    static propTypes = {
        specialitiesStore: MobxTypes.observableObject
    };
    @observable newSpeciality;
    @observable adding;

    async componentWillMount () {
        const { specialitiesStore } = this.props;
        await specialitiesStore.fetchSpecialities();
        console.log(specialitiesStore);
    }

    handleChangeNew = (e) => {
        this.newSpeciality = e.target.value;
    }

    handleAddNew = async () => {
        const { createSpeciality } = this.props.specialitiesStore;
        await createSpeciality({ title : this.newSpeciality });
        this.adding = false;
        this.newSpeciality = '';
    }

    handleAddSpeciality = () => {
        this.adding = !this.adding;
    }

    render() {
        const { specialities } = this.props.specialitiesStore
        return (
            <Row>
                <Col md={6} mdOffset={3}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                placeholder='New Speciality'
                                type="text"
                                value={this.newSpeciality} onChange={this.handleChangeNew}
                            />
                            <InputGroup.Button>
                                <Button
                                    onClick={this.handleAddNew}
                                    disabled={!this.newSpeciality}
                                >Add</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md={8} mdOffset={2}>
                    <SpecialitiesList
                        specialities = {specialities}
                    />
                </Col>
            </Row>
        );
    }
}
