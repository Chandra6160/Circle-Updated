const ADD_RNAME= "ADD RNAME";


const add_details=rname => {
    return {
        type:ADD_RNAME,
        rname:rname.name,
        raddr:rname.addr,
    };
};

export { add_details}