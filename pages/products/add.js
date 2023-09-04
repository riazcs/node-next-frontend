import { useEffect, useState } from 'react'; // Import useState
import AdminLayout from '@/components/AdminLayout';
import api from "service/api";
import { useRouter } from 'next/router';

const AddProduct = () => {
    const router = useRouter();
    const [title, setTitle] = useState(''); // Add state for title
    const [image, setImage] = useState(''); // Add state for image
    const [quantity, setQuantity] = useState(''); // Add state for quantity

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            router.push('/login');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/products', {
                title,
                image,
                quantity
            });
            console.log('Product added:', response.data);
            router.push('/products'); // Redirect to products page
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Add Product</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <div className="card card-secondary">
                            <div className="card-header">
                                <h3 className="card-title">Product</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label >Title</label>
                                    <input
                                        type="text"
                                        id="inputTitle"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Image</label>
                                    <input
                                        type="text"
                                        id="inputImage"
                                        className="form-control"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Quantity</label>
                                    <input
                                        type="number"
                                        id="inputQuantity"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </AdminLayout>
    );
};

export default AddProduct;
