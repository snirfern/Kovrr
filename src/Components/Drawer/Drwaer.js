import {Button, Drawer, Space} from "antd";
import {Cart} from "../Cart/Cart";
import {useStore} from "../../Store/Store";
import {DeleteOutlined, DollarOutlined} from "@ant-design/icons";
import styled from 'styled-components'

const ProceedToCheckoutButton = styled(Button)`
  background: #00b96b;
  color: white
`
const EmptyCartButton = styled(Button)`
  width: 150px;
`
const CustomDrawer = ({drawer, setDrawer}) => {
    const {state, dispatch} = useStore()

    const showDrawer = () => {
        setDrawer(true);
    };

    const onClose = () => {
        setDrawer(false);
    };
    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer title={state.company} placement="right" onClose={onClose} open={drawer} width={700}
                    bodyStyle={{padding: '2px'}}
                    extra={
                        <Space>
                            <EmptyCartButton
                                onClick={() => {
                                    dispatch({type: 'EMPTY_CART'});
                                    setDrawer(false)
                                }}
                                danger
                                type={'primary'}
                                icon={<DeleteOutlined/>}
                            >
                                Empty cart
                            </EmptyCartButton>

                            <ProceedToCheckoutButton
                                icon={<DollarOutlined/>}
                                onClick={() => {
                                    setDrawer(false);
                                    dispatch({type: 'CHECKOUT'});
                                }}
                            >
                                Proceed to checkout
                            </ProceedToCheckoutButton>

                        </Space>
                    }
            >
                <Cart/>
            </Drawer>
        </>
    )
}
export default CustomDrawer;