import styles from "../styles/content.module.scss";

const Carnival = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>
        A reimagined Princess Caribbean cruise experience.
      </h2>
      <h3 className={styles.h3}>Problem Analysis</h3>
      <p className={styles.p}>
        Connectivity while on board a cruise ship in the middle of the ocean is
        an expensive and largely unsolved problem. The cost of internet access
        is passed to guests through expensive WiFi connections while all of the
        internet traffic on board the ship is routed through a single satallite
        signal leading to sluggish and spotty connections.
      </p>
      <p className={styles.p}>
        Most of the guests' needs for internet could be satisfied by offering a
        local network onboard the ship- including location tracking and mapping,
        social interactivity, and access to many other services or activities on
        board the ship itself. In addition to the problem with connectivity, the
        demographic among guests was aging and updating the experience would
        attract younger passengers. Cruising was getting stale and it was ripe
        for reinvigoration.
      </p>
      <h3 className={styles.h3}>Solution</h3>
      <p className={styles.p}>
        Carnival Cruiselines assembled a very large team of engineers, builders,
        hardware experts, and software developers to undertake this very
        ambitious project. I personally was involved in the guests' social
        interaction and communication in Ocean Chat. This was a pivotal role in
        the success of the product as it solved one of the largest needs for
        WiFi service- staying in touch with other members of their travel party.
      </p>
      <p className={styles.p}>
        I knew that by creating a simple and intuitive interface that would be
        somewhat familiar to them through other messaging apps, that I would
        have a good base to form the UI of the messaging app from. The
        challenging part of my assignment was integrating less traditional
        sharing options to the app as well as group voice and video calling. In
        addition to the app being quite featureful, it also needed to be
        supported on three very different screen sizes- a 55" vertial touch
        screen portal, a 24" touch screen monitor, as well as all mobile
        screens. Keeping design simple proved quite a challenge.
      </p>
      <h3 className={styles.h3}>Result</h3>
      <p className={styles.p}>
        The result is familiar and intuitive yet fresh and full of all the
        features you can expect from another messaging app. Plus it offers other
        unexpected features such as event and location sharing made possible by
        the ship's onboard local network.
      </p>
      <p className={styles.p}>
        Carnival Cruiselines has since integrated Ocean Compass into all of
        their Caribbean Princess cruises under their MedaillionClass service.
      </p>
    </div>
  );
};

export default Carnival;
