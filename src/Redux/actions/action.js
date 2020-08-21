export const FETCH = items => {
    return {
        type : 'FETCH',
        cart_items : items
    }
}

export const ADD_CART_COUNT = () => {
    return {
        type : 'ADD'
    }
}

export const DEC_CART_COUNT = () => {
    return {
        type : 'DEC'
    }
}

export const ADD_CART_ITEMS = items => {
    return {
        type : 'ADD_CART_ITEMS',
        payload : items
    }
}

export const REMOVE = items => {
    return {
        type : 'REMOVE',
        cart_items : items
    }
}

export const ADD_MENU_LIST = items => {
    return {
        type : 'ADD_MENU_LIST',
        payload : items
    }
}

export const VIEW_SINGLE = items => {
    return {
        type : 'VIEW_SINGLE',
        payload : items
    }
}

export const FETCH_ALL = () => {
    return {
        type : 'FETCH_ALL'
    }
}

export const DELETED = q => {
    return {
        type : 'A-1'
    }
}

export const DELETED_2 = q => {
    return {
        type : 'A-2',
        payload : q
    }
}

export const QTY = q => {
    return {
        type : 'A-3',
        payload : q
    }
}

export const QTY_2 = q => {
    return {
        type : 'A-4',
        payload : q
    }
}