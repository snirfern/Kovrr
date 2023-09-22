import React from 'react';
import {Badge, Button, Divider, List, Space} from "antd";
import {
    BookOutlined,
    DollarOutlined,
    LikeOutlined,
    MessageOutlined,
    ReadOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import {useStore} from "../../Store/Store";
import styled from 'styled-components'
import {imageNotFoundUrl} from "../../Utils/Utils";

const CartFooter = styled.div`
  text-align: center;
`
const ItemsSummary = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`
const Total = styled.div`
  font-weight: 500;
  padding: 5px;
  color: black;
`
const IconTextSpan = styled.span`
{
  color: #000000;
  font-weight: 500
}
`
const CartPaymentButton = styled(Button)`
  background: #00b96b;
  color: white;
`
const IconText = ({icon, text, style}) => (
    <Space style={{fontSize: 15, ...style ?? {}}}>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Cart = ({withFooter, approveCallback}) => {
    const {state} = useStore()
    const {books, cart, totalPayment} = state

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={Array.from(new Set(books.filter(cB => cart[cB.id])))}

                renderItem={(item) => (
                    <List.Item
                        className="cart_item"
                        style={{padding: 30}}
                        key={item.title}
                        actions={[
                            <IconText icon={BookOutlined} text={`${item.price} $`} key="156" style={{color: 'black'}}/>,

                            <IconText icon={ShoppingCartOutlined}
                                      text={
                                          <IconTextSpan>{`${(item.price * cart[item.id]).toFixed(2)} $`}</IconTextSpan>}
                                      key="items_total"
                                      style={{color: 'black'}}
                            />,
                            <IconText icon={ReadOutlined} text="156" key="list-vertical-star-o"
                                      style={{color: 'black'}}/>,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"
                                      style={{color: 'black'}}/>,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"
                                      style={{color: 'black'}}/>,
                        ]}
                        extra={
                            <img
                                width={100}
                                height={100}
                                alt="logo"
                                src={item?.thumbnail ?? imageNotFoundUrl}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Badge count={cart[item.id ?? 0]} showZero color="#faad14">
                                <Avatar style={{backgroundColor: '#87d068'}}
                                        icon={<ShoppingCartOutlined color={'green'}/>}
                                        shape="round"
                                        size="large"/>
                            </Badge>}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.subtitle}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
            {withFooter && <CartFooter>
                <Divider/>

                <ItemsSummary>
                    <Total>Total:</Total>
                    <Total>{`   ${Number(totalPayment).toFixed(2)}  $`}</Total>
                </ItemsSummary>

                <CartPaymentButton
                    icon={<DollarOutlined/>}
                    onClick={() => approveCallback()}
                >
                    Proceed to Payment
                </CartPaymentButton>
            </CartFooter>}
        </>
    )

}
export {Cart, IconText}