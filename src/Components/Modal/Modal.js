import React from 'react';
import {Modal} from 'antd';

const CustomModal = ({title, open, setOpen, children, footer}) => {


    return (
        <>
            <Modal
                title={title}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                footer={[...footer ?? []]}
            >
                {children}
            </Modal>
        </>)
}
export default CustomModal