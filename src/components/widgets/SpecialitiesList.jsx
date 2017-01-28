import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

// import CSSModules from 'react-css-modules';
// import styles     from './QuestionTable.less';
@inject('specialitiesStore')
// @CSSModules(styles)
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        viewStore     : MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    @observable editIndex = '';
    @observable editedValue = {};
    handleClickEdit = (index) => {
        this.editIndex = index;
        console.log(index);
    }

    handleChange = (index, e) => {
        this.editedValue[index] = e.target.value;
        console.log(this.editedValue);
        this.forceUpdate(); // запитати як забрати !!!!!!!!!!!
    }

    handleClickSave = async (index, id) => {
        const { updateSpeciality } = this.props.specialitiesStore;
        await updateSpeciality(id, { title : this.editedValue[index]});
        this.editIndex = -1;
    }
    handleClickDelete = async (id) => {
        console.log(id);
        const { deleteSpeciality } = this.props.specialitiesStore;
        await deleteSpeciality(id);
    }

    // componentWillMount() {
    //     this.renderQuestionsList();
    // }
    //
    // handleEditQuestion = id => {
    //     const { viewStore, questionsStore } = this.props;
    //
    //     questionsStore.setCurrentQuestion(id);
    //     viewStore.setCurrentPage('edit');
    // }
    //
    renderSpecialitiesList() {
        const { specialities } = this.props;

        return specialities
            .map((speciality, i) => {
            return (
                <tr
                    key={speciality.id}
                >
                    <th scope='row'>{i}</th>
                    <td>
                        <input
                            type='text'
                            disabled={ i === this.editIndex ? false : true}
                            defaultValue={speciality.title}
                            onChange = {this.handleChange.bind(this, i)}
                        >
                        </input>
                    </td>
                    <td
                        // onTouchTap={this.handleEditQuestion.bind(this, speciality.id)}
                        // styleName='edit'
                    >
                        {
                            i === this.editIndex
                            ?
                            <button
                                onClick={this.handleClickSave.bind(this, i, speciality.id)}
                                disabled= { this.editedValue[i] ? false : true}
                            >Save</button>
                            :
                            <button onClick={this.handleClickEdit.bind(this, i)}>Edit</button>
                        }
                        <button onClick={this.handleClickDelete.bind(this, speciality.id)}>Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { questions } = this.props;

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Specialty Name</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderSpecialitiesList() }
                </tbody>
            </table>
        );
    }
}
