interface ButtonProps {
  action: (event?: React.FormEvent) => void;
  className?: string;
  text: string;
  type?: "button" | "reset" | "submit";
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        type={props.type ?? "button"}
        className={`${props.className} p-2 rounded-lg`}
        onClick={(e) => props.action(e)}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
