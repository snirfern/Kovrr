import React, {useEffect, useState} from 'react';
import {Radio} from 'antd';

const CustomButtonsGroup = ({buttons, defaultValue}) => {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        setSelected(defaultValue ?? null)
        // eslint-disable-next-line
    }, [])

    return (
        <Radio.Group value={selected}>
            {buttons.map((button,i) => (
                <Radio.Button key={`button_group_${i}`} value={button.value} onClick={() => {
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