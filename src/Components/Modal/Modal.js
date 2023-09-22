import React, {useEffect} from 'react';
import {Modal} from 'antd';

const CustomModal = ({open, setOpen, children,footer}) => {

    useEffect(() => {
        setOpen(open)
    }, [open])

    return (
        <>
            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={[...footer ??[]]}
            >
                {children}
            </Modal>
        </>)
}
export default CustomModal