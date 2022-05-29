import React from 'react'
import styles from './Releases.module.css'

const Releases = () => {
    return (
        <section className={styles.releases}>
            <h1>Релизы</h1>
            <div className={styles.cards}>
                <artical className={styles.card}>
                    <p>№1</p>
                    <p className={styles.cardTitle}>Клиент 1.0</p>
                    <p className={styles.date}>12.08.2021</p>
                </artical>
                <artical className={styles.card}>
                    <p>№2</p>
                    <p className={styles.cardTitle}>Сервер 2.0</p>
                    <p className={styles.date}>03.09.2021</p>
                </artical>
                <artical className={styles.card}>
                    <p>№3</p> 
                    <p className={styles.cardTitle}>Редизайн клиента</p>
                    <p className={styles.date}>29.03.2022</p>
                </artical>
                <artical className={styles.card}>
                    <p>№4</p>
                    <p className={styles.cardTitle}>Расширение базы данных</p>
                    <p className={styles.date}>25.04.2022</p>
                </artical>
                <artical className={styles.card}>
                    <p>№5</p>
                    <p className={styles.cardTitle}>Расширение функционала сервера</p>
                    <p className={styles.date}>11.05.2022</p>
                </artical>
                <artical className={styles.card}>
                    <p>№6</p>
                    <p className={styles.cardTitle}>Кодревью и тестирование</p>
                    <p className={styles.date}>29.05.2022</p>
                </artical>
            </div>
        </section>
    )
}


export default Releases