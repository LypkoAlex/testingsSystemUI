import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules               from 'react-css-modules';
import styles                   from './ExamsPage.less';

@inject('viewStore') @observer @CSSModules(styles)
export default class ExamsPage extends Component {
    static propTypes = {
        viewStore: MobxTypes.observableObject
    };

    render() {
        return (
            <div styleName='ExamsPage'>
                Exams
            </div>
        );
    }
}
