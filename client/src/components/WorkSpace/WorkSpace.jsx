// *** NPM ***
import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import {Route, Switch, Link} from 'react-router-dom';




// *** OTHER ***
import instance from '../../instance/instance'
import Tasks from '../../pages/Tasks/Tasks'
import Reports from '../../pages/Reports/Reports'
import Releases from '../../pages/Releases/Releases'
import KanbanDesk from '../KanbanDesk/KanbanDesk'
import TaskDialog from '../TaskDialog/TaskDialog';
import NavPanel from '../NavPanel/NavPanel';

const useStyles = makeStyles({
    workSpace:{
    },
    header:  {
        height: '90px',
        width: '100%',
        backgroundColor: '#1e2a4a',
        display: 'flex', 
        flexDirection:'row',
        
    },
    layout: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
    },
    title: {
        color: '#EC5990',
        fontSize: '40px',
        fontWeight: 100,
        margin: 'auto 0 auto 25px',
    },
    btn:{
        backgroundColor: '#EC5990',
        color: '#fff',
        textTransform: 'none',
        '&:hover':{
            backgroundColor: '#bf1650',
        },
        height: '30px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    loader: {
        position:'absolute',
        left: '50%',
        top: '50%'
    },
    link:{
        margin: 'auto 30px',
        color: '#fff',
        '&:hover':{
            color: '#bf1650'
        }
    },
})


const WorkSpace = (props) => {
    const styles = useStyles();
    const {setAuth, user, fetchCheckAuth} = props

    // *** STATES ***
    const [isTaskDialogOpen, setTaskDialogOpen] = useState(false)
    const [isEditInfo, setEditInfo] = useState(false)
    const [editableTask, setEditableTask] = useState()
    const [newTask, setNewTask] = useState()
    const [boards, setBoards] = useState(null)
    const [priority, setPriority] = useState()
    const [statuses, setStatuses] = useState()
    const [users, setUsers] = useState()
    const [isLoading, setLoading] = useState(true)
    const [taskId, setTaskId] = useState()

    const [isActiveNavElem, setActiveNavElem] = useState('canban')

    const [isFetchDelete, setFetchDelete] = useState(false)
    const [isFetchCreate, setFetchCreate] = useState(false)
    const [isFetchEdit, setFetchEdit] = useState(false)


    const handleClickOpen = () => {
        setTaskDialogOpen(true);
      };


    const sighOut = async() => {
        try {
            await instance.get('/logout')
            setAuth(false)
           
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchNewTask = async() => {
        try {
            await instance.post('/tasks', newTask)
            setFetchCreate(true)
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchTasks = async() => {
        try {
            const response = await instance.get('/tasks')
            console.log('TASKS:', response.data)
           
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchTaskStatus = async() => {
        try {
            const response = await instance.get('/statuses')
            setStatuses(response.data)
           
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchTaskPriority = async() => {
        try {
            const response = await instance.get('/priority')
            setPriority(response.data)
           
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchUsers = async() => {
        try {
            const response = await instance.get('/users')
            setUsers(response.data)
           
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchBoard = async() => {
        try {
            const response = await instance.get('/board')
            setBoards(response.data)
            setFetchCreate(false)
            setFetchDelete(false)
            setFetchEdit(false)
            setLoading(false)
           
        } catch (error) {
            console.log(error)
            setLoading(false)
            
        }
    }

    

    useEffect(()=>{
        fetchTasks()
        fetchTaskStatus()
        fetchTaskPriority()
        fetchUsers()
        fetchBoard()
        fetchCheckAuth()
    },[])

    useEffect(()=>{
        fetchNewTask()
    },[newTask])


    useEffect(()=>{        
        setLoading(true)
        fetchBoard()
    }, [isFetchDelete, isFetchEdit, isFetchCreate])




    return(
        <section className = {styles.workSpace}>
            <header className = {styles.header}>
                <h2 className={styles.title}>Works Space</h2>
                <Button variant="contained" color="primary" className={styles.btn} onClick={handleClickOpen}>
                    Создать задачу
                </Button>
                <p style={{margin: 'auto 0', color: '#fff', fontSize: '20px'}}>{user?.username}</p>
                <Link to="/auth" className={styles.link} onClick={sighOut}>Выйти</Link>
            </header>
            <div className={styles.layout}>
                <NavPanel isActiveNavElem={isActiveNavElem} setActiveNavElem={setActiveNavElem}/>
                <Route exact path = "/workSpace/kanban">
                    <TaskDialog
                        isTaskDialogOpen={isTaskDialogOpen}
                        setTaskDialogOpen={setTaskDialogOpen}
                        priority={priority}
                        statuses={statuses}
                        users={users}
                        setNewTask={setNewTask}
                        isEditInfo={isEditInfo}
                        setEditInfo={setEditInfo}
                        editableTask={editableTask}
                        taskId={taskId}
                        setFetchEdit={setFetchEdit}
                        
                    />
                    {isLoading ?
                        <CircularProgress className={styles.loader}/> 
                        :
                        <KanbanDesk
                            boards={boards}
                            setBoards={setBoards}
                            setTaskDialogOpen={setTaskDialogOpen}
                            setEditInfo={setEditInfo}
                            setEditableTask={setEditableTask}
                            setFetchEdit={setFetchEdit}
                            setFetchDelete={setFetchDelete}
                            setTaskId={setTaskId}
                        />
                    }
                </Route>            
                <Route exact path = "/workSpace/tasks">
                    <Tasks/>
                </Route>
                <Route exact path = "/workSpace/reports">
                    <Reports/>
                </Route>
                <Route exact path = "/workSpace/releases">
                    <Releases/>
                </Route>
            </div>
        </section>
    )

}

export default WorkSpace