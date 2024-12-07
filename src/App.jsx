import React, { useState } from 'react'
    import { Routes, Route, Navigate } from 'react-router-dom'
    import Login from './Login.jsx'
    import ProductGallery from './ProductGallery.jsx'
    import AddProduct from './AddProduct.jsx'
    import EditProduct from './EditProduct.jsx'
    import ProductDetail from './ProductDetail.jsx'

    function App() {
      const [isAuthenticated, setIsAuthenticated] = useState(false)
      const [products, setProducts] = useState([])

      const handleLogin = () => {
        setIsAuthenticated(true)
      }

      const handleLogout = () => {
        setIsAuthenticated(false)
      }

      const addProduct = (newProduct) => {
        setProducts([...products, newProduct])
      }

      const updateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product))
      }

      const deleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId))
      }

      return (
        <div>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/gallery"
              element={
                isAuthenticated ? (
                  <ProductGallery products={products} onLogout={handleLogout} deleteProduct={deleteProduct} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-product"
              element={
                isAuthenticated ? (
                  <AddProduct addProduct={addProduct} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                isAuthenticated ? (
                  <EditProduct products={products} updateProduct={updateProduct} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/product-detail/:id"
              element={
                isAuthenticated ? (
                  <ProductDetail products={products} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      )
    }

    export default App
