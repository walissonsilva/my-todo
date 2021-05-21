import React, { useContext } from 'react';

import { IoTrashOutline } from 'react-icons/io5';
import { TodoListContext } from '../contexts/TodoListContext';

import '../styles/TasksList.css';

const TasksList = () => {
  const {
    listaDeTarefas,
    handleRemoveTask,
    handleChangeTaskStatus,
  } = useContext(TodoListContext);

  return (
    <div className="container">
      <div className="tasks">
        <h2>Minhas Tarefas</h2>

        <ul className="list">
          { listaDeTarefas.map((tarefa, index) => (
            <li key={index}>
              <input
                type="checkbox"
                value={tarefa.isDone}
                onChange={() => handleChangeTaskStatus(index)}
                />

              <input
                type="text"
                className={`${tarefa.isDone ? 'risked' : ''}`}
                value={tarefa.title}
                readOnly={true}
              />

              <button
                onClick={() => handleRemoveTask(index)}
              >
                <IoTrashOutline />
              </button>
            </li>
          )) }
        </ul>
      </div>
    </div>
  )
}

export default TasksList;