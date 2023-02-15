import HeadComp from '@/components/head'
import Category from '@/components/category'
import ListProduct from '@/components/listProduct'
import Pagination from '@/components/pagination'
import styles from '@/styles/Search.module.scss'
import { Radio, Slider, Input } from 'antd'
import { useEffect, useState } from 'react'
import { getAllCategories } from '@/service/categoryService/apiService'
import { getProductsByCategory } from '@/service/searchService/apiService'
import { useRouter } from 'next/router'

const { Search } = Input

function SeachCategory({ listProduct }) {

    const router = useRouter()
    const [products, setProducts] = useState(listProduct)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    const [sort, setSort] = useState('default')

    useEffect(() => {
        setProducts(listProduct)
    }, [listProduct])

    const [rangePrice, setRangePrice] = useState({
        minValue: 0,
        maxValue: 1000000
    })

    const [limitRange, setLimitRange] = useState({
        minValue: 0,
        maxValue: 18
    })

    const getLimitPagination = (data) => {
        setLimitRange({
            minValue: data.minValue,
            maxValue: data.maxValue,
        })
    }

    const handleSort = (typeSort) => {
        setSort(typeSort)
        switch (typeSort) {
            case 'ascPrice':
                setProducts(products.slice().sort((a, b) => a.price - b.price))
                break
            case 'descPrice':
                setProducts(products.slice().sort((a, b) => b.price - a.price))
                break
            case 'default':
                setProducts(products.slice().sort((a, b) => {
                    let x = a._id;
                    let y = b._id;
                    return (x < y) ? -1 : 1
                }))
                break
        }
    }

    const handleChangeRangePrice = (value) => {
        setRangePrice({ minValue: value[0], maxValue: value[1] })
        setSort('default')

        setProducts(listProduct.filter((product) => product.price >= value[0] &&
            product.price <= value[1] &&
            product.name.toLowerCase().includes(textSearch.toLowerCase())
        ))
    }

    const handleSearch = (value) => {
        setTextSearch(value)
        if (value !== '') {
            setProducts(products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase())
                && product.price >= rangePrice.minValue && product.price <= rangePrice.maxValue
            ))
        }
        else {
            setProducts(listProduct.filter((product) =>
                product.price >= rangePrice.minValue && product.price <= rangePrice.maxValue
            ))
        }
    }

    const handleRemoveFilter = () => {
        setRangePrice({ minValue: 0, maxValue: 1000000})
        setSort('default')
        setTextSearch('')
        setProducts(listProduct)
    }

    return (
        <>
            <HeadComp title='Trang tìm kiếm' />
            <main className={styles.contain_search_page}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <div className={styles.contain_sidebar}>
                                <div className={styles.title_filter}>
                                    <p className={styles.title}>Tìm kiếm</p>
                                </div>
                                <div className={styles.contain_search}>
                                    <Search placeholder="Enter to search..."
                                        enterButton="Search" size='middle'
                                        className={styles.search} allowClear
                                        onChange={e => handleSearch(e.target.value)}
                                        loading={loadingSearch} />
                                </div>
                                <hr />
                                <div className={styles.title_filter}>
                                    <p className={styles.title}>Sắp xếp</p>
                                </div>
                                <div className={styles.sort_group}>
                                    <Radio.Group name="radiogroup" value={sort}
                                        onChange={(e) => handleSort(e.target.value)}>
                                        <Radio className={styles.sort_radio} value={'default'}>Mặc định</Radio><br />
                                        <Radio className={styles.sort_radio} value={'ascPrice'}>Tăng dần (giá)</Radio><br />
                                        <Radio className={styles.sort_radio} value={'descPrice'}>Giảm dần (giá)</Radio>
                                    </Radio.Group>
                                </div>
                                <hr />
                                <div className={styles.title_filter}>
                                    <p className={styles.title}>Khoảng giá</p>
                                    <p className={styles.rangePrice}><span className={styles.unit}>₫</span>{rangePrice.minValue} - <span className={styles.unit}>₫</span>{rangePrice.maxValue}</p>
                                    <Slider
                                        range={{
                                            draggableTrack: true,
                                        }}
                                        defaultValue={[rangePrice.minValue, rangePrice.maxValue]}
                                        value={[rangePrice.minValue, rangePrice.maxValue]}
                                        onChange={handleChangeRangePrice}
                                        max={1000000} min={0} placement='bottom'
                                    />
                                </div>
                                <hr />
                                <div className={styles.contain_clear_btn}>
                                    <button className={styles.clear_btn} onClick={handleRemoveFilter}>Xóa bộ lọc</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-8">
                            <div className={styles.contain_category}>
                                <Category />
                            </div>
                            <div className={styles.contain_product}>
                                <ListProduct listProduct={products} title='Sản phẩm tìm thấy' limitRange={limitRange} />
                            </div>
                            <div className={styles.contain_pagination}>
                                <Pagination listProduct={products} getDataFromPagination={getLimitPagination} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SeachCategory


export async function getStaticPaths() {
    const allCategories = await getAllCategories()
    const paths = allCategories.map(category => {
        return {
            params: {
                categoryName: `${category}`,
            }
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const products = await getProductsByCategory(params.categoryName)
    console.log(context)
    console.log(products)
    return {
        props: {
            listProduct: products
        },
    }
}