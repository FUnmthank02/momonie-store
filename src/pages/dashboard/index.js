import DashboardLayout from "@/components/dashboardLayout"
import { deleteAProduct, getAllProducts, updateProduct } from "@/service/productService/apiService"
import { useEffect, useState } from "react"
import { Button, Modal } from 'antd'
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons'
import Notify from "@/components/notify"
import Link from "next/link"
import { storage } from "@/firebase/configFirebase"
import { ref, uploadBytes } from "firebase/storage"

function Dashboard({ listProduct }) {
    const [products, setProducts] = useState(listProduct)
    const [refresh, setRefresh] = useState(false)
    const [isDisplayUpload, setDisplayUpload] = useState(false)
    const [listUpload, setListUpload] = useState([])
    const [productSelected, setProductSelected] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        origin: '',
        discount: 0,
        image: [],
        link: ''
    })
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [notify, setNotify] = useState({
        status: false,
        message: '',
        type: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllProducts()
            setProducts(data)
        }

        fetchData()
    }, [refresh])

    /* display notify */
    const handleNotify = () => {
        setTimeout(() => {
            setNotify({ ...notify, status: false })
        }, [2000])
    }

    /* open modal update */
    const handleOpenModalUpdate = (product) => {
        setIsModalUpdateOpen(true)
        setProductSelected(product)
        setDisplayUpload(false)
    }

    /* open confirm modal delete */
    const handleOpenModalDelete = (product) => {
        setIsModalDeleteOpen(true)
        setProductSelected(product)
    }

    const handleOkDelete = async () => {
        setIsModalDeleteOpen(false)
        await deleteAProduct(productSelected._id)
            .then(res => {
                setNotify(
                    {
                        status: true,
                        message: 'Xóa thành công',
                        type: 'success'
                    }
                )
                setRefresh(!refresh)
                handleNotify()
            })
            .catch(err => setNotify(
                {
                    status: true,
                    message: err.message,
                    type: 'error'
                }
            ))
    }

    const handleOkUpdate = async (e) => {
        e.preventDefault()
        setIsModalUpdateOpen(false)
        await updateProduct(productSelected._id, productSelected)
            .then(res => {
                setNotify(
                    {
                        status: true,
                        message: 'Cập nhật thành công',
                        type: 'success'
                    }
                )
                setRefresh(!refresh)
                handleNotify()
            })
            .catch(err => setNotify(
                {
                    status: true,
                    message: err.message,
                    type: 'error'
                }
            ))
    }

    const handleCancelDelete = () => {
        setIsModalDeleteOpen(false)
        setProductSelected({})
    }

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false)
        setProductSelected({})
        setListUpload([])
        setDisplayUpload(false)
    }

    const handleUpload = (listImageUpload) => {
        let listImages = []
        if (listImageUpload === null) return;
        for (let i = 0; i < listImageUpload.length; i++) {
            listImages.push(listImageUpload[i].name)
            const imageRef = ref(storage, `images/${listImageUpload[i].name}`)
            uploadBytes(imageRef, listImageUpload[i])
                .then(() => {
                    console.log('images uploaded successfully!')
                })
        }

        setListUpload(listImages)
        setProductSelected({ ...productSelected, image: listImages })
        setDisplayUpload(true)
    }

    return (
        <>
            {
                notify.status &&
                <Notify message={notify.message} type={notify.type} />
            }
            <DashboardLayout>
                <main>
                    <Modal title="Cập nhật sản phẩm" open={isModalUpdateOpen}
                        onCancel={handleCancelUpdate}
                        footer={null}>
                        <div className="container">
                            <form onSubmit={handleOkUpdate}>
                                <div className="form-group">
                                    <label htmlFor="name">Tên</label>
                                    <input id="name" className="form-control" type="text"
                                        value={productSelected.name}
                                        onChange={e => setProductSelected({ ...productSelected, name: e.target.value })}
                                        placeholder='Nhập tên sản phẩm...' required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Giá</label>
                                    <input id="price" className="form-control" type="number"
                                        value={productSelected.price} min={1}
                                        onChange={e => setProductSelected({ ...productSelected, price: Number(e.target.value) })}
                                        placeholder='Nhập giá sản phẩm...' required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Mô tả</label>
                                    <textarea id="description" className="form-control" type="text"
                                        value={productSelected.description}
                                        onChange={e => setProductSelected({ ...productSelected, description: e.target.value })}
                                        required placeholder='Nhập mô tả sản phẩm...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Loại</label>
                                    <input id="category" className="form-control" type="text"
                                        value={productSelected.category}
                                        onChange={e => setProductSelected({ ...productSelected, category: e.target.value })}
                                        required placeholder='Nhập loại sản phẩm...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="origin">Xuất xứ</label>
                                    <input id="origin" className="form-control" type="text"
                                        value={productSelected.origin}
                                        onChange={e => setProductSelected({ ...productSelected, origin: e.target.value })}
                                        required placeholder='Nhập xuất xứ sản phẩm...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">Đường dẫn</label>
                                    <input id="link" className="form-control" type="text"
                                        value={productSelected.link}
                                        onChange={e => setProductSelected({ ...productSelected, link: e.target.value })}
                                        required placeholder='Nhập đường dẫn sản phẩm...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discount">Khuyến mãi</label>
                                    <input id="discount" className="form-control" type="number"
                                        value={productSelected.discount} pattern="[0-100]"
                                        onChange={e => setProductSelected({ ...productSelected, discount: Number(e.target.value) })}
                                        required placeholder='Nhập khuyến mãi sản phẩm...'
                                        min={0} max={100}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upload">Hình ảnh</label><br />
                                    <Button>
                                        <label htmlFor="upload">
                                            <UploadOutlined /><span className="ml-2">Upload</span>
                                            <input id="upload" type="file" hidden multiple
                                                onChange={(e) => handleUpload(e.target.files)} />
                                        </label>
                                    </Button>
                                    <div className="mt-2">
                                        {
                                            isDisplayUpload ?
                                                listUpload?.map((image, index) => (
                                                    <div className="text-success" key={index}>
                                                        <FileImageOutlined /><span className="ml-1">{image}</span>
                                                    </div>
                                                ))
                                                :
                                                productSelected.image?.map((image, index) => (
                                                    <div className="text-success" key={index}>
                                                        <FileImageOutlined /><span className="ml-1">{image}</span>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary mr-3" type="submit">Cập nhật</button>
                                    <button className="btn btn-secondary" type="button" onClick={handleCancelUpdate}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal title="Xác nhận xóa" open={isModalDeleteOpen}
                        onOk={handleOkDelete} onCancel={handleCancelDelete}
                        okText='Xóa' cancelText='Hủy'>
                        <p>Bạn chắc chắn muốn xóa sản phẩm này chứ ?</p>
                    </Modal>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>All products</p>
                    <div className="table-responsive">

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>Tên</td>
                                    <td>Giá</td>
                                    <td>Mô tả</td>
                                    <td>Loại</td>
                                    <td>Xuất xứ</td>
                                    <td>Đường dẫn</td>
                                    <td>Khuyến mãi</td>
                                    <td colSpan={2} className='text-center'>Chỉnh sửa</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products && products.length > 0 &&
                                    products.map((product, index) => (
                                        <tr key={index}>
                                            <td><Link style={{ textDecoration: 'none' }} href={`/product/detail/${product._id}`}>{product.name}</Link></td>
                                            <td>{product.price}</td>
                                            <td>{product.description}</td>
                                            <td>{product.category}</td>
                                            <td>{product.origin}</td>
                                            <td><Link style={{ textDecoration: 'none' }} href={product.link}>{product.link}</Link></td>
                                            <td>{product.discount}%</td>
                                            <td>
                                                <button className="btn btn-outline-warning"
                                                    onClick={() => handleOpenModalUpdate(product)}>Sửa</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-danger"
                                                    onClick={() => handleOpenModalDelete(product)}>Xóa</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}

export default Dashboard

Dashboard.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export async function getStaticProps(context) {
    
    const allProducts = await getAllProducts()

    return {
        props: {
            listProduct: allProducts
        },
    }
}
