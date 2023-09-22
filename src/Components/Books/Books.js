import React, {useEffect, useState} from "react";
import {useStore} from "../../Store/Store";
import {getBooks} from "../../Store/Actions";
import axios from "axios";
import CustomCard from "../Card/Card";
import CustomPageHeader from "../PageHeader/PageHeader";
import CustomAutoComplete from "../AutoComplete/AutoComplete";
import CustomModal from "../Modal/Modal";
import {InfoCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import CustomDrawer from "../Drawer/Drwaer";
import {FloatButton} from "antd";
import BookPreview from "../BookPreview/BookPreview";
import styled from 'styled-components'
import {Cart} from "../Cart/Cart";
import {paymentFormFields} from "../Form/PaymentForm";
import CustomForm from "../Form/Form";


const BooksCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px
`
const BooksContainer = styled.div``
const Books = () => {
    const {state, dispatch} = useStore()
    const {books, itemsInCart, checkout} = state;
    const [selectedBook, setSelectedBook] = useState(false)
    const [drawer, setDrawer] = useState(false);
    const [isPayment, setIsPayment] = useState(false)

    useEffect(() => {
        getBooks(dispatch)
    }, [])

    function fetchData(searchTerm) {
        return getBooks(dispatch, searchTerm)
        return axios.get(
            `https://www.omdbapi.com?s=${searchTerm}&apikey=6a6f53dc`,
        ).then(res => {
            return !res?.data?.Search ? [] : res.data.Search.map((m, i) => ({key: i, value: m.Title}))
        });
    }

    const cardActions = [
        {
            icon: MinusCircleOutlined, key: "remove_item",
            onClick: (e, itemId) => {
                dispatch({type: 'REMOVE_CART_ITEM', payload: itemId})
            }
        },
        {
            icon: InfoCircleOutlined, key: "more_info",
            onClick: (e, item) => setSelectedBook(item)
        },
        {
            icon: PlusCircleOutlined, key: "add_item",
            onClick: (e, itemId) => {
                dispatch({type: 'ADD_CART_ITEM', payload: itemId})
            }
        }

    ]

    return (
        <BooksContainer>
            <CustomPageHeader>
                <CustomAutoComplete
                    callback={fetchData}
                    optionsArr={[
                        {key: 1, value: "Bill Gates"},
                        {key: 2, value: "Jane Doe"}
                    ]}/>
            </CustomPageHeader>


            <CustomModal open={selectedBook} setOpen={setSelectedBook}>
                <BookPreview book={selectedBook} dispatch={dispatch}/>
            </CustomModal>
            {checkout && <CustomModal title={"Book purchase"} open={checkout} setOpen={() => {
                setIsPayment(false);
                dispatch({type: 'CHECKOUT'})
            }}>
                {isPayment && <CustomForm fields={paymentFormFields}/>}
                {!isPayment && <Cart withFooter approveCallback={() => setIsPayment(true)}/>}
            </CustomModal>
            }

            <BooksCardsContainer>
                {books.map(cB => {
                    return <CustomCard
                        dispatch={dispatch}
                        data={cB}
                        actions={cardActions}
                        amount={state.cart[cB.id]}
                    />
                })}
            </BooksCardsContainer>

            {itemsInCart > 0 && <FloatButton
                badge={{count: itemsInCart, color: 'orange'}}
                icon={<ShoppingCartOutlined/>}
                onClick={() => setDrawer(!drawer)}/>
            }

            {drawer && <CustomDrawer drawer={drawer} setDrawer={setDrawer} data={books}/>}
        </BooksContainer>
    )
}
export default Books;