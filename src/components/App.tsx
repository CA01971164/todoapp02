import { useEffect } from "react";
import useTodo from "../hooks/useTodo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// アプリケーションのメインコンポーネント

function App() {
  // useTodカスタムフックの利用
  const { text, setText, items, onAdd, Onreverse, onDelete, fetchData } =
    useTodo();

  // useEffectを使ってデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  const defaultTheme = createTheme();

  //TSXでコンポーネントの描画
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Typography component="h1" variant="h4">
          {" "}
          進捗管理{" "}
        </Typography>

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
      </Container>
    </ThemeProvider>
  );
}

//Appコンポーネントをエクスポート
export default App;
