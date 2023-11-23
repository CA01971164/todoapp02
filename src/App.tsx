import React, { useState, MouseEventHandler } from "react";
import axios from "axios";

type todo = {
  id: number;
  content: string;
  done: boolean;
};

function App() {
  const [text, setText] = useState<string>("");
  // itemは、todo型である
  const [items, setItems] = useState<todo[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 新しい配列をセットする
  const onAdd: MouseEventHandler<HTMLButtonElement> = (text: string) => {
    // 新しい配列を作成
    // 変数をよぶときは、宣言が必要
    let arr: todo[] = [...items];
    // 配列にそれをいれる
    arr.push(text);
    setItems(arr);
    // id生成
    let num: number = Math.round(Math.random() * 100000);

    const sendDataToMockServer = async () => {
      const endpoint = "http://localhost:3100/todo";
      const requestData: todo = {
        id: num,
        content: text,
        done: false,
      };

      try {
        const response = await axios.post(endpoint, requestData);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };

  return (
    <div>
      <h1>進捗管理</h1>
      <input type="text" value={text} onChange={handleTextChange}></input>
      <button onClick={onAdd}>+TODOを追加</button>
      <h2>TODOリスト</h2>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

export default App;
