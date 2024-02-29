import React, { useReducer, useState } from 'react';
import { CiCircleCheck } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

const Todo = () => {
    const [list, setList] = useState([]);
    const [newTask, setNewTask] = useState('');


    function addTask(e) {
        e.preventDefault();
        if (newTask.trim() !== '') {
            console.log('object');
            setList([...list, {id: Date.now(), title:newTask, isCompleted: false}])
            setNewTask('')
            return;
        }
        alert('please enter a task');

    }

    function toggleTask(id) {
        setList(
            list.map((task) => {
                return task.id === id ? {...task, isCompleted: !task.isCompleted} : task
            })
        )
    }

    function removeTask(id) {
        setList(
            list.filter(task => {
                return task.id !== id;
            })
        )
    }

    return (
        <div>
            <h1>todo list app</h1>

            <div className="status">
            <p className="tasks-left">
            left: {list.filter(task => !task.isCompleted).length} 
            </p>
            <p className="tasks-left">
            completed: {list.filter(task => task.isCompleted).length} 
            </p>
            </div>

            <form>
            <input type="text" placeholder='add your tasks...' value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
            <button type='submit' onClick={addTask}>
                <FaPlus />
            </button>
            </form>

            <ul>
                {list.map((task) => {
                    const {id, title,  isCompleted} = task;   
                    return <li key={id}>
                    <button onClick={() => toggleTask(id)}>
                    <CiCircleCheck />
                    </button>
                    <p className={isCompleted ? 'completed' : ''}>{title}</p>
                    <button onClick={() => removeTask(id)}>
                    remove
                    </button>
                    </li>
                })}
                {list.length <= 0 && <h3>No Tasks</h3>}
            </ul>
            {list.length > 0 && <button onClick={() => setList([])}>Clear All</button>}
        </div>
    );
};

export default Todo;