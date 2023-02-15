import { storage } from '@/firebase/configFirebase'
import { useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FIRST_HALF_IMG_URL, LAST_HALF_IMG_URL } from '@/ultilities/constant/imageUrl'

function Demo() {
    const [images, setImages] = useState([])

    const listImg = ['bruno.jpg', 'logoMoonStore.png']
    const [imageUrls, setImageUrls] = useState([])
    const [text, setText] = useState('asdsad')

    const handleUploadImages = (e) => {
        e.preventDefault()
        if (images === null) return;
        for (let i = 0; i < images.length; i++) {
            const imageRef = ref(storage, `images/${images[i].name}`)
            uploadBytes(imageRef, images[i])
                .then(() => {
                    console.log('images uploaded successfully!')
                })
        }
    }

    useEffect(() => {
        listImg.forEach(image => {
            getDownloadURL(ref(storage, `images/${image}`))
            .then((url) => {
                setImageUrls(prev => [...prev, url])
            })
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('hihi')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* Upload images: <br />
                <input type="file" multiple name="images"
                    onChange={e => setImages(e.target.files)} /><br /> */}
                <input type="text" required onChange={e => setText(e.target.value)} value={text}/>
                <button type="submit">Upload</button>
            </form>

            {/* {
                listImg && 
                listImg.map((image, index) => (
                    <img key={index} src={`${FIRST_HALF_IMG_URL}${image}${LAST_HALF_IMG_URL}`} alt='img' />

                ))
            } */}

            {/* call api tai image ve sau do download image dung useEffect */}
        </>
    )
}

export default Demo

Demo.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}