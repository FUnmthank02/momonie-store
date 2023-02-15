import Image from "next/image"
import Link from "next/link"
import styles from '@/styles/Layout.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons"


function Footer() {

    return (
        <>
            <div className={styles.footer}>
                <div className={`container ${styles.footer_contain}`}>
                    <div className="row">
                        <div className="col-md-4 col-6">
                            <div className={styles.contain_logo}>
                                <Image src='/logoMoonStore.png' width={70} height={70} alt='image'/>
                            </div>
                            <div className={styles.contain_copyright}>
                                <p className={styles.copyright}>&#169; bởi <span className={styles.footer_store_name}>Momonie Store</span></p>
                            </div>
                        </div>
                        <div className="col-md-4 col-6">
                            <ul className={styles.contain_nav_link}>
                                <li className="pr-3">
                                    <Link href='/' className={styles.nav_link}>Trang Chủ</Link>
                                </li>
                                <li className="pr-3">
                                    <Link href='/product' className={styles.nav_link}>Sản Phẩm</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className={styles.contact_information}>
                                <p>SĐT: 0123456789</p>
                                <p>Địa chỉ: Dịch Vọng, Cầu Giấy, Hà Nội</p>
                            </div>
                            <div className={styles.contain_social_network_link}>
                                <Link href='/facebook'><FontAwesomeIcon icon={faSquareFacebook} width={25} color='#ffffff' /></Link>
                                <Link href='/tiktok'><FontAwesomeIcon icon={faTiktok} width={25} color='#ffffff' /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer