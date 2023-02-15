import HeadComp from '@/components/head'
import styles from '@/styles/Product.module.scss'
import Category from '@/components/category'
import ListProduct from '@/components/listProduct'
import Pagination from '@/components/pagination'
import { useState } from 'react'
import { getAllProducts } from '@/service/productService/apiService'
import { useQuery } from 'react-query'

function Product({ listProduct }) {
    const [limitRange, setLimitRange] = useState({
        minValue: 0,
        maxValue: 18
    })

    const getProducts = async () => {
        const res = await getAllProducts()
        return res
    }

    // Using the hook
    const { data, error, isLoading, isError } = useQuery('Products', getProducts, { refetchInterval: 300000, initialData: listProduct })

    const getLimitPagination = (data) => {
        setLimitRange({
            minValue: data.minValue,
            maxValue: data.maxValue,
        })
    }
    return (
        <>
            <HeadComp title='Trang sản phẩm' />

            <main className={styles.contain_product_page}>
                {/* category */}
                <Category />

                {/* list product */}
                <ListProduct listProduct={data} title='Tất cả sản phẩm' limitRange={limitRange} />

                {/* pagination */}
                <Pagination listProduct={data} getDataFromPagination={getLimitPagination} />
            </main>
        </>
    )
}

export default Product

export async function getStaticProps() {
    const allProducts = await getAllProducts()
    
    return {
        props: {
            listProduct: allProducts
        },
    }
}