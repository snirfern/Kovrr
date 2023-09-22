import axios from "axios";
import {buildApiQuery} from "../Utils/Utils";

const apiHigherBoundLimit = 40
const buildPromise = ({searchTerm, startIndex, pagesPerCall}) => {
    const query = buildApiQuery({searchTerm, startIndex, pagesPerCall})

    return axios({
        url: `${process.env.REACT_APP_BOOKS_API}${query}`,
        method: 'GET'
    })
}
export const getBooks = ({dispatch, searchTerm, startIndex, pagesPerCall, isNewSearchTerm = false}) => {
    const promises = [
        buildPromise({
            searchTerm: searchTerm,
            startIndex: startIndex,
            pagesPerCall: pagesPerCall > apiHigherBoundLimit ? apiHigherBoundLimit : pagesPerCall
        })
    ]

    if (pagesPerCall > apiHigherBoundLimit) {
        promises.push(
            buildPromise({
                searchTerm: searchTerm,
                startIndex: startIndex + apiHigherBoundLimit,
                pagesPerCall: 10
            })
        )
    }
    return Promise.all(promises)
        .then(function (response) {
            const data = response.reduce((a, promiseRes) => a.concat(promiseRes.data.items ?? []), [])
            dispatch({type: "GET_BOOKS", payload: {isNewSearchTerm: isNewSearchTerm, data: data}});
            return 1
        })
        .catch(function (error) {
            console.log(error);
            return -1
        });
};

