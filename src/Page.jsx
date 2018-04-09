import React, { Component } from 'react';

import GetWord from './GetWord';
import BuildTree from './BuildTree';
import Encode from './Encode';


class Page extends Component {
    getPage(phase) {
        const { word, changeWord, setLetters, letters, nums, nodesS, setNodes, setTreeStep, treeStep, setCodes, getCodes, showCodes, codes, lt } = this.props;
        // console.log(nodesS, 'nodesS');
        switch (phase) {
            case 'get_word':
                return <GetWord word={word} changeWord={changeWord} setLetters={setLetters} setTreeStep={setTreeStep} getCodes={getCodes} setCodes={setCodes}/>;
            case 'build_tree':
                return <BuildTree letters={letters} nums={nums} nodesS={nodesS} setTreeStep={setTreeStep} treeStep={treeStep} setNodes={setNodes} setCodes={setCodes} getCodes={getCodes} showCodes={showCodes}/>;
            case 'encode':
                return <Encode word={word} codes={codes} lt={lt}/>
            default:
                return 'def';
        }
    }

    render() {
        const { phase } = this.props;
        return (
            <div className="page">
               {this.getPage(phase)}
            </div>
        );
    }
}

export default Page;