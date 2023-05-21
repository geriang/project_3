import React, { useEffect, useRef, useContext, useCallback } from 'react';
import DataContext from './DataContext';

import axios from 'axios';

export default function ImageUpload() {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const formData = useContext(DataContext)

    // const [imageIds, setImageIds] = useState([]);

    const deleteImage = useCallback(async (id) => {

        // Delete the image from Cloudinary
        const response = await axios.post('http://localhost:3000/cloudinary/delete-selection-image', { publicId: id })

        console.log(response)

        if (response.data === 'deleted') {
            // Remove the image ID from the component's state
            // setImageIds(prevIds => prevIds.filter(prevId => prevId !== id));
            const clone = formData.getMediaData().slice()
            const indexToDelete = clone.findIndex((o) => { return o.id === id })
            const modifiedClone = [...clone.slice(0, indexToDelete), ...clone.slice(indexToDelete + 1)]
            formData.updateMediaData(modifiedClone)
            console.log("image deleted")
            widgetRef.current.close({ quiet: true })
        }

    }, [formData])

    useEffect(() => {


        cloudinaryRef.current = window.cloudinary;
        widgetRef.current =

            cloudinaryRef.current.createUploadWidget({
                cloudName: 'dxnkwi2rt',
                uploadPreset: 'ml_default',
                multiple: true,
            }, function (error, result) {
                console.log(result)
                if (result.event === 'success') {
                    const url = result.info.secure_url
                    const id = result.info.public_id
                    const type = result.info.resource_type
                    formData.updateMediaData((clone) => [...clone, { id, url, type }])
                    widgetRef.current.hide();
                }

            })
    }, [formData])

    return (
        <>
            <div>
                <button className='btn btn-success' onClick={() => { widgetRef.current.open() }}>Upload Media</button>
            </div>
            <div className='container'>
                <div className='row'>
            {formData.getMediaData().map((r) => {
                return (
                    <div className='col' key={r.id}>
                    <div className="card" style={{ width: "8rem" }}>
                        <img src={r.url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <button className="btn btn-primary btn-sm" onClick={() => { deleteImage(r.id) }}>Delete</button>
                        </div>
                    </div>
                    </div>
                )
            
            })}
            </div>
            </div>

        </>
    )

}

