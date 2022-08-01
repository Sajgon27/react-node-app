import styles from "./Description.module.scss";

function Description(props) {
  return <div className={styles.container}>{props.desc}</div>;
}

export default Description;
