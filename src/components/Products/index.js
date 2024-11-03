import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import ProductContext from "../../contexts/ProductContext";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';

function Products() {
    const [showAddProduct, setShowAddProduct] = useState(false);

    return <>
        <div className="md:ml-10">
            {!showAddProduct && <button type="button" onClick={() => { setShowAddProduct(!showAddProduct) }} className="m-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Product</button>}

            {/* show/hide Add Product */}
            {showAddProduct && <AddProduct setShowAddProduct={setShowAddProduct} />}

            {/* show/hide Product List */}
            {!showAddProduct && <ProductList />}
        </div> 
    </>
}

function ProductList() {
    const { products, setProducts } = useContext(ProductContext);

    function handleDeleteProduct(_index) {
        setProducts(products.filter((_, index) => index !== _index));
    }

    return <>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return <tr className="bg-white border-b light:bg-gray-800 light:border-gray-700" key={index}>
                            <td className="px-6 py-4">
                                <img src={product.image} style={{ height: '100px' }} />
                            </td>
                            <td className="px-6 py-4">
                                {product.name}
                            </td>
                            <td className="px-6 py-4">
                                {product.category}
                            </td>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="px-6 py-4">
                                <button type="button" onClick={() => handleDeleteProduct(index)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    </>
}

function AddProduct({ setShowAddProduct }) {
    const history = useHistory();

    const { products, setProducts } = useContext(ProductContext);

    const validationSchema = Yup.object().shape({
        category: Yup.string().required(),
        name: Yup.string().required(),
        price: Yup.number().required(),
        image: Yup.string().required(),
        description: Yup.string().required()
    });

    const handleImageUpload = (e) => {
        let base64String = "";
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // convert file to base64 String
            base64String = reader.result
                .replace("data:", "")
                .replace(/^.+,/, "");
            // store file
            try {
                localStorage.setItem("pic", base64String);

            }
            catch (e) {
                console.log(e)
            }
            setFieldValue("image", `data:image/png;base64,${base64String}`);
        };
        reader.readAsDataURL(file);
    }

    const { handleSubmit, handleChange, values, errors, handleBlur, touched, setFieldValue } = useFormik({
        initialValues: {
            category: 'Technology',
            name: '',
            price: '',
            image: '',
            description: ''
        },
        onSubmit: values => {
            values.price = values.price + ' TL';

            setProducts([...products, values]);
            setShowAddProduct(false);

            history.push('/');
        },
        validationSchema
    });

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                        Category / Product Name
                    </label>
                    <div className="relative mt-2.5">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="category" className="sr-only">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            >
                                <option value={'Technology'}>Technology</option>
                                <option value={'Fashion'}>Fashion</option>
                                <option value={'Home/Life'}>Home/Life</option>
                                <option value={'Garden'}>Garden</option>
                            </select>
                        </div>
                        <input
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Product Name"
                            className="block w-full rounded-md border-0 px-3.5 py-2 pl-40 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.category && touched.category && <div className='inputErrorMessage'>{errors.category}</div>}
                    {errors.name && touched.name && <div className='inputErrorMessage'>{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm/6 font-semibold text-gray-900">
                        Price (TL)
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="price"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.price && touched.price && <div className='inputErrorMessage'>{errors.price}</div>}
                </div>
                <div>

                    <label htmlFor="image" className="block text-sm/6 font-semibold text-gray-900">
                        İmage
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="image"
                            name="image"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            type="file"
                            onChange={(e) => handleImageUpload(e)}
                            onBlur={handleBlur} />
                    </div>
                    {errors.image && touched.image && <div className='inputErrorMessage'>{errors.image}</div>}
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm/6 font-semibold text-gray-900">
                        Description
                    </label>
                    <div className="mt-2.5">
                        <textarea
                            id="description"
                            name="description"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    {errors.description && touched.description && <div className='inputErrorMessage'>{errors.description}</div>}
                </div>
            </div>

            <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
                <button
                    onClick={() => { setShowAddProduct(false) }}
                    type="submit"
                    className="block w-full rounded-md bg-gray-800 mt-3 mb-3 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default Products;