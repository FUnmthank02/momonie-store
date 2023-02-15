import { Alert, Space } from 'antd'
import { memo } from 'react'

function Notify(prop) {

    const style = {
        position: 'fixed',
        width: '30vw',
        right: 0,
        top: 0,
        zIndex: 9999
    }

    return (
        <>
            <Space direction="vertical" style={style}>
                <Alert style={{padding: '20px', borderRadius: '10px 0 0 10px'}} message={prop.message} type={prop.type} showIcon />
            </Space>
        </>
    )
}

export default memo(Notify)

