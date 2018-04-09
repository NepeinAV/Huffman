export function changePage(pageNum) {
    return {
        type: 'CHANGE_PAGE',
        pageNum: pageNum
    }
}

export function changeWord(word) {
    return {
        type: 'CHANGE_WORD',
        word: word
    }
}

export function setLetters(letters, nums) {
    return {
        type: 'SET_LETTERS',
        letters: letters,
        nums: nums
    }
}

export function setTreeStep(step) {
    return {
        type: 'SET_TREE_STEP',
        step: step
    }
}

export function setCodes(codes, lt) {
    return {
        type: 'SET_CODES',
        codes: codes,
        lt: lt
    }
}

export function getCodes(show) {
    return {
        type: 'GET_CODES',
        showCodes: show
    }
}