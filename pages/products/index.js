import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import api from "service/api";
import { useRouter } from 'next/router';
import Pagination from '@/components/common/Pagination';

const Products = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState();
    const [totalEntries, setTotalEntries] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            router.push('/login');
        }
        fetchProducts();
    }, [currentPage]);


    const fetchProducts = async () => {
        try {
            const response = await api.get('/products', {
                params: {
                    page: currentPage,
                    perPage: itemsPerPage
                }
            });
            setProducts(response.data.products); // Update with the correct property name
            setTotalPages(response.data.totalPages); // Update with the correct property name
            setTotalEntries(response.data.totalProducts); //
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await api.delete(`/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Product</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Product</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Product list</h3>
                                </div>

                                <div className="card-body">
                                    <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12">
                                        <table id="example2" className="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example2_info">
                                            <thead>
                                                <tr><th className="sorting sorting_asc" aria-controls="example2" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Title</th>
                                                    <th className="sorting" aria-controls="example2" aria-label="Browser: activate to sort column ascending">Category</th>
                                                    <th className="sorting" aria-controls="example2" aria-label="Platform(s): activate to sort column ascending">Price</th>
                                                    <th className="sorting" aria-controls="example2" aria-label="Engine version: activate to sort column ascending">Quantity</th>
                                                    <th className="sorting" aria-controls="example2" aria-label="CSS grade: activate to sort column ascending">Action</th></tr>
                                            </thead>
                                            <tbody>
                                                {products.map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product.title}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => handleEdit(product._id)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleDelete(product._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}</tbody>

                                        </table>
                                    </div></div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={newPage => setCurrentPage(newPage)}
                                            totalEntries={totalEntries}
                                            perPage={itemsPerPage}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </AdminLayout>
    );
};

export default Products;
