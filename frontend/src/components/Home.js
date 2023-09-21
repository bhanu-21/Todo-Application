import React from 'react'
import Header from './Header';
import Todo from './Todo';

function Home() {
    return (
        <div>
            <Header />

            <div className="container">
                <div className="row justify-content-md-center mt-4">
                    <Todo />
                    <Todo />
                    <Todo />
                </div>
            </div>

            <div className='' style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
                <button
                    type='button'
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className='btn btn-outline-light'>
                    Add
                </button>
            </div>

            <div className="modal fade mt-5" id="exampleModal">
                <div className="modal-dialog" role='document'>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <textarea name="" className='form-control' rows={3} placeholder='Write todos...'></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary">Save Todo</button>
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;