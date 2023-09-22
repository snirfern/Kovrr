import styled from 'styled-components'
import React, {useEffect, useState} from "react";
import {useStore} from "../../Store/Store";
import Input from "antd/es/input/Input";
import {LoadingOutlined} from "@ant-design/icons";
import {CiTrash} from "react-icons/ci";
import {getBooks} from "../../Store/Actions";

const SearchBoxContainer = styled.div`
  text-align: center;
`

const SearchBox = ({}) => {
    const {state, dispatch} = useStore()
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (searchTerm !== '') {
            let debounceFunc = setTimeout(fetchData, 1000);
            return () => clearTimeout(debounceFunc)
        }
    }, [searchTerm])


    const fetchData = async () => {
        dispatch({type:"SET_SEARCH_TERM",payload:searchTerm})
        setLoading(true)
        getBooks({
            dispatch: dispatch,
            searchTerm: searchTerm,
            startIndex: state.startIndex,
            pagePerCall: state.pagesPerCall,
            isNewSearchTerm:true
        }).then(() => {
            setLoading(false)
        })
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }


    return (
        <SearchBoxContainer>
            <Input
                onChange={handleChange}
                value={searchTerm}
                style={{width: 300}}
                placeholder={'Search for book'}
                suffix={
                    <>
                        {loading && <LoadingOutlined color={'blue'}/>}
                        {!loading && searchTerm.toString().length > 0 &&
                        < CiTrash color={'red'} onClick={() => setSearchTerm('')}/>}
                    </>
                }
            />
        </SearchBoxContainer>
    )
}

export default SearchBox;