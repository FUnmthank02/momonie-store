import { memo } from "react"
import styles from '@/styles/Component.module.scss'
import { useRouter } from "next/router"
import Image from "next/image"
import { FIRST_HALF_IMG_URL, LAST_HALF_IMG_URL } from "@/ultilities/constant/imageUrl"
import { Empty } from "antd"

function ListProduct(props) {
    const router = useRouter()
    const listProduct = props.listProduct

    // redirect to view detail of products
    const handleViewDetail = (productId) => {
        router.push(`/product/detail/${productId}`)
    }

    return (
        <>
            <div className={styles.contain_suggest}>
                <div className="container">
                    <div className={styles.wrap_suggest}>
                        <div className={styles.contain_suggest_title}>
                            <p className={styles.suggest_title}>{props.title}</p>
                        </div>

                        <div className={styles.contain_product}>
                            <div className="row">
                                {
                                    listProduct && listProduct.length > 0 ?
                                        listProduct.slice(props.limitRange.minValue, props.limitRange.maxValue)
                                            .map((item, index) => (
                                                <div onClick={() => handleViewDetail(item._id)}
                                                    className={`col-lg-2 col-md-4 col-6 ${styles.contain_product_items}`} key={index}
                                                >
                                                    <div className={styles.product_item}>
                                                        {
                                                            item.discount > 0 &&
                                                            <div className={styles.contain_discount}>
                                                                <p className={styles.discount}>{item.discount}% giảm</p>
                                                            </div>
                                                        }

                                                        <Image src={`${FIRST_HALF_IMG_URL}${item.image[0]}${LAST_HALF_IMG_URL}`}
                                                            className={styles.product_img} width={50} height={50} alt='image'
                                                            unoptimized />
                                                        <p className={styles.product_name}>{item.name}</p>
                                                        <p className={styles.product_price}><span className={styles.unit}>₫</span>
                                                            {item.discount > 0 ? item.price - item.discount / 100 * item.price
                                                                : item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        :
                                        <div className="d-flex justify-content-center" style={{width: '100%'}}>
                                            <div>
                                                <Empty description='Không tìm thấy sản phẩm' />
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ListProduct)