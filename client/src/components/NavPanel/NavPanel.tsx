import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import StorageIcon from '@material-ui/icons/Storage'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import styles from './NavPanel.module.scss'

function NavPanel(props: any) {
    const { isActiveNavElem, setActiveNavElem } = props
    const navigate = useNavigate()
    const [isOpen, changeNav] = useState(false)

    const handleClick = (e: any) => {
        navigate(`/workSpace/${e.currentTarget.id}`)
        setActiveNavElem(`${e.currentTarget.id}`)
    }

    return (
        <nav className={`${styles.navPanel}  ${isOpen && styles.openNav}`}>
            <div className={styles.openNavGroup}>
                <Button className={styles.openNavBtn} onClick={() => changeNav(!isOpen)}>
                    <ArrowForwardIosIcon className={`${styles.arrowIcon} ${isOpen ? styles.rotateArrow : ''}`} />
                </Button>
            </div>
            <hr className={styles.line} />
            <Button
                id="kanban"
                className={`${styles.navBtn} ${isActiveNavElem === 'canban' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <DesktopWindowsIcon className={styles.navImg} />
                <p className={styles.btnText}>Доска задач</p>
            </Button>
            <Button
                id="tasks"
                className={`${styles.navBtn} ${isActiveNavElem === 'tasks' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <StorageIcon className={styles.navImg} />
                <p className={styles.btnText}>Задачи</p>
            </Button>
            <Button
                id="reports"
                className={`${styles.navBtn} ${isActiveNavElem === 'reports' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <FindInPageIcon className={styles.navImg} />
                <p className={styles.btnText}>Отчеты</p>
            </Button>
            <Button
                id="releases"
                className={`${styles.navBtn} ${isActiveNavElem === 'releases' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <DoneAllIcon className={styles.navImg} />
                <p className={styles.btnText}>Релизы</p>
            </Button>
        </nav>
    )
}

export default NavPanel
