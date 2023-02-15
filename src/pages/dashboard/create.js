import DashboardLayout from "@/components/dashboardLayout"
import Notify from "@/components/notify"
import { storage } from "@/firebase/configFirebase"
import { addProduct } from "@/service/productService/apiService"
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { ref, uploadBytes } from "firebase/storage"
import { useState } from "react"

function Create() {

    const [listUpload, setListUpload] = useState([])
    const [listImagesToStore, setListImageToStore] = useState([])
    const [isDisplayUpload, setDisplayUpload] = useState(false)
    const [notify, setNotify] = useState({
        status: false,
        message: '',
        type: ''
    })

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        origin: '',
        discount: 0,
        image: [],
        link: ''
    })

    /* display notify */
    const handleNotify = () => {
        setTimeout(() => {
            setNotify({ ...notify, status: false })
        }, [2000])
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        setNotify(
            {
                status: true,
                message: 'Thêm sản phẩm thành công',
                type: 'success'
            }
        )
        await addProduct(product)
            .then(res => {
                setNotify(
                    {
                        status: true,
                        message: 'Cập nhật thành công',
                        type: 'success'
                    }
                )
                handleResetForm()
                handleNotify()
                uploadImageToStorage()
            })
            .catch(err => {
                setNotify(
                    {
                        status: true,
                        message: err.message,
                        type: 'error'
                    }
                )
                handleResetForm()
            })
    }

    const uploadImageToStorage = () => {
        for (let i = 0; i < listImagesToStore.length; i++) {
            const imageRef = ref(storage, `images/${listImagesToStore[i].name}`)
            uploadBytes(imageRef, listImagesToStore[i])
                .then(() => {
                    console.log('images uploaded successfully!')
                })
        }
    }

    const handleUpload = (listImageUpload) => {
        let listImages = []
        if (listImageUpload === null) return;
        setListImageToStore([...listImageUpload])

        for (let i = 0; i < listImageUpload.length; i++) 
            listImages.push(listImageUpload[i].name)

        setListUpload(listImages)
        setProduct({ ...product, image: listImages })
        setDisplayUpload(true)
    }

    const handleResetForm = () => {
        setProduct({
            _id: '',
            name: '',
            price: 0,
            description: '',
            category: '',
            origin: '',
            discount: 0,
            image: [],
            link: ''
        })
    }

    return (
        <>
            {
                notify.status &&
                <Notify message={notify.message} type={notify.type} />
            }
            <DashboardLayout>
                <main>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Create products</p>

                    <div className="container p-2">

                        <form onSubmit={handleCreate} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px', padding: '50px' }}>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="name">Tên</label>
                                <input id="name" className="form-control" type="text"
                                    value={product.name}
                                    onChange={e => setProduct({ ...product, name: e.target.value })}
                                    placeholder='Nhập tên sản phẩm...' required
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="price">Giá</label>
                                <input id="price" className="form-control" type="number"
                                    value={product.price} min={1}
                                    onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
                                    placeholder='Nhập giá sản phẩm...' required
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="description">Mô tả</label>
                                <textarea id="description" className="form-control" type="text"
                                    value={product.description}
                                    onChange={e => setProduct({ ...product, description: e.target.value })}
                                    required placeholder='Nhập mô tả sản phẩm...'
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="category">Loại</label>
                                <input id="category" className="form-control" type="text"
                                    value={product.category}
                                    onChange={e => setProduct({ ...product, category: e.target.value })}
                                    required placeholder='Nhập loại sản phẩm...'
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="origin">Xuất xứ</label>
                                <input id="origin" className="form-control" type="text"
                                    value={product.origin}
                                    onChange={e => setProduct({ ...product, origin: e.target.value })}
                                    required placeholder='Nhập xuất xứ sản phẩm...'
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="link">Đường dẫn</label>
                                <input id="link" className="form-control" type="text"
                                    value={product.link}
                                    onChange={e => setProduct({ ...product, link: e.target.value })}
                                    required placeholder='Nhập đường dẫn sản phẩm...'
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="discount">Khuyến mãi</label>
                                <input id="discount" className="form-control" type="number"
                                    value={product.discount} pattern="[0-100]"
                                    onChange={e => setProduct({ ...product, discount: Number(e.target.value) })}
                                    required placeholder='Nhập khuyến mãi sản phẩm...'
                                    min={0} max={100}
                                />
                            </div>
                            <div className="form-group">
                                <label className="font-weight-bold" htmlFor="upload">Hình ảnh</label><br />
                                <Button>
                                    <label htmlFor="upload" style={{cursor: 'pointer'}}>
                                        <UploadOutlined /><span className="ml-2">Upload</span>
                                        <input id="upload" type="file" hidden multiple
                                            onChange={(e) => handleUpload(e.target.files)} />
                                    </label>
                                </Button>
                                <div className="mt-2">
                                    {
                                            listUpload?.map((image, index) => (
                                                <div className="text-success" key={index}>
                                                    <FileImageOutlined /><span className="ml-1">{image}</span>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary mr-3" type="submit">Thêm sản phẩm</button>
                            </div>
                        </form>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}

export default Create


Create.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}