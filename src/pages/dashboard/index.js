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
                        message: 'Xo??a tha??nh c??ng',
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
                        message: 'C????p nh????t tha??nh c??ng',
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
                    <Modal title="C????p nh????t sa??n ph????m" open={isModalUpdateOpen}
                        onCancel={handleCancelUpdate}
                        footer={null}>
                        <div className="container">
                            <form onSubmit={handleOkUpdate}>
                                <div className="form-group">
                                    <label htmlFor="name">T??n</label>
                                    <input id="name" className="form-control" type="text"
                                        value={productSelected.name}
                                        onChange={e => setProductSelected({ ...productSelected, name: e.target.value })}
                                        placeholder='Nh????p t??n sa??n ph????m...' required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Gia??</label>
                                    <input id="price" className="form-control" type="number"
                                        value={productSelected.price} min={1}
                                        onChange={e => setProductSelected({ ...productSelected, price: Number(e.target.value) })}
                                        placeholder='Nh????p gia?? sa??n ph????m...' required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">M?? ta??</label>
                                    <textarea id="description" className="form-control" type="text"
                                        value={productSelected.description}
                                        onChange={e => setProductSelected({ ...productSelected, description: e.target.value })}
                                        required placeholder='Nh????p m?? ta?? sa??n ph????m...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Loa??i</label>
                                    <input id="category" className="form-control" type="text"
                                        value={productSelected.category}
                                        onChange={e => setProductSelected({ ...productSelected, category: e.target.value })}
                                        required placeholder='Nh????p loa??i sa??n ph????m...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="origin">Xu????t x????</label>
                                    <input id="origin" className="form-control" type="text"
                                        value={productSelected.origin}
                                        onChange={e => setProductSelected({ ...productSelected, origin: e.target.value })}
                                        required placeholder='Nh????p xu????t x???? sa??n ph????m...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">????????ng d????n</label>
                                    <input id="link" className="form-control" type="text"
                                        value={productSelected.link}
                                        onChange={e => setProductSelected({ ...productSelected, link: e.target.value })}
                                        required placeholder='Nh????p ????????ng d????n sa??n ph????m...'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discount">Khuy????n ma??i</label>
                                    <input id="discount" className="form-control" type="number"
                                        value={productSelected.discount} pattern="[0-100]"
                                        onChange={e => setProductSelected({ ...productSelected, discount: Number(e.target.value) })}
                                        required placeholder='Nh????p khuy????n ma??i sa??n ph????m...'
                                        min={0} max={100}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upload">Hi??nh a??nh</label><br />
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
                                    <button className="btn btn-primary mr-3" type="submit">C????p nh????t</button>
                                    <button className="btn btn-secondary" type="button" onClick={handleCancelUpdate}>Hu??y</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <Modal title="Xa??c nh????n xo??a" open={isModalDeleteOpen}
                        onOk={handleOkDelete} onCancel={handleCancelDelete}
                        okText='Xo??a' cancelText='Hu??y'>
                        <p>Ba??n ch????c ch????n mu????n xo??a sa??n ph????m na??y ch???? ?</p>
                    </Modal>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>All products</p>
                    <div className="table-responsive">

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>T??n</td>
                                    <td>Gia??</td>
                                    <td>M?? ta??</td>
                                    <td>Loa??i</td>
                                    <td>Xu????t x????</td>
                                    <td>????????ng d????n</td>
                                    <td>Khuy????n ma??i</td>
                                    <td colSpan={2} className='text-center'>Chi??nh s????a</td>
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
                                                    onClick={() => handleOpenModalUpdate(product)}>S????a</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-danger"
                                                    onClick={() => handleOpenModalDelete(product)}>Xo??a</button>
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
