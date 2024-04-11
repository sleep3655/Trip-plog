import styles from "./NavBar.module.css"; // Import the CSS file
export default function NavBar({ children, title, operation }) {
  return (
    <div>
      <div className={styles.title}>
        {title}
        <span className={styles.operation}>{operation}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
