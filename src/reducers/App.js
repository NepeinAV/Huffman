export const initialState = {
    curPage: 1,
    maxPage: 3,
    word: 'Математика',
    letters: [],
    nums: [],
    codes: [],
    lt: [],
    treeStep: 6,
    showCodes: 0
};

export const App = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE':
            return {
                ...state,
                curPage: action.pageNum
            }
        case 'CHANGE_WORD':
            return {
                ...state,
                word: action.word
            }
        case 'SET_LETTERS':
            return {
                ...state,
                letters: action.letters,
                nums: action.nums
            }
        case 'SET_TREE_STEP':
            return {
                ...state,
                treeStep: action.step
            }
        case 'GET_CODES':
            return {
                ...state,
                showCodes: action.showCodes
            }
        case 'SET_CODES':
            return {
                ...state,
                codes: action.codes,
                lt: action.lt
            }
        default:
            return state;
    }
};