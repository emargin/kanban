// *** NPM ***
import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';

// *** OTHER ***
import './KanbanDesk.css'
import instance from '../../instance/instance'
import critical from '../../img/priorities/critical.svg'
import highest from '../../img/priorities/highest.svg'
import high from '../../img/priorities/high.svg'
import medium from '../../img/priorities/medium.svg'
import low from '../../img/priorities/low.svg'
import lowest from '../../img/priorities/lowest.svg'


export const prirityImg  = {
    '61bd94e0ceae6eaeb1f8df3c': critical,
    '61bd9502ceae6eaeb1f8df3d':highest,
    '61bd9515ceae6eaeb1f8df3e': high,
    '61bd9522ceae6eaeb1f8df3f': medium,
    '61bd9530ceae6eaeb1f8df40': low,
    '61bd9540ceae6eaeb1f8df41': lowest,
}




// DRAG AND DROP HERE 
const KanbanDesk = (props) => {
    const {
        boards,
        setBoards,
        setTaskDialogOpen,
        setEditInfo,
        setEditableTask,
        setFetchDelete,
        setFetchEdit,
        setTaskId
    } = props

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
      
    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === 'item')
        {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }
    
    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
        
    }

    function dropHandler(e, board, item, id) {
        e.preventDefault()
        let len = e.target?.nextElementSibling?.id.lenght
        console.log('ID', e.target?.nextElementSibling?.id[len])
        

        const currentIndex = currentBoard.tasks.indexOf(currentItem)
        currentBoard.tasks.splice(currentIndex, 1)
        const dropIndex = board.tasks.indexOf(item)
        board.tasks.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id){
                fetchPatchTask(currentItem._id, { status: b.id })
                console.log('board',b.id)   
                return board
            }
            if (b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
    }

    function dropCardHandler(e, board){
        let len = e.currentTarget?.children?.length
        
        const currentId = board.tasks.map(item => item.id)
        if (!currentId.includes(currentItem.id)) {
            board.tasks.push(currentItem)
            const currentIndex = currentBoard.tasks.indexOf(currentItem)
            currentBoard.tasks.splice(currentIndex, 1)
            setBoards(boards.map(b => {
                if (b.id === board.id){
                    fetchPatchTask(currentItem._id, { status: b.id })
                    console.log('board',b.id, 'task', currentItem._id)             
                    return board
                }
                if (b.id === currentBoard.id){
                    return currentBoard
                }
                return b
            }))
        }    
    }

    const fetchEditableTask = async(taskId) => {
        try {
            const response = await instance.get(`/tasks/${taskId}`)
            setEditableTask(response.data)
            console.log('response.data', response.data)
            setTaskId(taskId)
        } catch (error) {
            console.log(error)
            
        }
    }

    const fetchDeleteTask = async(taskId) => {
        try {
            const response = await instance.delete(`/tasks/${taskId}`)
            setFetchDelete(true)
        } catch (error) {
            console.log(error)
            
        }
    }

    const editTask = (event, taskId) => {
        event.preventDefault();
        fetchEditableTask(taskId)
        setTaskDialogOpen(true)
        setEditInfo(true)
    }

    const deleteTask = (event, taskId) => {
        event.preventDefault();
        fetchDeleteTask(taskId)
    }
    const fetchPatchTask = async(taskId, data) => {
        try {
            await instance.patch(`/tasks/${taskId}`, data)
        } catch (error) {
            console.log(error)
            
        }
    }

    return(
            <section className = 'kanban__desk'>
            {boards && boards.map(board =>
                <div className = 'board'
                    id={board._id}
                    onDragOver = {(e) => dragOverHandler(e)}
                    onDrop = {(e) => dropCardHandler(e, board)}

                >
                    <div className = "board__title">
                        {board.name}
                    </div>
                    {board?.tasks.map(item =>
                        <div
                            id={item._id}
                            onDragOver = {(e) => dragOverHandler(e)}
                            onDragLeave = {(e) => dragLeaveHandler(e)}
                            onDragStart = {(e) => dragStartHandler(e, board, item)}
                            onDragEnd = {(e) => dragEndHandler(e)}
                            onDrop = {(e) => dropHandler(e, board, item, item._id)}
                            draggable = {true}
                            className = "item"
                            title={item.id}
                        >
                            <div id={item._id}  style={{display:'flex', flexDirection: 'row'}}>
                                <h1>{item.name}</h1>
                                <div className = "action_icons">
                                    <EditIcon className='action_icon' onClick={event => editTask(event, item._id)}/>
                                    <DeleteIcon className='action_icon' onClick={event => deleteTask(event, item._id)}/>
                                </div>
                            </div>
                            <span>{item.description}</span>

                            <div className='info'>
                                <span className='priority'>
                                    <b>Приоретет: </b> {item?.priority?.name}                                    
                                    <img className='icon' src={prirityImg[item?.priority._id]} alt='icon'/>
                                </span>    
                            </div>
                            
                            
                            
                            <span className='author'><b>Автор: </b>{item?.author?.username}</span>                            
                            <span className='implementers'><b>Исполнитель: </b>{item?.implementers[0]?.username}</span>
                            
                        </div>
                        )}
                </div>)}
        </section>

    )

}

export default KanbanDesk