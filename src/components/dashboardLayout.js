import Sidebar from "@/components/sidebar"
import { Layout, theme } from 'antd'
import { useCookies } from 'react-cookie'
import { useRouter } from "next/router"

const { Header, Content, Footer } = Layout

function DashboardLayout({ children }) {
    const router = useRouter()
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const [cookie, setCookie, removeCookie] = useCookies()

    /* log out */
    const handleLogOut = () => {
        removeCookie('token')
        router.reload()
    }

    const headerStyles = {
        background: colorBgContainer,
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
    }

    const navStyles = {
        fontSize: '15px',
        margin: '0 10px',
        color: '#1363DF',
        cursor: 'pointer',
    }

    return (
        <>
            <Layout>
                <Sidebar />
                <Layout>
                    <Header style={headerStyles}>
                        <div className="left">
                            <p style={{ fontWeight: 'bold', fontSize: '25px', margin: 0 }}>Xin chào Admin!</p>
                        </div>
                        <div className="right">
                            <span onClick={() => router.push('/')} style={navStyles}>Trang chủ</span>
                            <span onClick={handleLogOut} style={navStyles}>Đăng xuất</span>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        © bởi Momonie-store
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
export default DashboardLayout


DashboardLayout.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}