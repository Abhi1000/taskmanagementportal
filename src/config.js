const server = 'http://localhost:8000';

const config = {
    getAllTasksURL: `${server}/tasks/allTasks`,
    addNewTask: `${server}/creatTask`,
    updateTask:`${server}/updateTask`,
    deleteTask:`${server}/deleteTask`
}

export default config;