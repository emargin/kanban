import React from 'react'
import styles from './TaskCard.module.css'
import prirityImg from '../../components/KanbanDesk/KanbanDesk'
import icon from '../../img/priorities/high.svg'



const TaskCard = (props) => {
    const { onOpen } = props
    const { _id, name, description, priority } = props.task
    // console.log(prirityImg[priority])
    return (
        <article id={_id} className={styles.card} onClick={onOpen}>
            <h2>{name}</h2>
            <div className={styles.info}>
                <img className={styles.icon} src={icon} alt='icon'/>
                <p>{description}</p>
            </div>
        </article>
    )
}

export default TaskCard