import axios from "axios";


export const checkCreditCard = (dispatch, card) => {
    dispatch({type: "LOADING", payload: true});
    axios({
        method: "POST",
        url: "http://192.168.1.13:3000/validateCreditCard",
        data: {cc: card},
    })
        .then(function (response) {
            if (
                response &&
                response.data &&
                response.data.success &&
                card.card_number &&
                card.card_number.length > 0
            )
                dispatch({
                    type: "SET_CREDIT_CARD",
                    payload: card.card_number.toString().substring(0, 4),
                });
            else dispatch({type: "SET_CREDIT_CARD", payload: false});

            dispatch({type: "LOADING", payload: false});
        })
        .catch((e) => {
            console.log(e);
            dispatch({action: "LOADING", payload: false});

            console.log(e);
        });
};

export const getData = (dispatch) => {
    axios({
        url: "http://192.168.1.13:3000/menu",
        method: 'GET'
    })
        .then(function (response) {
            dispatch({type: "GET_DATA", payload: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
};

