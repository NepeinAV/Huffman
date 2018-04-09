import React, { Component } from 'react';

let did = false;

class Encode extends Component {
    componentDidMount() {
        did = true;
    }

    decbin(number) {
        if (number < 0) {
          number = 0xFFFFFFFF + number + 1
        }

        return parseInt(number, 10)
          .toString(2)
    }

    asciiEncode(word){
        let code = '';
        for (let i = 0; i < word.length; i++) {
            let decbin = word.charCodeAt(i);
            if (decbin > 0xFF) decbin -= 0x350;
            decbin = this.decbin(decbin);
            for (let j = 0; j < 8 - decbin.length; j++) decbin = '0' + decbin;
            code += decbin;
        } 
        return code;
    }

    encodeWord(word){
        const { codes, lt } = this.props;
        let code = '';
        for (let i = 0; i < word.length; i++) {
            code += codes[lt.indexOf(word[i])];
        }
        return code;
    }

    splitCode(code){
        let newcode = '';
        for(let i = 0; i < code.length; i += 4) {
            newcode += code.substr(i, 4) + ' ';
        }
        return newcode;
    }

    render() {
        const { word } = this.props;
        let code = this.encodeWord(word);
        let ascii = this.asciiEncode(word);
        let percent = 100 - Math.round(code.length/ascii.length * 100);
        let p = 2 * Math.PI * 50;
        console.log(p);
        return (
            <div className="encodepage">
                <div className="leftcode">Исходная строка<div className="size">{ascii.length} bit</div></div>
                <div className="percent">
                <svg version="1.1" baseProfile="full" viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
                    {100 - Math.round(code.length/ascii.length * 100)}%
                    <circle cx="53" cy="53" r="50" stroke="#4a76a8" strokeLinecap="round" strokeDasharray="0 314.1592653589793" strokeWidth="6" fill="transparent" className="dash">
                        <animate attributeType="CSS" attributeName="stroke-dasharray" from="0 314.1592653589793" to={`${p / 100 * percent}, ${p - p / 100 * percent}`} dur="0.5s" fill="freeze" repeatCount="1"/>
                    </circle>
                    <text dy="59" dx="53" textAnchor="middle" className="percenttext">{percent}%</text>    
                </svg>
                </div>
                <div className="rightcode">После сжатия<div className="size">{code.length} bit</div></div>     
            </div>
        );
    }
}

export default Encode;