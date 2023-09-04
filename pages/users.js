import { useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import api from "service/api";
import { useRouter } from 'next/router';

const User = () => {
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
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Projects</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Projects</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Projects</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th >
                                            #
                                        </th>
                                        <th >
                                            Project Name
                                        </th>
                                        <th>
                                            Team Members
                                        </th>
                                        <th>
                                            Project Progress
                                        </th>
                                        <th className="text-center">
                                            Status
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            #
                                        </td>
                                        <td>
                                            <a>
                                                Admin
                                            </a>
                                            <br />
                                            <small>
                                                Created 01.01.2019
                                            </small>
                                        </td>
                                        <td>
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                </li>
                                                <li className="list-inline-item">
                                                </li>
                                                <li className="list-inline-item">
                                                </li>
                                                <li className="list-inline-item">
                                                </li>
                                            </ul>
                                        </td>
                                        <td className="project_progress">
                                            <div className="progress progress-sm">
                                                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100">
                                                </div>
                                            </div>
                                            <small>
                                                57% Complete
                                            </small>
                                        </td>
                                        <td className="project-state">
                                            <span className="badge badge-success">Success</span>
                                        </td>
                                        <td className="project-actions text-right">
                                            <a className="btn btn-primary btn-sm" href="#">
                                                <i className="fas fa-folder">
                                                </i>
                                                View
                                            </a>
                                            <a className="btn btn-info btn-sm" href="#">
                                                <i className="fas fa-pencil-alt">
                                                </i>
                                                Edit
                                            </a>
                                            <a className="btn btn-danger btn-sm" href="#">
                                                <i className="fas fa-trash">
                                                </i>
                                                Delete
                                            </a>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>

                </section>

            </div>
        </AdminLayout>
    );
};

export default User;
