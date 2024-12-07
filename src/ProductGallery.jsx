import React, { useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom'

    function ProductGallery({ products, onLogout, deleteProduct }) {
      const navigate = useNavigate()
      const [searchTerm, setSearchTerm] = useState('')

      const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }

      const filteredProducts = products.filter(product =>
        normalizeString(product.name).includes(normalizeString(searchTerm))
      )

      const sortedProducts = [...filteredProducts].sort((a, b) => b.id - a.id)

      return (
        <div>
          <nav>
            <Link to="/add-product">Add Product</Link>
            <button onClick={onLogout}>Logout</button>
          </nav>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="gallery">
            {sortedProducts.map(product => (
              <div key={product.id} className="product">
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product-info">
                  <h3>{product.name}</h3>
                </div>
                <div className="action-buttons">
                  <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default ProductGallery
