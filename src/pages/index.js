import HeadComp from '@/components/head'
import Category from '@/components/category'
import ListProduct from '@/components/listProduct'
import styles from '@/styles/Home.module.scss'
import { getAllProducts } from '@/service/productService/apiService'
import { Carousel } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

function Home({ listProduct }) {
    const [limitRange, setLimitRange] = useState({
        minValue: 0,
        maxValue: 18
    })

    return (
        <>
            <HeadComp title='Trang chủ' />

            <main className={styles.contain_home}>
                <div className={styles.contain_carousel}>
                    <div className="container">
                        <Carousel autoplay>
                            <div className={styles.contain_banner}>
                                <Image className={styles.banner} src='/banner1.jpg' width={1000} height={400} alt='image' />
                            </div>
                            <div className={styles.contain_banner}>
                                <Image className={styles.banner} src='/banner2.jpg' width={1000} height={400} alt='image' />
                            </div>
                            <div className={styles.contain_banner}>
                                <Image className={styles.banner} src='/banner3.jpg' width={1000} height={400} alt='image' />
                            </div>
                        </Carousel>
                    </div>
                </div>

                {/* category */}
                <Category />

                <ListProduct listProduct={listProduct} title='Sản phẩm gợi ý' limitRange={limitRange} />

                <div className="container">
                    <div className={styles.contain_view_all_product}>
                        <div className={styles.view_all}>
                            <Link href='/product' className={styles.text_view_all}>
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home


export async function getStaticProps() {
    const allProducts = await getAllProducts()

    return {
        props: {
            listProduct: allProducts
        },
    }
}