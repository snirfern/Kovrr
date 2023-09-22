import React, {useEffect, useState} from "react";
import {useStore} from "../../Store/Store";
import {getBooks} from "../../Store/Actions";
import CustomCard from "../Card/Card";
import CustomPageHeader from "../PageHeader/PageHeader";
import CustomModal from "../Modal/Modal";
import {InfoCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import CustomDrawer from "../Drawer/Drwaer";
import {FloatButton} from "antd";
import BookPreview from "../BookPreview/BookPreview";
import styled from 'styled-components'
import {Cart} from "../Cart/Cart";
import {paymentFormFields} from "../Form/PaymentForm";
import CustomForm from "../Form/Form";
import SearchBox from "../SearchBox/SearchBox";
import useInfiniteScroll from "../inifinteScroll/inifinteScroll";
import Spinner from "../Spinner/Spinner";
import {noBooksFound} from "../../Utils/Utils";


const BooksCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px
`
const SpinnerFetchingContainer = styled.div`
  text-align: center;
  padding: 30px;
`
const SpinnerLoadingContainer = styled.div`
  text-align: center;
  padding: 30px;
`
const NoBookFoundContainer = styled.div`
  text-align: center;
  width: 100%;
`
const BooksContainer = styled.div``
const Books = () => {
    const {state, dispatch} = useStore()
    const {books, itemsInCart, checkout} = state;
    const [selectedBook, setSelectedBook] = useState(false)
    const [drawer, setDrawer] = useState(false);
    const [isPayment, setIsPayment] = useState(false)
    const [loading, setLoading] = useState(false)


    const fetchItems = async () => {
        return await getBooks({
            dispatch: dispatch,
            searchTerm: state.searchTerm ?? '',
            startIndex: state.startIndex ?? 0,
            pagesPerCall: state.pagesPerCall
        })
    }
    useEffect(() => {
        if (loading) return;
        setLoading(true)
        fetchItems().then(() => {
            setIsFetching(false);
            setLoading(false)
        })
    }, [])

    const [isFetching, setIsFetching] = useInfiniteScroll(fetchItems);


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

            <CustomPageHeader><SearchBox/></CustomPageHeader>
            {loading && <SpinnerLoadingContainer><Spinner/></SpinnerLoadingContainer>}
            {!loading && books.length === 0 &&
            <NoBookFoundContainer><img width={400} src={noBooksFound} alt={'no_books_found'}/></NoBookFoundContainer>}
            }

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
            {isFetching && <SpinnerFetchingContainer><Spinner/></SpinnerFetchingContainer>}

        </BooksContainer>
    )
}
export default Books;