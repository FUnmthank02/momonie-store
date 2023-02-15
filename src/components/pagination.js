import { Pagination as Pagi } from 'antd'


function Pagination(props) {
    const listProduct = props.listProduct

    const pageSizeArr = [18, 24, 30, 36]

    const handleChangePagination = (pageNumber, pageSize) => {
        const data = {
            minValue: (pageNumber - 1) * pageSize,
            maxValue: pageNumber * pageSize
        }
        props.getDataFromPagination(data)
    }

    return (
        <>
            {
                listProduct && listProduct.length > 0 &&
                <div className="contain_pagination mt-5">
                    <div className="container d-flex justify-content-center">
                        <Pagi
                            showSizeChanger
                            onChange={handleChangePagination}
                            defaultCurrent={1}
                            total={listProduct.length}
                            defaultPageSize={pageSizeArr[0]}
                            pageSizeOptions={pageSizeArr}
                        />
                    </div>
                </div>
            }
        </>
    )
}
export default Pagination