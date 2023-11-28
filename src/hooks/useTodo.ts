import { useState, useEffect } from "react";
import axios from "axios";

// Todo型の定義
type Todo = {
  id: number;
  content: string;
  done: boolean;
};

type useTodoReturn = {
  text: string;
  items: Todo[];
  setText: React.Dispatch<React.SetStateAction<string>>;
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fetchData: () => Promise<void>;
  onDelete: (id: number) => void;
  Onreverse: (id: number) => void;
};

const useTodo = (): useTodoReturn => {
  // テキスト入力の状態を管理する state
  const [text, setText] = useState<string>("");

  // Todoアイテムの配列を管理する state
  const [items, setItems] = useState<Todo[]>([]);
  // Todoアイテムを追加するボタンがクリックされたときのイベントハンドラ
  const onAdd = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
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
  const fetchData = async (): Promise<void> => {
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
  const Onreverse = (id: number): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const onDelete = (id: number): void => {
    axios
      .delete(`http://localhost:3100/todo/${id}`)
      .then((response) => {
        console.log("データが削除された", response.data);
      })
      .catch((error) => {
        console.error("削除中にエラーが発生しました", error);
      });
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return {
    text,
    items,
    setText,
    onAdd,
    fetchData,
    onDelete,
    Onreverse,
  };
};

export default useTodo;
export type { Todo };
