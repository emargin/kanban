import { Button, TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Registration.module.scss'

const Registration = (): JSX.Element => {
    return (
        <div className={styles.root}>
            <div className={styles.regWindow}>
                <form
                    className={styles.form}
                // onSubmit={handleSubmit(handlerForm)}
                >
                    <h2 className={styles.loginTitle}>Регистрация</h2>

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        InputLabelProps={{
                            classes: {
                                root: styles.cssLabel,
                                focused: styles.cssFocused,
                            },
                            className: styles.resize
                        }}
                        InputProps={{
                            classes: {
                                root: styles.cssOutlinedInput,
                                focused: styles.cssFocused,
                                notchedOutline: styles.notchedOutline,
                            }
                        }}

                        // helperText={(errors.name?.message) || ''}
                        // error={!!errors.name?.message}
                        autoComplete="off"
                        label="Имя пользователя"
                        type="text"
                    />


                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}
                        InputLabelProps={{
                            classes: {
                                root: styles.cssLabel,
                                focused: styles.cssFocused,
                            },
                            className: styles.resize
                        }}
                        InputProps={{
                            classes: {
                                root: styles.cssOutlinedInput,
                                focused: styles.cssFocused,
                                notchedOutline: styles.notchedOutline,
                            }
                        }}

                        // helperText={(errors.email?.message) || ''}
                        // error={!!errors.email?.message}
                        autoComplete="off"
                        label="E-mail"
                        type="text"
                    />



                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}

                        InputLabelProps={{
                            classes: {
                                root: styles.cssLabel,
                                focused: styles.cssFocused,
                            },
                            className: styles.resize
                        }}
                        InputProps={{
                            classes: {
                                root: styles.cssOutlinedInput,
                                focused: styles.cssFocused,
                                notchedOutline: styles.notchedOutline,
                            },
                            inputMode: "numeric"
                        }}

                        // helperText={(errors.password?.message) || ''}
                        // error={!!errors.password?.message}
                        autoComplete="off"
                        label="Пароль"
                        type="password"
                    />

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={styles.input}

                        InputLabelProps={{
                            classes: {
                                root: styles.cssLabel,
                                focused: styles.cssFocused,
                            },
                            className: styles.resize
                        }}
                        InputProps={{
                            classes: {
                                root: styles.cssOutlinedInput,
                                focused: styles.cssFocused,
                                notchedOutline: styles.notchedOutline,
                            },
                            inputMode: "numeric"
                        }}

                        // helperText={(errors.password?.message) || ''}
                        // error={!!errors.password?.message}
                        autoComplete="off"
                        label="Подтверждение пароля"
                        type="password"
                    />


                    <Button className={styles.regButton} variant="contained" type="submit" >
                        Регистрация
                    </Button>
                    <Link to='/auth' className={styles.helperLink}>Вход</Link>
                </form>
            </div>
        </div>
    )
}

export default Registration
