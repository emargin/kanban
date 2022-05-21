import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    cards: {

    }
})



const Report = () => {
    const styles = useStyles()

    useEffect(()=>{
        // getTasks()
    },[])
    return (
        <section>
            <div className={styles.cards}>

            </div>
            <div className={styles.taskDescribe}>

            </div>
        </section>
    )
}


export default Report