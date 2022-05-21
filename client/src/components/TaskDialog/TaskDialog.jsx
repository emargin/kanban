// *** NPM ***
import React, { useState, useEffect } from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    CircularProgress,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'


// *** OTHER ***

import VTaskShema from './schema/VTaskShame'
import instance from '../../instance/instance';


const useStyles = makeStyles({
    
    form:{
        width: '500px',
        height: '100%',
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    btn:{
        backgroundColor: '#EC5990',
        color: '#fff',
        textTransform: 'none',
        '&:hover':{
            backgroundColor: '#bf1650',
        },
        height: '30px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    link:{
        color: '#fff',
        '&:hover':{
            color: '#bf1650',
        },
        margin: 'auto 35px auto auto'
    },
    dialog: {
        color: '#fff',
        backgroundColor: '#0e101c',
    },
    dialogTitle: {
        margin: '0 auto 40px auto',
        fontWeight: 100,
        color: '#fff',
        borderBottom: '1px solid #bf1650'
    },
    formControl: {
        height: '80px',
    },
    label: {
        fontWeight: 700,
        width: '60%',
        color: '#fff',
        margin: '0',
    },
    inputDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        "& .MuiOutlinedInput-input": {
            color: "#fff"
          },
          "& .MuiInputLabel-root": {
            color: "#fff"
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EC5990"
          },
          "&:hover .MuiOutlinedInput-input": {
            color: "#fff"
          },
          "&:hover .MuiInputLabel-root": {
            color: "#fff"
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bf1650"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#fff"
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#fff"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bf1650"
          }
    },
    input: {
        width: '280px',
        height: '50px',
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
        },
        '& input["number"]': {
            '-moz-appearance': 'textfield',
        },

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

})

const TaskDialog = (props) => {
    const {
        isTaskDialogOpen,
        setTaskDialogOpen,
        priority,
        statuses,
        users,
        setNewTask,
        isEditInfo,
        setEditInfo,
        editableTask,
        taskId,
        setFetchEdit
    } = props
    const styles = useStyles();
    const [isLoading, setLoading] = useState(true)

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(VTaskShema),
    })

    const handleClose = () => {
        if(isEditInfo) {
            setEditInfo(false)
        }
        setValue('name', '')
        setError("name",  '');
        setValue('tiketState', '')
        setError("tiketState",  '')
        setValue('implementor', '')
        setError("implementor",  '')
        setValue('description', '')
        setError("description",  '')
        setValue('priority', '')
        setError("priority",  '')
        setValue('deadline', '')
        setError("deadline",  '')
        setTaskDialogOpen(false);
        setLoading(true)
        
    };

    // *** HANDLE FORM ***
    const handlerForForm = async (data) => {
        console.log('[SellContainer]:', data)
        const requestData = {
            name: data.name,
            description: data.description,
            priority: data.priority,
            deadline: data.deadline,
            implementers: [data.implementer],
            status: data.tiketState
        }
        if(isEditInfo){
            fetchEditTask(requestData)
        }else {            
            setNewTask(requestData)
        }
        handleClose()
    }

    const fetchEditTask = async(requestData) => {
        try {
            await instance.patch(`/tasks/${taskId}`, requestData)            
            setFetchEdit(true)
        } catch (error) {
            console.log(error)
            
        }
    
    }

    const setEditableInfo = async() =>{
        setValue('name', editableTask?.name)
        setValue('tiketState', editableTask?.status)
        setValue('implementer', editableTask?.implementers[0]?._id)
        setValue('description', editableTask?.description)
        setValue('priority', editableTask?.priority)
        setValue('deadline', editableTask?.deadline.split('T')[0])
        setLoading(false)
    }

    useEffect(()=>{
        if(isEditInfo){
            setEditableInfo()
        } 
        
    },[editableTask])



    return(
        <Dialog
            open={isTaskDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogContent className = {styles.dialog}>                    
                    {isLoading && isEditInfo ?
                        <CircularProgress/> :
                <form className={styles.form} onSubmit={handleSubmit(handlerForForm)}>                    
                    <h1 id="alert-dialog-title" className ={styles.dialogTitle}>{isEditInfo ? 'Редактировать задачу' : 'Создать задачу'}</h1>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <FormControl className={styles.formControl} error={!!errors.name?.message}>
                                <div className={styles.inputDiv}>
                                    <FormLabel className={styles.label}>Название</FormLabel>
                                    <TextField
                                        {...field}
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
                                        variant="outlined"
                                        type="text"
                                        error={!!errors.name?.message}
                                    />
                                </div>
                                <FormHelperText>{errors.name?.message || ''}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="tiketState"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                className={styles.formControl}
                                error={!!errors.tiketState?.message}
                                variant="outlined"
                              
                            >
                                <div className={styles.inputDiv}>
                                    <FormLabel className={styles.label}>Статус задачи</FormLabel>
                                    <Select {...field} className={styles.input} >
                                        {statuses?.map((item) => {
                                            return (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                                <FormHelperText style={{ margin: '0' }}>
                                    {errors.tiketState?.message || ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="implementer"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                className={styles.formControl}
                                error={!!errors.implementer?.message}
                                variant="outlined"
                            >
                                <div className={styles.inputDiv}>
                                    <FormLabel className={styles.label}>Исполнитель</FormLabel>
                                    <Select {...field} className={styles.input}>
                                        {users?.map((item) => {
                                            return (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.username}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                                <FormHelperText style={{ margin: '0' }}>
                                    {errors.implementer?.message || ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                className={styles.formControl}
                                error={!!errors.description?.message}
                                variant="outlined"
                            >
                                <div className={styles.inputDiv}>
                                    <FormLabel className={styles.label}>Описание</FormLabel>
                                    <TextField
                                        {...field}
                                        className={styles.input}
                                        style={{hight: '200px'}}
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
                                        multiline
                                        maxRows={4}
                                        variant="outlined"
                                        
                                        error={!!errors.description?.message}
                                    />
                                </div>
                                <FormHelperText>{errors.description?.message || ''}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                className={styles.formControl}
                                error={!!errors.priority?.message}
                                variant="outlined"
                            >
                                <div className={styles.inputDiv}>
                                    <FormLabel className={styles.label}>Приоритет задачи</FormLabel>
                                    <Select
                                        {...field}
                                        className={styles.input}
                                        required={false}
                                        error={!!errors.priority?.message}
                                    >
                                        {priority?.map((item) => {
                                            return (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </div>
                                <FormHelperText style={{ margin: '0' }}>
                                    {errors.priority?.message || ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="deadline"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                className={styles.formControl}
                                error={!!errors.description?.message}
                                variant="outlined"
                            >
                                <div className={styles.inputDiv}>
                                    <FormLabel className={styles.label}>Дата завершения</FormLabel>
                                    <TextField
                                        {...field}
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        className={styles.input}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </div>
                            </FormControl>
                        )}
                    />

                    <Button
                        variant="contained"
                        color="primary" 
                        type="submit"
                        className={styles.btn}
                    >
                        {isEditInfo ? 'Редактировать' : 'Создать'}
                    </Button>
                    </form>
                     }
                </DialogContent>
               
                

            </Dialog>
    )

}

export default TaskDialog