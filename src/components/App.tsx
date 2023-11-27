import React, { useEffect } from "react";
import useTodo from "../hooks/useTodo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

// アプリケーションのメインコンポーネント

function App() {
  // useTodカスタムフックの利用
  const { text, setText, items, onAdd, Onreverse, onDelete, fetchData } =
    useTodo();

  // useEffectを使ってデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  //JSXでコンポーネントの描画
  return (
    <div>
      <h1>進捗管理</h1>
      <TodoForm text={text} setText={setText} onAdd={onAdd} />

      <TodoList
        Head="未完了リスト"
        items={items}
        Onreverse={Onreverse}
        onDelete={onDelete}
      />

      <TodoList
        Head="完了リスト"
        items={items}
        Onreverse={Onreverse}
        onDelete={onDelete}
      />
    </div>
  );
}

//Appコンポーネントをエクスポート
export default App;
