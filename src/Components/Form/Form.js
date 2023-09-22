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
    const [formData, setFormData] = useState({})
    const [isDisabled, setIsDisabled] = useState(true);


    const onValuesChange = async (values) => {
        setFormData({...formData, ...values})
        const isFormValid = fields.every(f => !!(formData[f.name] && f.validate(formData[f.name])))

        setIsDisabled(!isFormValid)
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
                {fields.map((cF, i) => {
                    return (
                        <Form.Item
                            hasFeedback

                            key={`form_field_${i}`}
                            name={cF.name}
                            label={cF.label}
                            rules={cF.validations}
                        >
                            <Input/>
                        </Form.Item>
                    )
                })}


            </Form>
            <FormFooter>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isDisabled}
                >
                    Submit
                </Button>
            </FormFooter>
        </FormContainer>
    )
}
export default CustomForm