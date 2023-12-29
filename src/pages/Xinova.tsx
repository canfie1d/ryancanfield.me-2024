import styles from "../styles/content.module.scss";

const Xinova = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>Networking platform for inventors.</h2>
      <h3 className={styles.h3}>Problem Analysis</h3>
      <p className={styles.p}>
        With thousands of unused patents available and new problems waiting to
        be solved every single day, Xinova's mission was to find useful
        applications for existing patents while connecting inventors with
        companies looking to solve complex R&D problems.
      </p>
      <p className={styles.p}>
        Research and development costs are often too high for large corporations
        to have an internal department so in their R & D needs are outsourced.
        The issue arises when a solution to the problem has already been solved
        when solving an unrelated problem. How does a company find and utilize a
        patent that solves a problem they are having?
      </p>
      <h3 className={styles.h3}>Solution</h3>
      <p className={styles.p}>
        Xinova's Innovator Platform (X) was developed to find an answer to this
        problem. With Xinova's help, inventors gain access to large companies
        R&D projects and companies gain access to Xinova's extensive inventor
        network– a win/win.
      </p>

      <p className={styles.p}>
        In X, inventors were invited to participate in research projects. In
        their submission, they demonstrate how their solution, either new or
        existing, solves the problem. If selected, the inventor is offered to
        enter a profit sharing agreement with the company.
      </p>

      <h3 className={styles.h3}>Result</h3>
      <p className={styles.p}>
        Xinova's efforts with the Innovator Platform have resulted in 18,000
        solutions submitted in over 100 countries. Of those 18,000 solutions,
        5,400 have resulted in commercial assets in nuclear physics, materials
        science, biomedical engineering, computer science, biophysical
        chemistry, theoretical physics, artificial intellegence and more.
      </p>
    </div>
  );
};

export default Xinova;
