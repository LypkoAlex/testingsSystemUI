import React, { Component, PropTypes }              from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable }                               from 'mobx';

import CSSModules               from 'react-css-modules';
import styles                   from './SpecialityPage.css';

import SpecialitiesList from '../widgets/SpecialitiesList.jsx'
@inject('specialitiesStore') @observer @CSSModules(styles)
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
            <div styleName='SpecialityPage'>
                <button onClick={this.handleAddSpeciality}>Add Speciality</button>
                {
                    this.adding ?
                        <div>
                            <input defaultValue={this.newSpeciality} onChange={this.handleChangeNew}></input>
                            <button onClick={this.handleAddNew}>Add</button>
                        </div>
                    :
                    null
                }
                <SpecialitiesList
                    specialities = {specialities}
                />
            </div>
        );
    }
}
