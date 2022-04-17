
const LOGIN = "LOGIN", LOGOUT = "LOGOUT";

const logoutReq = () => {
    return {
        type : LOGOUT
    }
}

const loginReq = (user) => {
    return {
        type:LOGIN,
        payload:user
    }
}

export { logoutReq, loginReq, LOGIN, LOGOUT }