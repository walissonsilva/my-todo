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
  const handleCreateNewTask = () => {
    setListaDeTarefas([...listaDeTarefas, taskTitle]);

    localStorage.setItem('lista-de-tarefas', JSON.stringify([...listaDeTarefas, taskTitle]) );

    setTaskTitle("");
  }

  const handleRemoveTask = (indiceTarefa) => {
    const novaListaDeTarefas = listaDeTarefas.filter((tarefa, index) => {
      return index !== indiceTarefa;
    });

    setListaDeTarefas(novaListaDeTarefas);
    localStorage.setItem('lista-de-tarefas', JSON.stringify(novaListaDeTarefas) );
  }

  return (
    <TodoListContext.Provider value={ {
      taskTitle,
      setTaskTitle,
      handleCreateNewTask,
      listaDeTarefas,
      handleRemoveTask,
    } }>
      { props.children }
    </TodoListContext.Provider>
  )
}

export default TodoListProvider;