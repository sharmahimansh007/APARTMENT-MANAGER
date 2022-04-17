  import { LOGOUT, LOGIN } from "./Action";

  const startCondition = {
      isLoggedIn:false,
      user:null
  }

  const Reducer = (state = startCondition, action) => {
      switch(action.typr) {
          case LOGIN:
              return{
                  ...state,
                  user: action.payload,
                  isLoggedIn : true
              }

          case LOGOUT:
              return{
                  ...state,
                  isLoggedIn : false,
                  user : null,
              }

          default:
              return state;
      }
  }
  

export {Reducer}
