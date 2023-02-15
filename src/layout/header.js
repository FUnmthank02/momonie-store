import Image from "next/image"
import Link from "next/link"
import styles from '@/styles/Layout.module.scss'
import { useCookies } from 'react-cookie'
import { useRouter } from "next/router"

function Header() {
    const router = useRouter()

    const [cookie, setCookie, removeCookie] = useCookies()

    /* log out */
    const handleLogOut = () => {
        removeCookie('token')
        router.reload()
    }

    /* log in */
    const handleRedirectLogIn = () => {
        router.push('/login')
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.subheader}>
                    <div className={`container d-flex ${styles.subheader_contain}`}>
                        <div className={styles.contain_store_name}>
                            <p className={styles.store_name}>Momonie Store</p>
                        </div>
                        <div className={styles.contain_login}>
                            {
                                cookie.token ?
                                    <div>

                                        <Link className={styles.logout} href='/dashboard'>Dashboard</Link>
                                        <span className={styles.logout} onClick={handleLogOut}>Đăng xuất</span>
                                    </div>
                                    :
                                    <p className={styles.logout} onClick={handleRedirectLogIn}>Đăng nhập nếu là quản trị viên</p>

                            }
                        </div>
                    </div>
                </div>
                <div className={styles.navbar}>
                    <div className={`container d-flex ${styles.navbar_contain}`}>
                        <div className="contain_logo">
                            <Image src='/logoMoonStore.png' width={60} height={60} alt='image' />
                        </div>
                        <nav className={styles.contain_navigation}>
                            <ul>
                                <li className="pr-3">
                                    <Link href='/' className={styles.nav_link}>Trang Chủ</Link>
                                </li>
                                <li className="pr-3">
                                    <Link href='/product' className={styles.nav_link}>Sản Phẩm</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header