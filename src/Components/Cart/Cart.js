import React from 'react';
import {Badge, Button, List, Space} from "antd";
import {DollarOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import {useStore} from "../../Store/Store";
import styled from 'styled-components'

const CartFooter = styled.div`
  text-align: center;
`
const ItemsSummary = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  width: 50px;
`
const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Cart = ({withFooter, approveCallback}) => {
    const {state} = useStore()
    const {books, cart} = state
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={books.filter(cB => cart[cB.id])}

                renderItem={(item) => (
                    <List.Item
                        className="cart_item"
                        style={{padding: 30}}
                        key={item.title}
                        actions={[
                            <IconText icon={ShoppingCartOutlined} text={item.price * cart[item.id].toFixed(2)}
                                      key="items_total"}
                            <IconText icon={ReadOutlined} text="156" key="list-vertical-star-o"/>,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                            ]}
                        extra={
                            <img
                                width={100}
                                height={100}
                                alt="logo"
                                src={item.thumbnail}
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
                <ItemsSummary>
                    <div>Total:</div>
                    <div>12</div>
                </ItemsSummary>
                <Button icon={<DollarOutlined/>} style={{background: '#00b96b', color: 'white'}}
                        onClick={() => approveCallback()}>
                    Proceed to Payment
                </Button>
            </CartFooter>}
        </>
    )

}
export
{
    Cart, IconText
}