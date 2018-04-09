import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';

import Page from './Page';
import Nav from './Nav';

import * as AppActions from './actions/App.js';

const pagenames = ['get_word', 'build_tree', 'encode'];
const steps = ['Вычисление частот символов', 'Построение дерева для получения кодов', 'Кодирование строки'];

class App extends Component {
    render() {
        const { curPage, AppActions, maxPage, word, letters, nums, nodes, treeStep, showCodes, codes, lt, showEncode } = this.props;
        return (
            <div className="app">
                <Page letters={letters} 
                        nums={nums} 
                        nodesS={nodes} 
                        curPage={curPage} 
                        setLetters={AppActions.setLetters} 
                        word={word} 
                        setNodes={AppActions.setNodes} 
                        setTreeStep={AppActions.setTreeStep} 
                        treeStep={treeStep} 
                        changeWord={AppActions.changeWord} 
                        setCodes={AppActions.setCodes}
                        getCodes={AppActions.getCodes}
                        codes={codes}
                        lt={lt}
                        showCodes={showCodes}
                        showEncode={showEncode}
                        getEncode={AppActions.getEncode}
                        phase={pagenames[curPage - 1]}/>
                <Nav curPage={curPage} maxPage={maxPage} codes={codes} changePage={AppActions.changePage} letters={letters} step={steps[curPage - 1]}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        AppActions: bindActionCreators(AppActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
