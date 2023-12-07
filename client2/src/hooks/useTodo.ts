import { useState } from "react";
import axios from "axios";

// Todo型の定義
type Todo = {
  id: number;
  content: string;
  done: 0 | 1;
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
      const endpoint = "http://localhost:3001/todos";
      // 新しいTodoアイテムのデータ
      const requestData: Todo = {
        id: num,
        content: text,
        done: 0,
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
      const response = await axios.get("http://localhost:3001/todos");
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

  const findItemById = (
    items: Record<number, Todo>,
    id: number
  ): Todo | null => {
    for (const key in items) {
      if (id === items[key].id) {
        const responseData: Todo = items[key];
        return responseData;
      }
    }
    console.log("Item not found");
    return null;
  };

  // todo.doneの値を逆にする
  const Onreverse = async (id: number): Promise<void> => {
    try {
      await fetchData();
      const responseData = findItemById(items, id);

      console.log(responseData);
      const response = await axios.post(
        `http://localhost:3001/todos/update/${id}`,
        responseData
      );

      console.log("サーバーからの応答", response.data);
      // データベースが成功しても反映されない場合の対処
      if (response.data && response.data.affectedRows === 0) {
        console.warn("データベース更新が反映されませんでした");
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, done: item.done === 1 ? 0 : 1 } : item
        )
      );
    } catch (error) {
      console.log("エラーが発生しました", error);
    }
  };

  const onDelete = (id: number): void => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
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
