import {fieldsToExtract} from "../../Utils/Utils";
import {Button} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import styled from 'styled-components'


const BookPreviewRow = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  margin-top: 20px;
`
const ContentContainer = styled.div`
  padding: 10px;
`
const TitleContainer = styled.div`
  padding: 10px;
  font-weight: 500;
`
const BookPreviewContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding: 30px;
  margin-top: 20px;
`
const BookFooter = styled.div`
  text-align: center;
`
const BookPreviewButton = styled(Button)`
  width: 150px;
  background: #00b96b;
`

const rowStyle = {display: 'flex', justifyContent: 'space-between'}

const BookPreview = ({book, dispatch}) => {

    const guts = Object.keys(book).filter(k => k !== 'id').map(key => {
            const fieldType = fieldsToExtract[key]?.type
            let currentStyle = rowStyle

            if (fieldType === 'paragraph') {
                currentStyle = {}
            } else if (fieldType === 'image') {
                currentStyle = {textAlign: 'center'}
            }

            return < BookPreviewRow style={{...currentStyle}}>

                {fieldType !== 'image' &&
                <TitleContainer>{fieldsToExtract[key].textValue}</TitleContainer>}
                {fieldType === 'link' && <Button type='primary' onClick={() => window.open(book[key])}>link</Button>}

                {fieldType !== 'link' && fieldType !== 'image' &&
                <ContentContainer>{book[key]}</ContentContainer>}
                {fieldType === 'image' &&
                <ContentContainer>
                    <img width={200} height={200} src={book[key]}
                         alt={'book_image'}/>
                </ContentContainer>}

            </BookPreviewRow>

        }
    )
    return (
        <BookPreviewContainer>
            {guts}
            <BookFooter>
                <BookPreviewButton
                    onClick={() => dispatch({type: 'ADD_CART_ITEM', payload: book})}
                    type={'primary'}
                    icon={<ShoppingCartOutlined/>}
                >
                    Add to Cart
                </BookPreviewButton>
            </BookFooter>
        </BookPreviewContainer>
    )
}

export default BookPreview