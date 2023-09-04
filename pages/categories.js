import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import api from "service/api";
import { useRouter } from 'next/router';
import CategoryModal from '@/components/admin/CategoryModal';
import Pagination from '@/components/common/Pagination';
import moment from 'moment';
import Swal from 'sweetalert2';
import SweetAlert from '@/components/common/SweetAlert';

const Category = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalPages, setTotalPages] = useState();
    const [totalEntries, setTotalEntries] = useState();
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            router.push('/login');
        }
    }, []);



    const fetchCategories = async () => {
        const response = await api.get('/categories', {
            params: {
                page: currentPage,
                perPage: itemsPerPage
            }
        });
        setCategories(response.data.CategoryData);
        setTotalPages(response.data.totalPages);
        setTotalEntries(response.data.totalCategory);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEdit = category => {
        setSelectedCategory(category);
        setShowModal(true);
    };

    const handleSaveCategory = async (newCategory) => {
        try {
            if (newCategory._id) {
                await api.put(`/categories/${newCategory._id}`, newCategory);
            } else {
                console.log(newCategory)
                await api.post('/categories', newCategory, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            setShowModal(false);
            fetchCategories();
            setShowAlert(true);
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleDelete = async id => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(category => category._id !== id));
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: 'Category deleted'
            });
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    return (
        <AdminLayout>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Category</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Category</li>
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
                                    <h3 className="card-title">Category list</h3>
                                    <button className="btn btn-secondary btn-sm float-right" onClick={setShowModal}>
                                        Add Category
                                    </button>
                                    <CategoryModal
                                        show={showModal}
                                        onClose={() => setShowModal(false)}
                                        category={selectedCategory}
                                        onSave={handleSaveCategory}
                                    />
                                </div>

                                <div className="card-body">
                                    <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12">
                                        <table id="example2" className="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example2_info">
                                            <thead>
                                                <tr><th className="sorting sorting_asc" aria-controls="example2" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Title</th>
                                                    <th className="sorting" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Browser: activate to sort column ascending">Slug</th>
                                                    <th className="sorting" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Platform(s): activate to sort column ascending">Image</th>
                                                    <th className="sorting" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Engine version: activate to sort column ascending">Created At</th>
                                                    <th className="sorting" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="CSS grade: activate to sort column ascending">Action</th></tr>
                                            </thead>
                                            <tbody>
                                                {categories.map((category) => (
                                                    <tr className="odd" key={category._id}>
                                                        <td className="dtr-control sorting_1">{category.category_name_en}{category.category_name_bn}</td>
                                                        <td>{category.category_slug_en}</td>
                                                        <td><img src={category.category_image} /></td>
                                                        <td>{moment(category.createdAt).format('LLL')}</td>
                                                        <td>
                                                            <button className='btn btn-sm btn-outline-secondary' onClick={() => handleEdit(category)}>Edit</button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => handleDelete(category._id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>


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
            {showAlert && <SweetAlert title="Category saved successfully!" type="success" />}
        </AdminLayout>
    );
};

export default Category;
