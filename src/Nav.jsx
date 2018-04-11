import React, { Component } from 'react';

class Back extends Component {
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }
    
    back(e) { 
        console.log(e);      
        const { curPage, changePage } = this.props;
        if (curPage >= 2) changePage(curPage - 1);
    }

    render() {
        const { curPage } = this.props;
        if (curPage > 1) return (<div className="back" onClick={this.back} title="Назад"></div>);
        else return '';
    }
}

class Forward extends Component {
    constructor(props) {
        super(props);
        this.forward = this.forward.bind(this);
    }

    forward(e) {
        const { curPage, changePage, letters, codes } = this.props;
        if (curPage === 1 && letters.length > 0) changePage(curPage + 1);
        if (curPage === 2 && codes.length > 0) changePage(curPage + 1);
    }

    render() {
        const { curPage, maxPage } = this.props;
        if (curPage < maxPage) return (<div className="forward" onClick={this.forward} title="Вперёд"></div>);
        else return '';
    }
}

class Nav extends Component {
    componentDidMount() {
        window.addEventListener('keyup', (e) => {
            if(e.keyCode === 37) this.back();
            if(e.keyCode === 39) this.forward();
        });
    }
    
    forward(e) {
        const { curPage, changePage, letters, codes } = this.props;
        if (curPage === 1 && letters.length > 0) changePage(curPage + 1);
        if (curPage === 2 && codes.length > 0) changePage(curPage + 1);
    }
    
    back(e) {    
        const { curPage, changePage } = this.props;
        if (curPage >= 2) changePage(curPage - 1);
    }

    render() {
        const { curPage, changePage, maxPage, step, letters, codes } = this.props;        
        return (
            <div className="navigation">
                <div className="buttons">
                    <Back curPage={curPage} changePage={changePage}/>
                    <Forward curPage={curPage} changePage={changePage} maxPage={maxPage} letters={letters} codes={codes}/>
                </div>
                <div className="title">{step}</div>
            </div>
        );
    }
}

export default Nav;