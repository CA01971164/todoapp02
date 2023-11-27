import { Todo } from "./App";
import React from "react";

type TodoListProps = {
  Head: string;
  items: Todo[];
  Onreverse: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  Head,
  items,
  Onreverse,
  onDelete,
}) => {
  return (
    <div>
      <h2>{Head}</h2>
      <ul>
        {items.map((Todo) => {
          if (Head === "未完了リスト") {
            return (
              <>
                {Todo.done === false && (
                  <>
                    <li key={Todo.id}>{Todo.content}</li>
                    <button onClick={() => Onreverse(Todo.id)}>
                      完了リストへ
                    </button>
                    <button onClick={() => onDelete(Todo.id)}>削除</button>
                  </>
                )}
              </>
            );
          } else if (Head === "完了リスト") {
            return (
              <>
                {Todo.done === true && (
                  <>
                    <li key={Todo.id}>{Todo.content}</li>
                    <button onClick={() => Onreverse(Todo.id)}>
                      未完了リストへ
                    </button>
                    <button onClick={() => onDelete(Todo.id)}>削除</button>
                  </>
                )}
              </>
            );
          } else {
            console.log("エラーが出てる");
            return null;
          }
        })}
      </ul>
    </div>
  );
};

export default TodoList;
