// *** NPM ***
import React, { useState} from 'react'
import {TextField, Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// ***OTHER ***
import instance from '../../instance/instance'

const useStyles = makeStyles({
    loginPage: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#081229',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
    },
    loginWindow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '350px',
        height: '520px',
        backgroundColor: '#191d3a',
        borderRadius: '5px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
        margin: '13px 0 30px 0',
        fontSize: '30px',
        color: '#EC5990',
        fontWeight: 100,
    },
    loginPostTitle: {
        fontSize: '14px',
        marginTop: '10px',
    },
 
    input: {
        margin: '0 24px 34px 24px',
        width: '290px',
        height: '50px',
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
        },
        '& input["number"]': {
            '-moz-appearance': 'textfield',
        },
    },
    authButton: {
        width: '270px',
        height: '46px',
        borderRadius: '30px',
        marginBottom: '16px',
        marginTop: '15px',
        color: '#fff',
        backgroundColor: '#EC5990',
        border: '1px solid #EC5990',
        fontSize: '14px',
        textTransform: 'capitalize',
        '&&:hover':{
            backgroundColor: '#bf1650!important',
        }
    },
    loginHelperLinks: {
        fontSize: '14px',
        color: 'rgba(0,0,0,0.38)',
        textDecoration: 'none',
        color: '#fff',
        '&&:hover':{
            color: '#bf1650!important',
        }
    },
    cssOutlinedInput:{
        color: '#fff',
    },

    cssFocused: {
        color: '#fff',
        borderColor: '#fff',
        "& notchedOutline": {
            borderColor: "red"
          }
    },
    cssLabel: {
        color: '#fff',
    },
    notchedOutline: {
        borderColor: '#EC5990',
        '&&:hover':{
            borderColor:'#FFFFFF'
        }
    },
    resize: {
        fontSize: '14px',
    },
})

const schema = yup.object().shape({
    name: yup.string().min(2, 'Поле обязательно для ввода').required('Поле обязательно для ввода'),
    email: yup.string().email('Введеные данные не корректны').required('Поле обязательно для ввода'),
    password: yup.string().min(5, 'Пароль должен быть длинее 5 символов').required('Поле обязательно для ввода'),
    confirmPassword: yup.string().min(5, 'Пароль должен быть длинее 5 символов').required('Поле обязательно для ввода').oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  }).required();


const Registration = () => {
    const styles = useStyles();
    const history = useHistory();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    
    // *** FETCH REG ***
    const fetchReg = async (request) => {
        try {
            const response = await instance.post('/registration', request)
            history.push('/auth')           
        } catch (error) {
            console.log(error)
            
        }
    }

    // *** HANDELR FORM ***
    const handlerForm = (data) => {  
        console.log('[Reg] Submit Form data', data);
        const request = {
            username: data.name,
            email: data.email,
            password: data.password
        }
        fetchReg(request)
    };

    
    return(
        <div className={styles.loginPage}>
             <div className={styles.loginWindow}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(handlerForm)}
                >
                    <h2 className = {styles.loginTitle}>Регистрация</h2>
                    <Controller
                        name="name"
                        control={control}
                        render = {({field})=> 
                            <TextField
                                {...field}
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

                                helperText={(errors.name?.message) || ''}
                                error={!!errors.name?.message}
                                autoComplete="off"
                                label="Имя пользователя"
                                type="text"
                            />
                        }
                    />

                    <Controller
                    name="email"
                    control={control}
                    render = {({field})=> 
                        <TextField
                            {...field}
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

                            helperText={(errors.email?.message) || ''}
                            error={!!errors.email?.message}
                            autoComplete="off"
                            label="E-mail"
                            type="text"
                        />
                    }
                    />

                    <Controller
                        name="password"
                        control={control}
                        render = {({field})=> 
                            <TextField
                            {...field}
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

                            helperText={(errors.password?.message) || ''}
                            error={!!errors.password?.message}
                            autoComplete="off"
                            label="Пароль"
                            type="password"
                        />
                        }
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render = {({field})=> 
                            <TextField
                            {...field}
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

                            helperText={(errors.password?.message) || ''}
                            error={!!errors.password?.message}
                            autoComplete="off"
                            label="Подтверждение пароля"
                            type="password"
                        />
                        }
                    />


                    <Button className={styles.authButton} variant="contained" type="submit" >
                            Регистрация
                    </Button>
                    <Link to = '/auth' className = {styles.loginHelperLinks}>Вход</Link>
                </form>
             </div>
        </div>
    )
}


export default Registration