import { Button, TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.scss'

const Auth = ():JSX.Element => {
    return (
        <section className={styles.loginPage}>
            <div className={styles.loginWindow}>
                <form className={styles.form}>
                    <h2 className={styles.loginTitle}>Авторизация</h2>
                    {/* <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                variant="outlined"
                                className={styles.input}
                                InputLabelProps={{
                                    classes: {
                                        root: styles.cssLabel,
                                        focused: styles.cssFocused
                                    },
                                    className: styles.resize
                                }}
                                InputProps={{
                                    classes: {
                                        root: styles.cssOutlinedInput,
                                        focused: styles.cssFocused,
                                        notchedOutline: styles.notchedOutline
                                    }
                                }}
                                helperText={errors.email?.message || ''}
                                error={!!errors.email?.message}
                                autoComplete="off"
                                label="E-mail"
                                type="text"
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="outlined-basic"
                                variant="outlined"
                                className={styles.input}
                                InputLabelProps={{
                                    classes: {
                                        root: styles.cssLabel,
                                        focused: styles.cssFocused
                                    },
                                    className: styles.resize
                                }}
                                InputProps={{
                                    classes: {
                                        root: styles.cssOutlinedInput,
                                        focused: styles.cssFocused,
                                        notchedOutline: styles.notchedOutline
                                    },
                                    inputMode: 'numeric'
                                }}
                                helperText={errors.password?.message || ''}
                                error={!!errors.password?.message}
                                autoComplete="off"
                                label="Пароль"
                                type="password"
                            />
                        )}
                    /> */}
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
