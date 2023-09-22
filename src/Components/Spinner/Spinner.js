import {LoadingOutlined} from "@ant-design/icons";
import React from "react";

const Spinner = ({size, color}) => {
    return <LoadingOutlined size={size ?? "large"} color={size ?? 'blue'}/>
}
export default Spinner