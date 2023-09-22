import React from 'react';
import {Badge, Card} from 'antd';
import Icon from "@ant-design/icons";
import {imageNotFoundUrl} from "../../Utils/Utils";
import styled from 'styled-components'

const CardWrapper = styled(Card)`
  min-width: 300px;
  width: 400px;
  max-width: 400px;
  margin-left: 10px;
  margin-top: 40px;
  text-align: center
`
const ImageWrapper = styled.img`
  width: 90%;
  min-height: 400px;
`
const CustomCard = ({data, actions, amount, dispatch}) => {


    return (

        <CardWrapper
            title={data.title}

            cover={

                <Badge count={amount} color="#faad14">

                    <ImageWrapper
                        height={400}
                        alt="example"
                        src={data.thumbnail ?? imageNotFoundUrl}
                        onClick={() => {
                            dispatch({type: 'ADD_CART_ITEM', payload: data})
                            dispatch({type: 'CHECKOUT'})
                        }}
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = imageNotFoundUrl
                        }}
                    /></Badge>
            }
            actions={actions.map(cA => <Icon component={cA.icon} onClick={(e) => cA.onClick(e, data)}/>)}
        >


        </CardWrapper>
    )
}

export default CustomCard