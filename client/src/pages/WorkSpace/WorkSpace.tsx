import React from 'react'
import { Button } from '@material-ui/core'
import { Link, Route } from 'react-router-dom'
import styles from './WorkSpace.module.scss'
import NavPanel from '../../components/NavPanel/NavPanel'
import Tasks from '../Tasks/Tasks'
import Releases from '../Releases/Releases'
import Reports from '../Reports/Reports'

function WorkSpace(): JSX.Element {
    return (
        <section className={styles.workSpace}>
            <header className={styles.header}>
                <h2 className={styles.title}>Works Space</h2>
                <Button
                    className={styles.btn}
                    variant="contained"
                    color="primary"
                    // onClick={handleClickOpen}
                >
                    Создать задачу
                </Button>
                {/* <p className={styles.userInfo}>{user?.username}</p> */}
                <Link to="/auth" className={styles.link}>
                    Выйти
                </Link>
            </header>
            <div className={styles.layout}>
                <NavPanel />
                {/* <Route path="/workSpace/canban">
                </Route> */}
                {/* <Route path="/workSpace/tasks" element={<Tasks />} />
                <Route path="/workSpace/reports" element={<Reports />} />
                <Route path="/workSpace/releases" element={<Releases />} /> */}
            </div>
        </section>
    )
}
export default WorkSpace
