import { Button, TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styles from './Registration.module.scss'

interface Inputs {
    name: string
    email: string
    password: string
    passwordConfirm: string
}

function Registration(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<Inputs>()

    const handlerForm = (data: Inputs) => {
        console.log(data)
    }
    return (
        <div className={styles.root}>
            <div className={styles.regWindow}>
                <form className={styles.form} onSubmit={handleSubmit(handlerForm)}>
                    <h2 className={styles.title}>Регистрация</h2>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        helperText={errors.name?.message || ''}
                        error={!!errors.name?.message}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        {...register('name', { required: { value: true, message: 'Это поле обязательно' } })}
                        label="Имя пользователя"
                        type="text"
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        helperText={errors.email?.message || ''}
                        error={!!errors.email?.message}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        label="E-mail"
                        type="text"
                        {...register('email', { required: { value: true, message: 'Это поле обязательно' } })}
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        autoComplete="off"
                        label="Пароль"
                        type="password"
                        helperText={errors.password?.message || ''}
                        error={!!errors.password?.message}
                        {...register('password', {
                            required: { value: true, message: 'Это поле обязательно' },
                            validate: {
                                equal: (v) => v === getValues('passwordConfirm') || 'Пароли должны совпадать',
                            },
                        })}
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        autoComplete="off"
                        label="Подтверждение пароля"
                        type="password"
                        helperText={errors.password?.message || ''}
                        error={!!errors.password?.message}
                        {...register('passwordConfirm', {
                            required: { value: true, message: 'Это поле обязательно' },
                            validate: {
                                equal: (v) => v === getValues('password') || 'Пароли должны совпадать',
                            },
                        })}
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
