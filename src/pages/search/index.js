import HeadComp from '@/components/head'
import Category from '@/components/category'
import ListProduct from '@/components/listProduct'
import Pagination from '@/components/pagination'
import styles from '@/styles/Search.module.scss'
import { Radio, Slider, Input } from 'antd'
import { useState } from 'react'
import { getAllProducts } from '@/service/productService/apiService'

const { Search } = Input

function Seach({ listProduct }) {
    const [loadingSearch, setLoadingSearch] = useState(false)

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

    const handleSort = (e) => {
        console.log(e.target.value)
    }

    const handleChangeRangePrice = (value) => {
        setRangePrice({ minValue: value[0], maxValue: value[1] })
    }

    const handleSearch = (value) => {
        console.log(value)
    }

    return (
        <>
            <HeadComp title='Trang tìm kiếm'/>
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
                                        onSearch={handleSearch} enterButton="Search" size='middle'
                                        className={styles.search} allowClear
                                        loading={loadingSearch} />
                                </div>
                                <hr />
                                <div className={styles.title_filter}>
                                    <p className={styles.title}>Sắp xếp</p>
                                </div>
                                <div className={styles.sort_group}>
                                    <Radio.Group name="radiogroup" defaultValue={1}
                                        onChange={handleSort}>
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
                                    <button className={styles.clear_btn}>Xóa bộ lọc</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-8">
                            <div className={styles.contain_category}>
                                <Category />
                            </div>
                            <div className={styles.contain_product}>
                                <ListProduct listProduct={listProduct} title='Sản phẩm tìm thấy' limitRange={limitRange} />
                            </div>
                            <div className={styles.contain_pagination}>
                                <Pagination listProduct={listProduct} getDataFromPagination={getLimitPagination} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Seach

export async function getStaticProps() {
    const allProducts = await getAllProducts()
    
    return {
        props: {
            listProduct: allProducts
        },
    }
}