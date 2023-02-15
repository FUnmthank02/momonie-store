
import Image from 'next/image'
import { Layout, Menu, theme } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faCirclePlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { memo, useState } from 'react';
import Link from 'next/link';

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function Sidebar() {

    const items = [
        getItem("Products", "product", <FontAwesomeIcon icon={faBox} className='text-light' style={{ fontSize: '17px' }} />, [
            getItem(<Link style={{textDecoration: 'none'}} href={'/dashboard'}>View and edit</Link>, "sub_product1", <FontAwesomeIcon icon={faEye} className='text-light' style={{ fontSize: '14px' }} />),
            getItem(<Link style={{textDecoration: 'none'}} href={'/dashboard/create'}>Create new</Link>, "sub_product2", <FontAwesomeIcon icon={faCirclePlus} className='text-light' style={{ fontSize: '14px' }} />)
        ])
    ]

    return (
        <>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                
                <div className="d-flex justify-content-center mt-4 mb-4">
                    <Image src='/logoMoonStore.png' width={70} height={70} alt='logo' />
                </div>

                <div className="d-flex justify-content-center mt-4 mb-4 text-light">
                    <p style={{fontWeight: 'bold', fontSize: '25px', margin: 0}}>DASHBOARD</p>
                </div>

                <Menu
                    theme='dark'
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={'sub4'}

                    mode="inline"
                    items={items}
                />

            </Sider>

        </>
    )
}

export default memo(Sidebar)