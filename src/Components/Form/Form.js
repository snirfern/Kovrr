import styled from 'styled-components'
import {Button, Form, Input} from 'antd';
import {useState} from "react";
import {validateMessages} from "./PaymentForm";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FormFooter = styled.div`
  text-align: right;
`


const CustomForm = ({fields}) => {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);


    const onValuesChange = () => {
        setIsDisabled(form.getFieldsError().some((item) => item.errors.length > 0))
    }
    return (
        <FormContainer>

            <Form
                layout={'vertical'}
                form={form}
                name="payment_form"
                style={{width: 500}}
                validateMessages={validateMessages}
                onValuesChange={onValuesChange}

            >
                {fields.map(cF => {
                    return (

                        <Form.Item
                            hasFeedback
                            name={cF.name}
                            label={cF.label}
                            rules={cF.validations}
                        >

                            <Input/>
                        </Form.Item>
                    )
                })}

                <FormFooter>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isDisabled}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </FormFooter>
            </Form>
        </FormContainer>
    )
}
export default CustomForm