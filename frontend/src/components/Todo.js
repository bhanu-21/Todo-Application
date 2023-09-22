import React from 'react';
import moment from 'moment';

function Todo({ todo }) {
    return (
        <div className='col-sm-3 mx-3 my-2 alert bg-light mb-3' style={{ maxWidth: "20rem" }}>
            <div className="card-header mb-4">
                {todo.isCompleted ? 'Completed' : 'Not Completed'}
            </div>
            <div className="card-body">
                <h4 className='card-title mb-3'>{todo.desc}</h4>
                <p className='card-text mb-3'>{moment(todo.date).fromNow()}</p>
            </div>
        </div>
    )
}

export default Todo;