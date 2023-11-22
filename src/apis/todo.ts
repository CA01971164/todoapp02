import axios from "axios";

export default function App() {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3100/todo");

    return console.log("response.data");
  };
  fetchData();
  return <h1>Hello React</h1>;
}
