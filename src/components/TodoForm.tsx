import { Dispatch, SetStateAction } from "react";

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
    <div>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={onAdd}>+Todoを追加</button>
    </div>
  );
};

export default TodoForm;
