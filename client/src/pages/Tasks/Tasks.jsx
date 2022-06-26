import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, TextField } from '@material-ui/core'


import TaskCard from '../../components/TaskCard/TaskCard'
import instance from '../../instance/instance'

import closeIcon from '../../img/close_icon.svg'
import profile from '../../img/other/user.png'
import SendIcon from '@material-ui/icons/Send';
import sendMessage from '../../img/other/send.png'


const useStyles = makeStyles({
    tasks: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',        
    },
    cards: {
        width: '50%', 
        height: '100%',
        margin: 'auto',
        overflow: 'scroll'  
    },
    card: {
        backgroundColor: '#fff',
        minWidth: '310px',
        height: '82px',
        boxShadow: '1px 1px 1px',
        margin: '15px',
        marginRight: '10px',
    },
    line: {
        color: '#bf1650',
        marginLeft: '20px',
        marginRight: '20px'
    },
    taskInfo: {
        margin: 0,
    },
    taskDescribe: {        
        width:'0%',
        height: '100%',
        // minHeight: '725px',
        color: '#fff',        
        overflow: 'hidden',
        transition: 'width 0.6s ease-in-out ', 
    },
    openDescribe: {
        // overflow: 'visible',
        // padding: '0 20px',        
        
        // margin: '0 20px',    
        width: '100%',
    },
    btn: {
        marginLeft: '10px',
    },
    gruopBtn: {
        // position: 'absolute',
        // bottom: '20%',
        marginTop: '25px',
    },
    closeIcon: {
        width: '40px',
        height: '40px',
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            color: '#bf1650'
        }
    },
    change: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #333c51',
        margin: '15px',
        padding: '10px',
    },
    personImg: {
        height:'30px',
        width:'30px',
        marginRight: '15px',
    },
    person: {
        marginRight: '15px',
    },
    messageForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        width: '100%',
        marginTop: '15px',
    },
    cssOutlinedInput:{
        color: '#fff',
    },

    cssFocused: {
        color: '#fff',
        borderColor: '#fff',
        "& notchedOutline": {
            borderColor: "red"
          }
    },
    cssLabel: {
        color: '#fff',
    },
    notchedOutline: {
        borderColor: '#333c51',
        '&&:hover':{
            borderColor:'#FFFFFF'
        }
    },
    sendIcon: {
        height: '20px',
         width: '20px', 
         color: '#fff'
    }
})

const Tasks = () => {
    const styles = useStyles()
    const [isTaskOpen, setTaskOpen] = useState(false)
    const [tasks, setTasks] = useState(null)
    const [activeTask, setActiveTask] = useState(null)

    const handleOpenCardDescribe = (task) => (e) => {
        e.stopPropagation()
        setActiveTask(task)
        setTaskOpen(true)
        
    }

    const handleCloseCardDescribe = () => {
        setTaskOpen(false)
    }

    const handleSubmit = () => {
        console.log('sss')
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
    },[])
    return (
        <section className={styles.tasks}>
            <div className={styles.cards} >
                {tasks && tasks.map((task) => (
                    <TaskCard key={task._id} task={task} onOpen={handleOpenCardDescribe(task)} />)
                )}
            </div>
            <hr className={styles.line}/>
            <div className={`${styles.taskDescribe} ${isTaskOpen && styles.openDescribe}`}>
                
                <img src={closeIcon} alt='close icon' onClick={handleCloseCardDescribe} className={styles.closeIcon} />
                <div className={styles.taskInfo}>
                    <p>Номер задачи: {activeTask?._id}</p>
                    <h2>Наименование задачи: {activeTask?.name}</h2>
                </div>
                <p>{activeTask?.description}</p>

                <article className={styles.changesHistory}>
                    <h2>История изменений:</h2>
                    <p className={styles.change}>
                        <img className={styles.personImg} src={profile} alt='user logo'/>
                        <span className={styles.person}><a href="#">Василярова Дмитрий Петрович</a></span>
                        <span>Дата изменений: 25.05.2022</span>
                    </p>
                    <p className={styles.change}>
                        <img className={styles.personImg} src={profile} alt='user logo'/>
                        <span className={styles.person}><a href="#">Бузмаков Игорь Иванович</a></span>
                        <span>Дата изменений: 23.05.2022</span>
                    </p>
                    <p className={styles.change}>
                        <img className={styles.personImg} src={profile} alt='user logo'/>
                        <span className={styles.person}><a href="#">Лопатина Светлана Сергеевна</a></span>
                        <span>Дата изменений: 21.05.2022</span>
                    </p>
                </article>

                <article>
                    <h2>Комментарии:</h2>
                    <form onSubmit={handleSubmit} className={styles.messageForm}>
                        <TextField
                            className={styles.input} 
                            id="outlined-basic"
                            label="Оставить комментарий"
                            variant="outlined"
                            InputLabelProps={{
                                classes: {
                                  root: styles.cssLabel,
                                  focused: styles.cssFocused,
                                },
                                className: styles.resize
                            }}
                            InputProps={{
                                classes: {
                                  root: styles.cssOutlinedInput,
                                  focused: styles.cssFocused,
                                  notchedOutline: styles.notchedOutline,
                                },
                                inputMode: "numeric"
                              }}
                        />
                        <IconButton>
                            <SendIcon className={styles.sendIcon}/>
                            {/* <img style={{height: '30px', width: '30px', background: '#fff'}} src={sendMessage} alt='send message icon'/> */}
                        </IconButton>
                    </form>
                    
                    {/* {comments.map((comment)=>(
                        <Comment/>
                    ))} */}

                </article>
                

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