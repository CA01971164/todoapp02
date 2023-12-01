import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type TodoFormProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ text, setText, onAdd }) => {
  // テキスト入力が変更されたときのイベントハンドラ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box>
      <TextField
        margin="normal"
        label="ADD TODO"
        required
        fullWidth
        value={text}
        onChange={handleTextChange}
      />
      <Button variant="contained" onClick={onAdd}>
        +Todoを追加
      </Button>
    </Box>
  );
};

export default TodoForm;
