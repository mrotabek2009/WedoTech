import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import SingleProduct from './pages/SingleProduct.jsx'
import Products from './pages/Products.jsx'
import Admin from './admin/Admin.jsx'
import ErrorPage from './components/Error.jsx'
import AddProducts from './admin/AddProducts.jsx'
import RemoveProducts from './admin/RemoveProducts.jsx'
import EditProducts from './admin/EditProducts.jsx'
import EditProductsView from './admin/EditProductsView.jsx'
import Categories from './pages/Categories.jsx'
import SingleCategories from './pages/SingleCategories.jsx'
import SearchResults from './pages/SearchResults.jsx.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import AdminLogin from './admin/AdminLogin.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/products',
		element: <Products />,
	},
	{
		path: '/products/:slug',
		element: <SingleProduct />,
	},
	{
		path: '/categories',
		element: <Categories />,
	},
	{
		path: '/categories/:category',
		element: <SingleCategories />,
	},
	{
		path: '/search',
		element: <SearchResults />,
	},
	{
		path: '/wedo-tech-admin-dashboard',
		element: <Admin />,
	},
	{
		path: '/wedo-tech-admin-dashboard/add-product',
		element: <AddProducts />,
	},
	{
		path: '/wedo-tech-admin-dashboard/remove-product',
		element: <RemoveProducts />,
	},
	{
		path: '/wedo-tech-admin-dashboard/edit-product',
		element: <EditProductsView />,
	},
	{
		path: '/wedo-tech-admin-dashboard/edit-product/:slug',
		element: <EditProducts />,
	},
	{ path: '/wedo-tech-admin-login', element: <AdminLogin /> },
	{
		path: '*',
		element: <ErrorPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</RouterProvider>
	</React.StrictMode>
)
