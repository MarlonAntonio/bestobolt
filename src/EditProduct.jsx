import React, { useState, useEffect } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'

    function EditProduct({ products, updateProduct }) {
      const { id } = useParams()
      const product = products.find(product => product.id === parseInt(id))
      const [name, setName] = useState(product ? product.name : '')
      const [link, setLink] = useState(product ? product.link : '')
      const [imageFile, setImageFile] = useState(null)
      const [imagePreview, setImagePreview] = useState(product ? product.image : null)
      const navigate = useNavigate()

      useEffect(() => {
        if (product) {
          setName(product.name)
          setLink(product.link)
          setImagePreview(product.image)
        }
      }, [product])

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
        const updatedProduct = {
          id: parseInt(id),
          name,
          link,
          image: imagePreview
        }
        updateProduct(updatedProduct)
        navigate('/gallery')
      }

      return (
        <div className="add-product-form">
          <h2>Edit Product</h2>
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
            <button type="submit">Update Product</button>
          </form>
        </div>
      )
    }

    export default EditProduct
