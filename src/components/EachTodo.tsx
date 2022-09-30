import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { PencilSquare, XSquare, CheckSquare } from "react-bootstrap-icons";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const EachTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todo-each" onSubmit={e => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          className="todo-edit"
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todo-each-title">{todo.todo}</s>
      ) : (
        <span className="todo-each-title">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <PencilSquare />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <XSquare />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <CheckSquare />
        </span>
      </div>
    </form>
  );
};

export default EachTodo;
