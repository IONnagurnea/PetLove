import React, { createContext, useEffect, useReducer } from "react";


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    stripeStatus: JSON.parse(localStorage.getItem("stripeStatus")) || false,
    paypalStatus: JSON.parse(localStorage.getItem("paypalStatus")) || false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
                stripeStatus: false,
                paypalStatus: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
                stripeStatus: false,
                paypalStatus: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
                stripeStatus: false,
                paypalStatus: false,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
                stripeStatus: false,
                paypalStatus: false,
            };
        case "STRIPE_SUCCESS":
            return {
                user: JSON.parse(localStorage.getItem("user")),
                loading: false,
                error: null,
                stripeStatus: true,
                paypalStatus: false,
            };
        case "PAYPAL_SUCCESS":
            return {
                user: JSON.parse(localStorage.getItem("user")),
                loading: false,
                error: null,
                stripeStatus: false,
                paypalStatus: true,
            };
        case "CONTACT_HIDE": 
            return {
                user: JSON.parse(localStorage.getItem("user")),
                loading: false,
                error: null,
                stripeStatus: false,
                paypalStatus: false,
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("stripeStatus", JSON.stringify(state.stripeStatus));
        localStorage.setItem("paypalStatus", JSON.stringify(state.paypalStatus));
    }, [state.user])

    return (
        <AuthContext.Provider 
            value={{
                user:state.user, 
                loading:state.loading, 
                error:state.error,
                stripeStatus: state.stripeStatus,
                paypalStatus: state.paypalStatus, 
                dispatch,
                }}
        >
            {children}
        </AuthContext.Provider>
    )
};