let localDB = { 
    set : (param1, param2) => {
        localStorage.setItem(param1, param2)
    },
    get : (param1, param2) => {
        localStorage.getItem(param1, param2)
    },
    remove : (param1, param2) => {
        localStorage.removeItem(param1, param2)
    } 
}

module.exports = {
    localDB:localDB
}