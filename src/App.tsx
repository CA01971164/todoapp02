import React, { useState, MouseEventHandler, useEffect } from "react";
import axios from "axios";

// Todo型の定義
type Todo = {
  id: number;
  content: string;
  done: boolean;
};

// アプリケーションのメインコンポーネント

function App() {
  // テキスト入力の状態を管理する state
  const [text, setText] = useState<string>("");

  // Todoアイテムの配列を管理する state
  const [items, setItems] = useState<Todo[]>([]);

  // テキスト入力が変更されたときのイベントハンドラ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Todoアイテムを追加するボタンがクリックされたときのイベントハンドラ
  const onAdd: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      // ランダムな数値でIdを生成
      let num: number = Math.round(Math.random() * 100000);

      //サーバーのエンドポイント
      const endpoint = "http://localhost:3100/todo";
      // 新しいTodoアイテムのデータ
      const requestData: Todo = {
        id: num,
        content: text,
        done: false,
      };

      // サーバーにデータを送信
      await axios.post(endpoint, requestData);
      // Todoアイテムを更新
      setItems((prevItems) => [...prevItems, requestData]);
      // テキストエリア入力
      setText("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //サーバーからデータを取得
  const fetchData = async () => {
    try {
      //サーバーのエンドポイント
      const response = await axios.get("http://localhost:3100/todo");
      console.log(response.data);
      // レスポンスからデータを取得
      const newData: Todo[] = response.data;
      //Todoアイテムを更新
      setItems(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // エラーが発生した場合、setItems にデフォルト値を設定する
      setItems([]);
    }
  };

  // コンポーネントがマウントされたときに一度だけ実行されるuseEffect
  useEffect(() => {
    fetchData();
  }, []); //空の依存配列を渡すことで一度だけ実行される

  // todo.doneの値を逆にする
  const Onreverse = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const onDelete = (id: number) => {
    axios
      .delete(`http://localhost:3100/todo/${id}`)
      .then((response) => {
        console.log("データが削除された", response.data);
      })
      .catch((error) => {
        console.error("削除中にエラーが発生しました", error);
      });
    setItems(items.filter((item) => item.id !== id));
  };

  //JSXでコンポーネントの描画
  return (
    <div>
      <h1>進捗管理</h1>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={onAdd}>+Todoを追加</button>
      <h2>未完了リスト</h2>
      <ul>
        {items.map(
          (Todo) =>
            Todo.done === false && (
              <div key={Todo.id}>
                <li>{Todo.content}</li>
                <button onClick={() => Onreverse(Todo.id)}>完了リストへ</button>
                <button onClick={() => onDelete(Todo.id)}>削除</button>
              </div>
            )
        )}
      </ul>
      <h2>完了リスト</h2>
      <ul>
        {items.map(
          (Todo) =>
            Todo.done === true && (
              <div key={Todo.id}>
                <li>{Todo.content}</li>
                <button onClick={() => Onreverse(Todo.id)}>
                  未完了リストへ
                </button>
                <button onClick={() => onDelete(Todo.id)}>削除</button>
              </div>
            )
        )}
      </ul>
    </div>
  );
}

//Appコンポーネントをエクスポート
export default App;
