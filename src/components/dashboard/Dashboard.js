// MainContent.js
import React from 'react';
import './style.css';
export const Dashboard = () => {
    return (
        <section id="content">
            {/* NAVBAR */}
            
            {/* MAIN */}
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Dashboard</h1>
                        <ul className="breadcrumb">
                           
                        </ul>
                    </div>
                    
                </div>

                <ul className="box-info">
                    <li>
                        
                        <span className="text">
                            <h3>1020</h3>
                            <p>New Order</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-group' ></i>
                        <span className="text">
                            <h3>2834</h3>
                            <p>Visitors</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-dollar-circle' ></i>
                        <span className="text">
                            <h3>$2543</h3>
                            <p>Total Sales</p>
                        </span>
                    </li>
                </ul>

                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Recent Orders</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Date Order</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="img/people.png" alt="User"/>
                                        <p>John Doe</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                                {/* Other rows */}
                            </tbody>
                        </table>
                    </div>
                    <div className="todo">
                        <div className="head">
                            <h3>Todos</h3>
                            <i className='bx bx-plus' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <ul className="todo-list">
                            <li className="completed">
                                <p>Todo List</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            {/* Other todo items */}
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    );
}


