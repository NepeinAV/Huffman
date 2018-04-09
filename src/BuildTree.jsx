import React, { Component } from 'react';

let nodes = [];
let codes = [];
let lt = [];
let maxlvl = 0;

class Circle extends Component {
    render() {
        const { r, x, y } = this.props;
        return (
            <circle cx={x + '%'} cy={y} r={r} fill="#f9f9f9" className="svgcircle"/>
        );
    }
}

class Text extends Component {
    render() {
        const { x, y, className } = this.props;
        return (
            <text dx={x + '%'} dy={y} textAnchor="middle" className={className}>{this.props.children}</text>
        );  
    }
}

class Line extends Component {
    render() {
        const { x1, y1, x2, y2 } = this.props;
        return (
            <line x1={x1} x2={x2} y1={y1} y2={y2} style={{
                'stroke': '#404040',
                'strokeWidth': 0.5
        }} className="svgline"/>
        );
    }
}

class BuildTree extends Component {
    componentWillMount() {
        this.firstNodes();
        const { treeStep } = this.props;
        for (let i = 1; i <= treeStep; i++) {
            this.buildTree();
        }
    }

    sortNodes(){
        nodes = nodes.sort((a, b) => {
            if (a.num < b.num) return -1;
            if (a.num > b.num) return 1;
            return 0;
        });
    }

    firstNodes() {
        nodes = [];
        const { letters, nums } = this.props;
        letters.map((letter, index, arr) => {
            nodes.push({
                letter: letter,
                num: nums[index]
            });
            return false;
        });
        this.sortNodes();
    }

    buildTree() {
        const f = nodes.shift();
        const s = nodes.shift();
        nodes.unshift({
            num: f.num + s.num,
            '0': f,
            '1': s
        });
        this.sortNodes();
    }

    showNodes(){
        maxlvl = 0;
        let table = nodes.map((node, index, arr) => {
            let x = ((100/nodes.length) * index) + ((100/nodes.length)/2);
            return (
                <g key={index}>
                    {(node[0] && node[1]) ? this.drawTree([node[0], node[1]], x, 120, 0) : ''}
                    <Circle x={x} y="120" r="20" stroke="black" strokew="0.5"/>
                    <Text x={x} y="125" className="svgletter">{(node.letter === ' ') ? 'sp' : node.letter}</Text>
                    <Text x={x} y="85" className="svgnum">{node.num}</Text>
                </g>
            );
        });
        return table;
    }

    showCodes(){
        let table = lt.map((value, index, arr) => {
            return (<div className="lt" key={index}>{(value === ' ') ? 'sp' : value}<div className="code">{codes[index]}</div></div>);
        });
        return table;
    }

    readCodes(node, code, side) {
        if (side === 'left') code += '0';
        if (side === 'right') code += '1';
        if (node[0] !== undefined) this.readCodes(node[0], code, 'left');
        if (node[1] !== undefined) this.readCodes(node[1], code, 'right');
        if (node[0] === undefined && node[1] === undefined) {
            codes.push(code);
            lt.push(node.letter);
        }
    }

    drawTree(pair, x, y, level) {
        const lvl = level + 1;
        if (lvl > maxlvl) maxlvl = lvl;
        const lx = x - (100/nodes.length)/Math.pow(2, lvl) * 0.5;
        const rx = x + (100/nodes.length)/Math.pow(2, lvl) * 0.5;
        y += 50;
        return (
            <g className={'level' + lvl}>
                {(pair[0][0] && pair[0][1]) ? this.drawTree([pair[0][0], pair[0][1]], lx, y, lvl) : ''}
                <g className="levelhead">
                    <Line x1={x + '%'} y1={y - 50} x2={lx+ '%'} y2={y}/>
                    <Circle x={lx} y={y} r="20" stroke="black" strokew="0.5"/>
                    <Text x={lx} y={y + 5} className="svgletter">{(pair[0].letter === ' ') ? 'sp' : pair[0].letter}</Text>
                </g>

                {(pair[1][0] && pair[1][1]) ? this.drawTree([pair[1][0], pair[1][1]], rx, y, lvl) : ''}
                <g className="levelhead">
                    <Line x1={x + '%'} y1={y - 50} x2={rx+ '%'} y2={y}/>
                    <Circle x={rx} y={y} r="20" stroke="black" strokew="0.5"/>
                    <Text x={rx} y={y + 5} className="svgletter">{(pair[1].letter === ' ') ? 'sp' : pair[1].letter}</Text>
                </g>
            </g>
        );
    }

    render() {
        const { setTreeStep, treeStep, getCodes, showCodes, setCodes } = this.props;
        let svgsize = (maxlvl * 50 + 40 + 120);
        return (
            <div className="buildtreepage">
                <svg version="1.1" baseProfile="full" width="100%" height="100%" className={`svg ${(nodes.length === 1) ? '' : ''}`} xmlns="http://www.w3.org/2000/svg" style={{
                    'marginTop': (!showCodes) ? 0 : -svgsize * 0.6,
                    'opacity': (!showCodes) ? 1 : 0.5,
                }}>
                    {(nodes.length !== 0) ? this.showNodes() : ''}
                </svg>
                <div className="nextlevel" onClick={(nodes.length > 1) ? (e) => {
                    this.buildTree();
                    setTreeStep(treeStep + 1);
                } : (e) => {
                    codes = [];
                    lt = [];
                    this.readCodes(nodes[0], '', 'root');
                    setCodes(codes, lt);
                    getCodes(!showCodes);
                }
                }>{(nodes.length > 1) ? 'Далее' : (showCodes) ? 'Показать дерево' : 'Получить коды'}</div>
                <div className="codes" style={{
                    'opacity': (showCodes) ? '1' : '0',
                    'marginTop': (!showCodes) ? svgsize : svgsize * 0.4
                }}>
                    {this.showCodes()}
                </div>
            </div>
        );
    }
}

export default BuildTree;