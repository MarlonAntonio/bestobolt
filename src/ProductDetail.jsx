import React from 'react'
    import { useParams, Link } from 'react-router-dom'

    function ProductDetail({ products }) {
      const { id } = useParams()
      const product = products.find(product => product.id === parseInt(id))

      if (!product) {
        return <div>Product not found</div>
      }

      return (
        <div className="product-detail">
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <div>
            <Link to="/gallery">Back to Gallery</Link>
          </div>
        </div>
      )
    }

    export default ProductDetail
