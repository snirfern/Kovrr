import React, {useEffect, useState} from 'react';
import {LoadingOutlined} from '@ant-design/icons';
import {AutoComplete, Input} from 'antd';
import {CiTrash} from "react-icons/ci";


const CustomAutoComplete = ({optionsArr = [], callback, width}) => {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setOptions(optionsArr)
    }, [])

    useEffect(() => {
        if (searchTerm !== '') {
            let debounceFunc = setTimeout(fetchData, 1000, searchTerm, callback);
            return () => clearTimeout(debounceFunc)
        }
    }, [searchTerm])


    function fetchData(searchTerm) {
        setLoading(true)
        callback(searchTerm).then((res) => {
            setLoading(false)
            setOptions(res)
        })
    }


    const changeHandler = (value) => {
        setSelected(value)
    }


    const searchHandler = (newSearchTerm) => {
        if (newSearchTerm.trim() !== searchTerm.trim()) {
            setSearchTerm(newSearchTerm)
        }
    }
    const cleanHandler = () => {
        setSelected(null);
        setSearchTerm('')
    }

    return (
        <>
            <AutoComplete
                options={options}
                popupMatchSelectWidth={width ?? 300}
                style={{width: width ?? 300}}
                value={selected}
                loading={loading}
                onChange={changeHandler}
                onSearch={searchHandler}
                onClear={cleanHandler}
                placeholder="Search a book"
            >
                <Input
                    suffix={
                        <>
                            {loading && <LoadingOutlined color={'blue'}/>}
                            {searchTerm.length > 0 && <CiTrash color={'red'} onClick={cleanHandler}/>}
                        </>
                    }
                />
            </AutoComplete>
            <div>

            </div>
        </>
    );
}


export default CustomAutoComplete
