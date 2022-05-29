import React from 'react'
import { Button } from '@material-ui/core'
import styles from './WorkSpace.module.scss'
import { Link } from 'react-router-dom'

const WorkSpace = (): JSX.Element => {
    return (
        <section className={styles.workSpace}>
            <header className={styles.header}>
                <h2 className={styles.title}>Works Space</h2>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.btn}
                    // onClick={handleClickOpen}
                >
                    Создать задачу
                </Button>
                {/* <p className={styles.userInfo}>{user?.username}</p> */}
                <Link to="/auth" className={styles.link}>
                    Выйти
                </Link>
            </header>
        </section>
    )
}
export default WorkSpace
