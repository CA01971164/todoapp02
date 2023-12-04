import { Todo } from "../hooks/useTodo";
import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

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
    <Box
      sx={{
        backgroundColor: "background.default",
        padding: 2,
        justifyContent: "center",
        flexDirection: "colume",
        alignItems: "center",
      }}
    >
      <Typography variant="h4"> {Head}</Typography>

      {items.map((Todo) => {
        if (Head === "未完了リスト") {
          return (
            <>
              {Todo.done === 0 && (
                <Box
                  sx={{
                    backgroundColor: "#FFC0CB", // 背景色をうすピンクに設定
                    padding: 2,
                    borderRadius: 4, // 任意でボックスの角を丸める
                    marginBottom: 2, // 任意でボックス同士の間隔を設定
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography key={Todo.id}>{Todo.content}</Typography>
                  <Button variant="outlined" onClick={() => Onreverse(Todo.id)}>
                    完了リストへ
                  </Button>
                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => onDelete(Todo.id)} />
                  </IconButton>
                </Box>
              )}
            </>
          );
        } else if (Head === "完了リスト") {
          return (
            <>
              {Todo.done === 1 && (
                <>
                  <Box
                    sx={{
                      backgroundColor: "#FFC0CB", // 背景色をうすピンクに設定
                      padding: 2,
                      borderRadius: 4, // 任意でボックスの角を丸める
                      marginBottom: 2, // 任意でボックス同士の間隔を設定
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography key={Todo.id}>{Todo.content}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => Onreverse(Todo.id)}
                    >
                      完了リストへ
                    </Button>
                    <IconButton aria-label="delete">
                      <DeleteIcon onClick={() => onDelete(Todo.id)} />
                    </IconButton>
                  </Box>
                </>
              )}
            </>
          );
        } else {
          console.log("エラーが出てる");
          return null;
        }
      })}
    </Box>
  );
};

export default TodoList;
