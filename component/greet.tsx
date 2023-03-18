import styles from "@/styles/home.module.css";
const greet = () => {
  const greet = [
    "Harry Potter and The Deathly Hallows",
    "Harry Potter and The Prisoner of Askaban",
    "Lords of the Rings",
    "Sasageyo",
    "Is That Levi",
    "AOT Is The Best Anime",
    "Harry Potter and The Half Blood Prince",
    "Harry Potter and Chamber Of Secrets",
    "Harry Potter and The Goblet Of Fire"
  ];

  const randomIndex = Math.floor(Math.random() * greet.length);

  const item = greet[randomIndex];

  return (
    <>
      <div className={styles.greeting}>
        {/* <div>Hi Rishabh Singh,</div> */}
        <div className={styles.userName}>
          <div>Hi</div>
          <div>Rishabh</div>
          <div>Singh,</div>
        </div>
        <div className={styles.greetMsg}>{item}</div>
        
      </div>
    </>
  );
};
export default greet;
