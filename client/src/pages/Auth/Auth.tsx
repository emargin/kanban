import { Button, TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useActions from '../../hooks/useActions'
import { RootState } from '../../redux/store'
import styles from './Auth.module.scss'

interface Inputs {
    email: string
    password: string
}

function Auth(): JSX.Element {
    const { login } = useActions()
    const { error } = useSelector((state: RootState) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const handlerForm = (data: Inputs) => {
        login(data)
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
                        {...register('email', { required: { value: true, message: 'Это поле обязательно' } })}
                        helperText={errors.email?.message || ''}
                        error={!!errors.email?.message}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        autoComplete="off"
                        label="Пароль"
                        type="password"
                        {...register('password', { required: { value: true, message: 'Это поле обязательно' } })}
                        helperText={errors.password?.message || ''}
                        error={!!errors.password?.message}
                    />
                    {error && <span className={styles.errorMsg}> {error} </span>}

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
