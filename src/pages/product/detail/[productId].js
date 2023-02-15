import HeadComp from '@/components/head'
import { getAllProducts, getSingleProduct } from '@/service/productService/apiService'
import styles from '@/styles/Detail.module.scss'
import { FIRST_HALF_IMG_URL, LAST_HALF_IMG_URL } from '@/ultilities/constant/imageUrl'
import { Image } from 'antd'
import { useRouter } from 'next/router'

function DetailProduct({ data }) {

    const router = useRouter()
    
    const handleRedirect = () => {
        const destination = data.link
        router.push(destination)
    }

    return (
        <>
            <HeadComp title='Trang chi tiết sản phẩm' />
            <main className={styles.contain_detail}>
                <div className="container">
                    <div className={styles.wrap_detail}>
                        <div className={styles.contain_title}>
                            <p className={styles.title}>Detail</p>
                        </div>

                        <div className={styles.contain_detail_box}>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className={styles.contain_images}>
                                        <div className={styles.contain_group_image}>
                                            <Image.PreviewGroup>
                                                {
                                                    data.image && data.image.length > 0 &&
                                                    data.image.map((image, index) => (
                                                        <Image key={index} width={150} src={`${FIRST_HALF_IMG_URL}${image}${LAST_HALF_IMG_URL}`}
                                                            className={styles.image} alt='image' unoptimized />
                                                    ))
                                                }

                                            </Image.PreviewGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className={styles.contain_product_detail}>
                                        <p className={styles.product_name}>{data.name}</p>
                                        <p className={styles.product_type}>Loại: {data.category}</p>
                                        <p className={styles.product_type}>Xuất xứ: {data.origin}</p>
                                        <p className={styles.product_description}>Mô tả: {data.description}</p>
                                        <p className={styles.product_price}><span className={styles.unit}>₫</span>{data.price}</p>
                                        <button className={styles.btn_buy} onClick={handleRedirect}>Mua</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default DetailProduct

export async function getStaticPaths() {
    const allProducts = await getAllProducts()
    const paths = allProducts.map(product => {
        return {
            params: {
                productId: `${product._id}`,
            }
        }
    })

    return {
        paths,
        fallback: false,

    }
}

export async function getStaticProps(context) {
    const { params } = context
    const product = await getSingleProduct(params.productId)

    return {
        props: {
            data: product,
        }
    }
}