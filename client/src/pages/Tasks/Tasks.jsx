import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button} from '@material-ui/core'
import TaskCard from '../../components/TaskCard/TaskCard'

const useStyles = makeStyles({
    tasks: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
        
    },
    cards: {
        height: '100%',
        margin: 'auto',
    },
    card: {
        backgroundColor: '#fff',
        width: '310px',
        height: '82px',
        boxShadow: '1px 1px 1px',
        margin: '15px',
    },
    line: {
        color: '#bf1650',
        marginLeft: '20px'
    },
    taskInfo: {
        margin: 0
    },
    taskDescribe: {        
        width:'100%',
        height: '100%',
        color: '#fff',
        padding: '0 20px'
    },
    btn: {
        marginLeft: '10px',
    },
    gruopBtn: {
        position: 'absolute',
        bottom: '10%',
    }
})

const Tasks = () => {
    const styles = useStyles()

    const handleClick = () => {
        console.log('click')
    }
    return (
        <section className={styles.tasks}>
            <div className={styles.cards}>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
            </div>
            <hr className={styles.line}/>
            <div className={styles.taskDescribe}>
                <div className={styles.taskInfo}>
                    <p>Номер задачи</p>
                    <h2>Наименование задачи</h2>
                </div>
                <p> Описание задачи</p>

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