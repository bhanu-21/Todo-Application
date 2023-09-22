import React, { useEffect, useState } from 'react'
import Header from './Header';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { getTodoListApi, getToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [list, setList] = useState([]);
    const [refreshList, setRefreshList] = useState();
    const [searchText, setSearchText] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        if (!getToken()) {
            navigation('/login');
        };

        fetchTodoList();

        // eslint-disable-next-line
    }, [refreshList]);

    useEffect(() => {
        if (searchText === '') {
            setFilteredList(list);
        } else {
            const filterlist = list.filter(todo => todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()));
            setFilteredList(filterlist);
        }
    }, [list, searchText])

    async function fetchTodoList() {
        const result = await getTodoListApi();
        console.log('todoooliissstt....', result);
        if (result.status === 200 && result.data.status === 200) {
            setList(result.data.data.todos.reverse());
        }
    }

    return (
        <div>
            <Header searchText={searchText} setSearchText={setSearchText} />
            <ToastContainer />

            <div className="container">
                <div className="row justify-content-md-center mt-4">
                    {filteredList.map((todo) => <Todo key={todo._id} todo={todo} setRefreshList={setRefreshList} />)}

                    {filteredList.length === 0 && <div className='notFoundTodos'>No todos found</div>}
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

            <AddTodo setRefreshList={setRefreshList} />
        </div>
    )
}

export default Home;