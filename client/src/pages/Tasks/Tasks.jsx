import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import closeIcon from '../../img/close_icon.svg'
import TaskCard from '../../components/TaskCard/TaskCard'
import instance from '../../instance/instance'


const useStyles = makeStyles({
    tasks: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
        
        overflowX: 'hidden',
        
    },
    cards: {
       // width: '100%', // ?
        height: '100%',
        margin: 'auto',
    },
    card: {
        backgroundColor: '#fff',
        minWidth: '310px',
        height: '82px',
        boxShadow: '1px 1px 1px',
        margin: '15px',
    },
    line: {
        color: '#bf1650',
        // color: '#fff',
        marginLeft: '20px',
        marginRight: '20px'
    },
    taskInfo: {
        margin: 0,
    },
    taskDescribe: {        
        width:'0%',
        height: '100%',
        color: '#fff',        
        overflow: 'hidden',
        transition: 'width 0.6s ease-in-out ', 
    },
    openDescribe: {
        overflow: 'visible',
        // padding: '0 20px',        
        
        // margin: '0 20px',    
        width: '100%',
    },
    btn: {
        marginLeft: '10px',
    },
    gruopBtn: {
        // position: 'absolute',
        bottom: '10%',
    },
    closeIcon: {
        width: '40px',
        height: '40px',
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            color: '#bf1650'
        }
    }
})

const Tasks = () => {
    const styles = useStyles()
    const [isTaskOpen, setTaskOpen] = useState(false)
    const [tasks, setTasks] = useState(null)
    const [activeTask, setActiveTask] = useState(null)

    const handleOpenCardDescribe = (task) => (e) => {
        e.stopPropagation()
        // console.log(e.currentTarget.id)
        // console.log('task', task)
        setActiveTask(task)
        setTaskOpen(true)
        
    }

    const handleCloseCardDescribe = () => {
        setTaskOpen(false)
    }

    useEffect(() => {
        const fetchTasks = async() => {
            try {
                const response = await instance.get('/tasks')
                setTasks(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }
        fetchTasks()
    },[tasks])
    return (
        <section className={styles.tasks}>
            <div className={styles.cards} >
                {tasks && tasks.map((task) => {
                    return <TaskCard key={task._id} task={task} onOpen={handleOpenCardDescribe(task)} />
                })}
                {/* <TaskCard onOpen={handleOpenCardDescribe} />
                <TaskCard onOpen={handleOpenCardDescribe} />
                <TaskCard onOpen={handleOpenCardDescribe} /> */}
            </div>
            <hr className={styles.line}/>
            <div className={`${styles.taskDescribe} ${isTaskOpen && styles.openDescribe}`}>
                
                <img src={closeIcon} alt='close icon' onClick={handleCloseCardDescribe} className={styles.closeIcon} />
                <div className={styles.taskInfo}>
                    <p>Номер задачи: {activeTask?._id}</p>
                    <h2>Наименование задачи: {activeTask?.name}</h2>
                </div>
                <p>{activeTask?.description}</p>

                <div className={styles.gruopBtn}>
                    <Button
                        variant="contained"
                        color="primary" 
                        type="submit"
                        className={styles.btn}
                    >
                        Выполнено
                    </Button>
                    <Button
                        variant="contained"
                        color="primary" 
                        type="submit"
                        className={styles.btn}
                    >
                        Редактировать
                    </Button>
                    <Button
                        variant="contained"
                        color="primary" 
                        type="submit"
                        className={styles.btn}
                    >
                        Удалить
                    </Button>
                </div>
            </div>  
        </section>
    )
}


export default Tasks