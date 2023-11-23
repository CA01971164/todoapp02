import axios from "axios";

export default function App(): string {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3100/todo");

    return console.log("response.data");
  };
  fetchData();
  return `<h1>Hello React</h1>`;
}

// reactコンポーネントでリファクタリングが必要な場合には、教えて
