import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTodoApi } from '../services/api';

function AddTodo({ setRefreshList }) {
    const [todoDesc, setTodoDesc] = useState('');

    const handleTodoSubmit = async () => {
        console.log('todossss.....', todoDesc);
        if (todoDesc === '') {
            toast('Todo is required');
            return;
        }

        const result = await createTodoApi({ desc: todoDesc });
        if (result.status === 200 && result.data.status === 200) {
            toast('Todo Added');
            setRefreshList(new Date());
            setTodoDesc('');
        } else {
            toast(result.data.message);
        }
    }

    return (
        <>
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
                                <textarea name=""
                                    className='form-control'
                                    rows={3}
                                    placeholder='Write todos...'
                                    onChange={(e) => { setTodoDesc(e.target.value) }}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleTodoSubmit}>
                                Save Todo
                            </button>
                            <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setTodoDesc('') }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTodo;