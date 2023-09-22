import React from 'react';
import moment from 'moment';
import { deleteTodoApi, markTodoApi } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todo({ todo, setRefreshList }) {
    const handleDelete = async () => {
        const result = await deleteTodoApi({
            todo_id: todo._id
        });

        if (result.data.status === 200) {
            setRefreshList(new Date());
            toast('Deleted');
        } else {
            toast('Failed to delete, please try again');
        }
    }

    const handleMarkTodo = async () => {
        const result = await markTodoApi({
            todo_id: todo._id
        });

        if (result.data.status === 200) {
            setRefreshList(new Date());
            toast(result.data.message);
        } else {
            toast('Failed to mark, please try again');
        }
    }

    return (
        <div className='col-sm-3 mx-3 my-2 alert bg-light mb-3' style={{ maxWidth: "20rem" }}>
            <div className="card-header mb-4">
                {todo.isCompleted ? 'Completed' : 'Not Completed'}
            </div>
            <div className="card-body">
                <h4 className='card-title mb-3' style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                    {todo.desc}
                </h4>
                <p className='card-text mb-3'>{moment(todo.date).fromNow()}</p>
            </div>

            <div className="actionButtons"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="deleteButton">
                    <button style={{ background: 'red' }} onClick={handleDelete}>Delete</button>
                </div>
                <div className="markTodo">
                    <button onClick={handleMarkTodo}>{todo.isCompleted ? 'Mark Uncomplete' : 'Mark Complete'}</button>
                </div>
            </div>
        </div>
    )
}

export default Todo;