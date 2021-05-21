import React, { createContext, useEffect, useState } from 'react';

export const TodoListContext = createContext({});

const TodoListProvider = (props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [listaDeTarefas, setListaDeTarefas] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('lista-de-tarefas');

    if (minhaLista) {
      setListaDeTarefas(JSON.parse(minhaLista));
    }

  }, []);

  // Essa função vai ser chamada, quando o usuário clicar no botão de adicionar a tarefa
  const handleCreateNewTask = (event) => {
    event.preventDefault();
    setListaDeTarefas([...listaDeTarefas, {
      title: taskTitle, isDone: false,
    }]);

    localStorage.setItem(
      'lista-de-tarefas',
      JSON.stringify([...listaDeTarefas, {
        title: taskTitle, isDone: false,
      }])
    );

    setTaskTitle("");
  }

  const handleRemoveTask = (indiceTarefa) => {
    const novaListaDeTarefas = listaDeTarefas.filter((tarefa, index) => {
      return index !== indiceTarefa;
    });

    setListaDeTarefas(novaListaDeTarefas);
    localStorage.setItem('lista-de-tarefas', JSON.stringify(novaListaDeTarefas) );
  }

  const handleChangeTaskStatus = (indiceTarefa) => {
    const newTarefas = listaDeTarefas.map((tarefa, index) => {
      return index === indiceTarefa
        ? { ...tarefa, isDone: !tarefa.isDone }
        : tarefa;
    })

    setListaDeTarefas(newTarefas)
  }

  return (
    <TodoListContext.Provider value={ {
      taskTitle,
      setTaskTitle,
      handleCreateNewTask,
      listaDeTarefas,
      handleRemoveTask,
      handleChangeTaskStatus,
    } }>
      { props.children }
    </TodoListContext.Provider>
  )
}

export default TodoListProvider;