// *** NPM ***
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link, useHistory} from 'react-router-dom';

import StorageIcon from '@material-ui/icons/Storage';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DoneAllIcon from '@material-ui/icons/DoneAll';
// *** OTHER ***
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const useStyles = makeStyles({
    navPanel: {
        backgroundColor: '#1a202e',
        width: '72px',
        maxHeight: '100vh',
        height: 'calc(100vh - 90px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'width 0.6s ease-in-out',
        overflow: 'hidden',
    },
    logo: {
        width: '50px',
        height: '50px',
        margin: '14px auto auto auto',
    },
    openNavGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
    },
    hideMenuText: {
        fontSize: '14px',
        transition: 'width 0.6s ease-in-out ',
        opacity: 0,
        visibility: 'hidden',
        color: '#fff',
        fontFamily: 'Roboto, sans-serif ',
        width: '110px',
    },
    openNavBtn: {
        height: '50px',
        borderRadius: '50%',
    },
    arrowIcon: {
        color: 'white',
        height: '16px',
    },
    line: {
        width: '95%',
        opacity: '.2',
        marginTop: '20px',
    },
    navBtn: {
        width: '100%',
        height: '76px',
        marginTop: '10px',
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        paddingLeft: '25px',
        backgroundColor: '#1a202e',
        '&:hover': {
            backgroundColor: '#333c51',
        },
    },
    openNav: {
        width: '240px',
    },
    showText: {
        opacity: 1,
        visibility: 'visible',
    },
    rotateArrow: {
        transform: 'rotate(180deg)',
    },
    navImg: {
        margin: '0',
        padding: '0',
        color:"#AAB8D4"
    },
    btnText: {
        color: '#fff',
        textTransform: 'none',
        marginLeft: '30px',
        fontWeight: 'normal',
        width: '100%',
        textAlign: 'left',
        overflow: 'hidden',
        minWidth: '150px',
    },
    active: {
        backgroundColor: '#333c51',
    },
});



const NavPanel = (props) => {
    const {isActiveNavElem, setActiveNavElem} = props;
    const styles = useStyles();
    const history = useHistory();

    const [isOpen, changeNav] = useState(false);

    const handleClick = (e) => {
        history.push(`/workSpace/${e.currentTarget.id}`)
        setActiveNavElem(`${e.currentTarget.id}`);
    };

    return (
        <nav className={`${styles.navPanel} ${isOpen && styles.openNav}`}>
            <div className={styles.openNavGroup}>
                <Button className={styles.openNavBtn} onClick={() => changeNav(!isOpen)}>
                    <ArrowForwardIosIcon className={`${styles.arrowIcon} ${isOpen ? styles.rotateArrow : ''}`}></ArrowForwardIosIcon>
                </Button>
            </div>
            <hr className={styles.line}></hr>
            <Button
                id="kanban"
                className={`${styles.navBtn} ${isActiveNavElem === 'kanban' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <DesktopWindowsIcon className={styles.navImg}/>
                <p className={styles.btnText}>Доска задач</p>
            </Button>
            <Button
                id="tasks"
                className={`${styles.navBtn} ${isActiveNavElem === 'tasks' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <StorageIcon className={styles.navImg}/>
                <p className={styles.btnText}>Задачи</p>
            </Button>
            <Button
                id="reports"
                className={`${styles.navBtn} ${isActiveNavElem === 'reports' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <FindInPageIcon className={styles.navImg}/>
                <p className={styles.btnText}>Отчеты</p>
            </Button>
            <Button
                id="releases"
                className={`${styles.navBtn} ${isActiveNavElem === 'releases' ? styles.active : ''}`}
                onClick={handleClick}
            >
                <DoneAllIcon className={styles.navImg}/>
                <p className={styles.btnText}>Релизы</p>
            </Button>
        </nav>
    );
};

export default NavPanel;