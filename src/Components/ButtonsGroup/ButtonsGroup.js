import React, {useEffect, useState} from 'react';
import {Radio} from 'antd';

const CustomButtonsGroup = ({buttons, defaultValue}) => {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        setSelected(defaultValue ?? null)
    }, [])

    return (
        <Radio.Group value={selected}>
            {buttons.map(button => (
                <Radio.Button value={button.value} onClick={() => {
                    setSelected(button.value);
                    if (button.onClick) {
                        button.onClick()
                    }
                }}>{button.value}</Radio.Button>
            ))}
        </Radio.Group>
    )
}
export default CustomButtonsGroup