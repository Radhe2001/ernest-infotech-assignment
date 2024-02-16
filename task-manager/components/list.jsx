import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { toggle } from '../redux/changeSlice';

function List() {
    const change = useSelector(state => state.change.value)
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("http://localhost:5000/get")
            .then(response => {
                setData(response.data.results)
            })
            .catch(error => console.log(error))
    }, [change])

    const updateTask = (id) => {
        axios.put("http://localhost:5000/update/" + id, {})
        alert("task status has been changed successfully")
        dispatch(toggle())
    }
    const deleteTask = (id) => {
        axios.delete("http://localhost:5000/delete/" + id)
        alert("task has been deleted successfully")
        dispatch(toggle())
    }
    return (
        <ol>{data.map((item, index) => {
            return <li key={index}>
                <div style={{display:"inline-flex" , gap:"40px"}}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.completed == 0 ? <button onClick={(e) => {
                        e.preventDefault();
                        updateTask(item.id)
                    }}>mark complete</button>:null}
                    <button onClick={(e) => {
                        e.preventDefault();
                        deleteTask(item.id)
                    }}>delete</button>
                </div>
            </li>
        })}</ol>
    )
}

export default List