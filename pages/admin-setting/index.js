import { useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import api from "service/api";
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            router.push('/login');
        }
    }, []);

    return (
        <AdminLayout>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Gallery</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Gallery</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Gallery list</h3>
                        </div>

                        <div className="card-body">
                            <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row">
                                <div className="col-sm-12 col-md-6">
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div id="example1_filter" className="dataTables_filter"><input type="search" className="form-control form-control-sm" placeholder="Search" aria-controls="example1" /></div></div></div><div className="row"><div className="col-sm-12">
                                        <table id="example1" className="table table-bordered table-striped dataTable dtr-inline" aria-describedby="example1_info">
                                            <thead>
                                                <tr><th className="sorting sorting_asc"   aria-controls="example1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Title</th>
                                                    <th className="sorting"   aria-controls="example1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Category</th>
                                                    <th className="sorting"   aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Type</th>
                                                    <th className="sorting"   aria-controls="example1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Salary Range</th>
                                                    <th className="sorting"   aria-controls="example1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Action</th></tr>
                                            </thead>
                                            <tbody>

                                                <tr className="odd">
                                                    <td className="dtr-control sorting_1"  >Gecko</td>
                                                    <td>Firefox 1.0</td>
                                                    <td>Win 98+ / OSX.2+</td>
                                                    <td>1.7</td>
                                                    <td>A</td>
                                                </tr></tbody>

                                        </table></div></div><div className="row"><div className="col-sm-12 col-md-5">
                                            <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div>
                                    <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                        <ul className="pagination"><li className="paginate_button page-item previous disabled" id="example1_previous"><a href="#" aria-controls="example1" data-dt-idx="0"   className="page-link">Previous</a></li>
                                            <li className="paginate_button page-item active"><a href="#" aria-controls="example1" data-dt-idx="1"   className="page-link">1</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="2"   className="page-link">2</a></li>
                                            <li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="3"   className="page-link">3</a></li><li className="paginate_button page-item "><a href="#" aria-controls="example1" data-dt-idx="4"   className="page-link">4</a></li><li className="paginate_button page-item ">
                                                <a href="#" aria-controls="example1" data-dt-idx="5"   className="page-link">5</a></li><li className="paginate_button page-item ">
                                                <a href="#" aria-controls="example1" data-dt-idx="6"   className="page-link">6</a>
                                            </li><li className="paginate_button page-item next" id="example1_next"><a href="#" aria-controls="example1" data-dt-idx="7"   className="page-link">Next</a></li></ul></div></div></div></div>
                        </div>

                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default Dashboard;
