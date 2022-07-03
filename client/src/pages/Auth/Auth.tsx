import { Button, TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styles from './Auth.module.scss'

interface Inputs {
    login: string
    password: string
}

function Auth(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const handlerForm = (data: Inputs) => {
        console.log('data', data)
    }
    return (
        <section className={styles.loginPage}>
            <div className={styles.loginWindow}>
                <form className={styles.form} onSubmit={handleSubmit(handlerForm)}>
                    <h2 className={styles.title}>Авторизация</h2>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        autoComplete="off"
                        label="E-mail"
                        type="text"
                        {...register('login', { required: true })}
                        helperText={errors.login?.message || ''}
                        error={!!errors.login?.message}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        autoComplete="off"
                        label="Пароль"
                        type="password"
                        {...register('password', { required: true })}
                        helperText={errors.password?.message || ''}
                        error={!!errors.password?.message}
                    />

                    <Button className={styles.authButton} variant="contained" type="submit">
                        Войти
                    </Button>
                    <Link to="/registration" className={styles.loginHelperLinks}>
                        Зарегистрироваться
                    </Link>
                </form>
            </div>
        </section>
    )
}

export default Auth
