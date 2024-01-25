import React from "react";
import MaterialTable from 'material-table';
import { getAllTasks, addNewTask, updateTask, deleteTask } from "../services/listcomponentService";

const taskStatusList = Object.freeze({
    TODO: 'To Do',
    INPROGRESS: 'In Progress',
    DONE: 'Done'
})

class Listcomponent extends React.Component {

    constructor() {
        super();
        this.state = {
            tasks: []
        }
    }
    componentDidMount() {
        getAllTasks().then(response => {
            if (response.status === 200) this.setState({ tasks: response.data })
            else console.log('Something went wrong!!')
        });
    }
    render() {
        return (
            <div className="list-container">
                <MaterialTable style={{ margin: '50px 150px' }}
                    title="List of Available Tasks"
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Description', field: 'description' },
                        {
                            title: 'Status',
                            field: 'taskStatus',
                            lookup: taskStatusList,
                        },
                        {
                            title: 'Due Date', field: 'dueDate', type: 'date',
                        },
                    ]}
                    data={this.state.tasks}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#e3f2fd',
                            color: '#01579b',
                        },
                        pageSizeOptions: [5, 10, 20],
                        addRowPosition: 'first',
                        thirdSortClick: false,
                        search: true
                    }}
                    editable={
                        {
                            onRowAdd: (newTask) => (newTask?.name && newTask.name !== '' ?
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        if (/^[a-z0-9_. ]+$/.test(newTask.name)) {
                                            addNewTask(newTask).then((task) => {
                                                if (task.status === 200) {
                                                    getAllTasks().then((latestTasks) => {
                                                        if (latestTasks.status === 200) {
                                                            this.setState({ tasks: latestTasks.data })
                                                        } else {
                                                            alert('Some error occurd while fetching tasks!!!')
                                                        }
                                                    })
                                                }
                                                resolve();
                                            })
                                        } else {
                                            alert('Special characters are not allowed');
                                            reject();
                                        }
                                    }, 1000)
                                }) : new Promise((reject) => {
                                    setTimeout(() => {
                                        alert('Fields cant be blank');
                                        reject();
                                    }, 1000);
                                })
                            ),
                            onRowUpdate: (newData, oldData) => (
                                newData?.name && newData.name !== '' ?
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            if (/^[a-z0-9_. ]+$/.test(newData.name)) {
                                                updateTask(newData, oldData.name).then((response) => {
                                                    if (response.status === 200) {
                                                        const data = [...this.state.tasks];
                                                        const index = oldData.tableData.id
                                                        data[index] = newData;
                                                        this.setState({ tasks: data });
                                                    }
                                                })
                                            } else {
                                                alert('Special characters are not allowed');
                                                reject();
                                            }
                                            resolve();
                                        }, 1000)
                                    }) : new Promise((reject) => {
                                        setTimeout(() => {
                                            alert('Fields cant be blank');
                                            reject();
                                        }, 1000);
                                    })
                            ),
                            onRowDelete: (oldData) => new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    deleteTask(oldData.name).then((response) => {
                                        if (response.status === 200) {
                                            const data = [...this.state.tasks];
                                            const index = oldData.tableData.id
                                            data.splice(index, 1);
                                            this.setState({ tasks: data });
                                        } else {
                                            alert('Unable to delete task, try again later!!');
                                            reject();
                                        }
                                    });
                                    resolve();
                                }, 1000);
                            }),
                        }
                    }
                />
            </div>
        )
    }
}

export default Listcomponent;