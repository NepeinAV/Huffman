import React, { Component } from 'react';

let letters = [],
    nums = [];

class GetWord extends Component {
    componentWillMount(){
        this.calculateLetters(this.props.word);
    }

    calculateLetters(word){
        letters = [];
        nums = [];
        for (let i = 0; i < word.length; i++) {
            let push = true;
            let letter = word[i];
            for (let j = 0; j < letters.length; j++) {
                if (letter === letters[j]){
                    nums[j]++;
                    push = false;
                    break;
                }
            }
            if (push) {
                letters.push(letter);
                nums.push(1);
            }
        }
        this.props.setLetters(letters, nums);
    }

    showLetters(){
        let table = letters.map((letter, index, arr) => {
            return (<div className="letter" key={index}>{(letter === ' ') ? 'sp' : letter}<div className="num">{nums[index]}</div></div>);
        });
        return table;
    }

    render() {
        const { word, changeWord, setTreeStep, getCodes, setCodes } = this.props;
        return (
            <div className="getwordpage" style={
                {
                    'top': (letters.length === 0) ? '50%' : 0,
                    'marginTop': (letters.length === 0) ? '-20px' : 0
                }
            }>
                <input type="text" className="inputword" style={
                    {
                        'width': (letters.length !== 0) ? 400 : 300
                    }
                } onChange={
                    (e) => {
                        changeWord(e.target.value);
                        setTreeStep(0);
                        getCodes(0);
                        setCodes([], []);
                        this.calculateLetters(e.target.value);
                    }
                } value={word} placeholder="Введите строку"/>
                <div className="letters" style={
                    {
                        'opacity': (letters.length !== 0) ? 1 : 0,
                        'transform': `scale(${(letters.length !== 0) ? 1 : 0.3})`
                    }
                }>{(letters.length !== 0) ? this.showLetters() : ''}</div>
            </div>
        );
    }
}

export default GetWord;