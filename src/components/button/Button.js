import styles from "./Button.module.css";

export const variants = {
  add: "button-add",
  edit: "button-edit",
  delete: "button-delete",
  view: "button-view",
  nav: "button-nav",
};

const Button = ({ children = "Click", variant = variants.add, onClick }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
