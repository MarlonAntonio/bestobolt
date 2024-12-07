import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'

    function AddProduct({ addProduct }) {
      const [name, setName] = useState('')
      const [link, setLink] = useState('')
      const [imageFile, setImageFile] = useState(null)
      const [imagePreview, setImagePreview] = useState(null)
      const navigate = useNavigate()

      const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
          setImageFile(file)
          const reader = new FileReader()
          reader.onloadend = () => {
            setImagePreview(reader.result)
          }
          reader.readAsDataURL(file)
        }
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        const newProduct = {
          id: Date.now(),
          name,
          link,
          image: imagePreview
        }
        addProduct(newProduct)
        navigate('/gallery')
      }

      return (
        <div className="add-product-form">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="link-input">
              <input
                type="text"
                placeholder="Product Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <button type="submit">Add Product</button>
          </form>
        </div>
      )
    }

    export default AddProduct
