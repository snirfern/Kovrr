import React from 'react';
import {BookOutlined, HomeOutlined} from "@ant-design/icons";
import CustomButtonsGroup from "../ButtonsGroup/ButtonsGroup";
import {useStore} from "../../Store/Store";
import styled from 'styled-components'

const PageHeaderContainer = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  border-bottom: 1px solid #b2b2b22b;
  align-items: center;
  align-content: center
`
const LeftHeader = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.45);
`
const HeaderRight = styled.div`
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  min-width: 33%;
  justify-content: flex-end;
`
const HeaderCenter = styled.div`
  text-align: center;
  min-width: 33%;
`
const BreadCrumbs = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 300px
`


const CustomPageHeader = ({children, title, subtitle, breadcrumb}) => {
    const {dispatch} = useStore()
    const onButtonClickHandler = (value) => dispatch({type: "SET_PAGINATION", payload: value})

    return (

        < PageHeaderContainer>
            <LeftHeader>
                <BreadCrumbs>
                    <div><HomeOutlined/></div>
                    / <div><BookOutlined/></div>
                </BreadCrumbs>
            </LeftHeader>

            <HeaderCenter>
                {children}
            </HeaderCenter>

            <HeaderRight>
                <CustomButtonsGroup
                    defaultValue={10}
                    buttons={[
                        {
                            value: 10,
                            onClick: () => onButtonClickHandler(10)
                        },
                        {
                            value: 20,
                            onClick: () => onButtonClickHandler(25)
                        },
                        {
                            value: 50,
                            onClick: () => onButtonClickHandler(50)

                        }
                    ]}
                />
            </HeaderRight>
        </PageHeaderContainer>)
}
export default CustomPageHeader