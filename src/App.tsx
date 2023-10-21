import React, { useRef, useState, useEffect } from 'react'
import './App.css';

import plus from './images/plus.svg'
import filePlus from './images/file-plus.svg'
import plusSquare from './images/plus-square.svg'
import plusCircle from './images/plus-circle.svg'
import check from './images/check.svg'
import checkcircle from './images/check-circle.svg'
import checkSquare from './images/check-square.svg'
import rewriteSquare from './images/edit-square.svg'
import rewrite from './images/edit.svg'
import trash from './images/trash.svg'
import undo from './images/rotate-ccw.svg'

const App: React.FC = () => {

  const textBoxRef = useRef<HTMLInputElement>(null);
  const listEachRef = useRef<HTMLInputElement>(null);
  const doneEachRef = useRef<HTMLInputElement>(null);

  const [ newTask, setNewTask ] = useState<string>("");

  const [ textBoxRefHeight, setTextBoxRefRefHeight ] = useState<string>()
  const [ listEachRefHeight, setListEachRefHeight ] = useState<string>()
  const [ doneEachRefHeight, setdoneEachRefHeight ] = useState<string>()

  useEffect(
    () => {
      setTextBoxRefRefHeight(textBoxRef.current?.getBoundingClientRect().height.toString())
      setListEachRefHeight(listEachRef.current?.getBoundingClientRect().height.toString())
      setdoneEachRefHeight(doneEachRef.current?.getBoundingClientRect().height.toString())
    }, []
  )

  interface toDo {
    id: number,
    task: string,
    isDone: boolean,
    children?: React.ReactNode
  }

  const [ toDoList, setToDoList ] = useState<toDo[]>(
    [
      {
        id: 1,
        task: 'Drink Water',
        isDone: false
      }
    ]
  );

  const [ completedList, setCompletedList ] = useState<toDo[]>(
    [
      {
        id: 2,
        task: 'Take Pills',
        isDone: true
      }
    ]
  );

  const handleTaskAddition = (event: React.FormEvent):void => {
    event.preventDefault();
    if ( newTask ) {
      setToDoList(
        [
          {
            id: toDoList.length + completedList.length + 1,
            task: newTask,
            isDone: false
          },
          ...toDoList
        ]
      )
      setNewTask("")
    }
    else {
      alert('Please add a task')
    }
  }

  const handleToBeTaskDeletion = (id: Number):void => {
    setToDoList(
      toDoList.filter((toDo) => toDo.id !== id)
    )
  }

  const handleTaskCompletion = (id: Number):void => {
    setCompletedList(
      [
        ...toDoList.filter((item) => item.id === id),
        ...completedList
      ]
    )
    setToDoList(
      toDoList.filter((toDo) => toDo.id !== id)
    )
  }

  const handleDoneTaskDeletion = (id: Number):void => {
    setCompletedList(
      completedList.filter((toDo) => toDo.id !== id)
    )
  }

  const handleDoneTaskRevert = (id: Number):void => {
    setToDoList(
      [
        ...completedList.filter((item) => item.id === id),
        ...toDoList
      ]
    )
    setCompletedList(
      completedList.filter((toDo) => toDo.id !== id)
    )
  }

  return (
    <div
    className ='app-box font-Lato'
    >
      <div
      className ='app-header to-center'
      >
        do - me - now . com
      </div>
      <div
      className ='app-to-be-done'
      >
        <div
        className ='app-to-be-done-addText to-center'
        ref = {textBoxRef}
        >
          <div
          className ='app-to-be-done-textbox to-center'
          >
            <input
            type = 'input'
            placeholder = 'please add a task'
            value = {newTask}
            onChange = {
              (event) => setNewTask(event.target.value)
            }
            >
            
            </input>
          </div>
          <div
          className ='app-to-be-done-add-btn to-center'
          style={{
            minWidth: textBoxRef.current?.getBoundingClientRect().height ? textBoxRef.current?.getBoundingClientRect().height : textBoxRefHeight,
          }}
          >
            <img
            onClick = {handleTaskAddition}
            src = {filePlus}
            />
          </div>
        </div>
        <div
        className ='app-to-be-done-list'
        >
          {
            toDoList.map(
              (item: toDo, index) => {
                return(
                  <div
                  className ='app-to-be-done-list-each'
                  ref = {listEachRef}
                  >
                    <div
                    className ='app-to-be-done-list-each-task'
                    >
                      <div
                      className ='app-to-be-done-list-each-task-id to-center'
                      style={{
                        minWidth: listEachRef.current?.getBoundingClientRect().height ? listEachRef.current?.getBoundingClientRect().height : listEachRefHeight,
                      }}
                      >
                        <>{item.id}.</>
                      </div>
                      <div
                      className ='app-to-be-done-list-each-task-name'
                      >
                        <>{item.task}.</>
                      </div>
                    </div>
                    <div
                    className = 'app-to-be-done-list-each-buttons'
                    >
                      <div
                      className ='app-to-be-done-list-each-btn-delete to-center'
                      >
                        <img
                        onClick = {() => handleToBeTaskDeletion(item.id)}
                        src = {trash}
                        />
                      </div>
                      <div
                      className ='app-to-be-done-list-each-btn-complete to-center'
                      >
                        <img
                        onClick = {() => handleTaskCompletion(item.id)}
                        src = {checkSquare}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
      </div>
      <div
      className ='app-done'
      >
        <div
        className ='app-done-list'
        >
          {
            completedList.map(
              (item, index) => {
                return(
                  <div
                  className ='app-done-list-each'
                  ref = {doneEachRef}
                  >
                    <div
                    className ='app-done-list-each-task'
                    >
                      <div
                      className ='app-done-list-each-task-id to-center'
                      style={{
                        minWidth: doneEachRef.current?.getBoundingClientRect().height ? doneEachRef.current?.getBoundingClientRect().height : doneEachRefHeight,
                        // minWidth: doneEachRef.current?.clientHeight,
                        // minWidth : doneEachRefHeight+'!important' ? doneEachRefHeight : doneEachRef.current?.clientHeight+'!important',
                      }}
                      >
                        <>{item.id}.</>
                      </div>
                      <div
                      className ='app-done-list-each-task-name'
                      >
                        <>{item.task}.</>
                      </div>
                    </div>
                    <div
                    className = 'app-done-list-each-buttons'
                    >
                       <div
                        className ='app-done-list-each-btn-delete to-center'
                        >
                          <img
                          onClick = {() => handleDoneTaskDeletion(item.id)}
                          src = {trash}
                          />
                        </div>
                        <div
                        className ='app-done-list-each-btn-undo to-center'
                        >
                          <img
                          onClick = {() => handleDoneTaskRevert(item.id)}
                          src = {undo}
                          />
                        </div>
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App;
