import axios from 'axios';
import config from '../config';

export const getAllTasks = () => {
    const getAllTasksRequest = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        url: config.getAllTasksURL
    }
    return axios(getAllTasksRequest)
        .then((res) => res)
        .catch((err) => err);
}

export const addNewTask = (newTask) => {
    const addNewTaskRequest = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        url: config.addNewTask,
        data: newTask
    }
    return axios(addNewTaskRequest)
        .then((res) => res)
        .catch((err) => err);
}


export const updateTask = (task,name) => {
    const updateTaskRequest = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        url: `${config.updateTask}/${name}`,
        data: task
    }
    return axios(updateTaskRequest)
        .then((res) => res)
        .catch((err) => err);
}



export const deleteTask = (task) => {
    const deleteTaskRequest = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        url: `${config.deleteTask}/${task}`,
    }
    return axios(deleteTaskRequest)
        .then((res) => res)
        .catch((err) => err);
}

