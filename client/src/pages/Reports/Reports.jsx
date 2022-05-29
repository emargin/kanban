import React from 'react'
import Report from '../../components/Report/Report'
import styles from './Reports.module.css'
import cyrcle from '../../img/cyrcle-diagram.png'
import gist from '../../img/gist.png'
import gist1 from '../../img/gist(1).png'
import lineGraph from '../../img/line-graph.jpg'
import lineGraph1 from '../../img/graph.png'
import diagrama from '../../img/diagrama.png'


const reports = [
    {
        title: 'Круговая диаграмма',
        description: '',
        img: cyrcle,
        alt: '',
    },
    {
        title: 'Диаграмма сгорания',
        description: '',
        img: diagrama,
        alt: '',
    },
    {
        title: 'Отчет по спринтам',
        description: '',
        img: lineGraph,
        alt: '',
    },
    {
        title: 'Диаграмма среднего периода',
        description: '',
        img: gist1,
        alt: '',
    },
    {
        title: 'Диаграмма скорости команды',
        description: '',
        img: gist,
        alt: '',
    },
    {
        title: 'Диаграмма трудозатрат',
        description: '',
        img: lineGraph1,
        alt: '',
    },
]


const Reports = () => {
    return (
        <section className={styles.reports}>
            <h1>Отчеты</h1>
            <div className={styles.cards}>
                {reports.map(report=>(
                    <Report                        
                        title={report.title}
                        description={report.description}
                        img={report.img}
                        alt={report.alt}
                    />
                ))}
            </div>
        </section>
    )
}


export default Reports