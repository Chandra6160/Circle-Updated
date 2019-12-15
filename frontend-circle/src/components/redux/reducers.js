const ADD_RNAME = "ADD RNAME";

const initState = {
    rlist: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_RNAME:
            let ob = {
                name: action.rname,
                address: action.raddr
            }
            return {
                rlist: [...state.rlist,ob]
            }
        default:
            return state;
    }
}

export default reducer;