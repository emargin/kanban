import React from 'react'
import styles from './TaskCard.module.css'
import icon from '../../img/priorities/high.svg'



const TaskCard = (props) => {
    const { onOpen } = props
    const { _id, name, description } = props.task
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