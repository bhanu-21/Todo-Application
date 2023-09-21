import React from 'react'

function Todo() {
    return (
        <div className='col-sm-3 mx-3 my-2 alert bg-light mb-3' style={{ maxWidth: "20rem" }}>
            <div className="card-header mb-4">
                Header
            </div>
            <div className="card-body">
                <h4 className='card-title mb-3'>Light Card Title</h4>
                <p className='card-text mb-3'>Some text example</p>
            </div>
        </div>
    )
}

export default Todo;