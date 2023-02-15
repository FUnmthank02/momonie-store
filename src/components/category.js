import styles from '@/styles/Component.module.scss'
import { memo, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { getAllCategories } from '@/service/categoryService/apiService'
import { useRouter } from 'next/router'

function Category() {
    const router = useRouter()
    const [isOpenCategory, setIsOpenCategory] = useState(true)

    const getAllCategory = async () => {
        const res = await getAllCategories()
        return res
    }

    // Using the hook
    const { data, error, isLoading, isError } = useQuery('Categories', getAllCategory, { refetchInterval: 300000 })

    const handleOpenCategory = () => {
        setIsOpenCategory(!isOpenCategory)
    }

    const handleFilterCategory = async (categoryName) => {
        router.push(`/search/category/${categoryName}`)
    }



    return (
        <>
            <div className={styles.contain_category}>
                <div className='container'>
                    <div className={styles.wrap_category}>

                        <div className={styles.contain_category_title} style={{
                            borderBottom: isOpenCategory ? '1px solid #f08080' : 'none' 
                        }}>
                        <p className={styles.category_title} onClick={handleOpenCategory}>Danh Mục
                            <FontAwesomeIcon className={styles.iconUpDown} icon={isOpenCategory ? faCaretDown : faCaretUp} width={15}/>
                        </p>
                    </div>

                    {
                        isOpenCategory && <hr /> &&
                        <div className={styles.category}>
                            <div className="row">
                                {
                                    data && data.length > 0 &&
                                    data.map((item, index) => (
                                        <div className={`col-lg-3 col-md-3 col-12 ${styles.contain_category_items}`} key={index}>
                                            <div onClick={() => handleFilterCategory(item)} className={styles.category_item}>{item}</div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
        </>
    )
}
export default memo(Category)