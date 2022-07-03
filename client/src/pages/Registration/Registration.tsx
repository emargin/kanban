import { Button, TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Registration.module.scss'

function Registration(): JSX.Element {
    return (
        <div className={styles.root}>
            <div className={styles.regWindow}>
                <form
                    className={styles.form}
                    // onSubmit={handleSubmit(handlerForm)}
                >
                    <h2 className={styles.title}>Регистрация</h2>

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        // helperText={(errors.name?.message) || ''}
                        // error={!!errors.name?.message}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        label="Имя пользователя"
                        type="text"
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        // helperText={(errors.email?.message) || ''}
                        // error={!!errors.email?.message}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        label="E-mail"
                        type="text"
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        autoComplete="off"
                        label="Пароль"
                        type="password"
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        // helperText={(errors.password?.message) || ''}
                        // error={!!errors.password?.message}
                        autoComplete="off"
                        label="Подтверждение пароля"
                        type="password"
                    />

                    <Button className={styles.regButton} variant="contained" type="submit">
                        Регистрация
                    </Button>
                    <Link to="/auth" className={styles.helperLink}>
                        Вход
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Registration
