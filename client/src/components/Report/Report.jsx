import React from 'react'
import styles from './Report.module.css'

const Report = (props) => {
    const {title, description, img, alt} = props
    return(
        <article className={styles.report}>
            <h2 className={styles.title}>{`${title}`}</h2>
            <p>{`${description}`}</p> 
            <img className={styles.img} src={img} alt={alt}/>
        </article>
    )
}
export default Report
