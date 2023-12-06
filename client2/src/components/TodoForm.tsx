import { Dispatch, SetStateAction } from "react";
import { Button, TextField } from "@mui/material";

type TodoFormProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ text, setText, onAdd }) => {
  // テキスト入力が変更されたときのイベントハンドラ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <TextField
        label="Todoを入力"
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onAdd}
        style={{ marginTop: 10 }}
      >
        +Todoを追加
      </Button>
    </div>
  );
};

export default TodoForm;
