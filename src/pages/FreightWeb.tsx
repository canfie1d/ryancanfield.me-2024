import styles from "../styles/content.module.scss";

const FreightWeb = () => {
  return (
    <div className={styles.contentBody}>
      <h2 className={styles.h2}>Automated Freight Sourcing & Matching</h2>
      <h3 className={styles.h3}>Problem Analysis</h3>
      <p className={styles.p}>
        There is a lot of manual work that goes into moving freight within the
        logistics industry. This leads to many wasted hours and reduced margins
        within a freight brokerage.
      </p>
      <p className={styles.p}>
        On average, it takes a freight broker 2-3 hours to source a carrier and
        have an agreement in place to transport goods from origin to
        desintation. Even then, the agreement only provides necessary documents.
        Updates and changes still need to be managed with additional emails or
        phone calls. Once the agreement is in place, there is little information
        available to brokerages about the driver moving it, whether or not they
        are running on time, and the shipments exact location.
      </p>
      <p className={styles.p}>
        Lastly, many of the managment systems on the market offer very poor user
        experiences with cumbersome and difficult to learn interfaces leading to
        additional wasted time and resources.
      </p>
      <h3 className={styles.h3}>Solution</h3>
      <p className={styles.p}>
        With the goal of transforming the industry with machine learning and a
        proprietary matching algorithm, we set out to match brokers looking to
        move domestic goods with carriers who have the available capacity and
        are looking for freight to fill their trucks. In order to achieve this,
        we would need a solution that opened up the line of communication for
        everyone involved.
      </p>
      <p className={styles.p}>
        The Shipping Hub is the first piece to solving the problem. With
        Shipping Hub, brokers create loads with reverse-eBay style auctions. The
        auctions are immediately available to all carriers through a public load
        board. The load is also passed through the matching algorithm and
        matches can be invited to place a bid. Once an auction closes, the load
        is converted to a shipment which receives up to the minute updates on
        status and driver location.
      </p>
      <p className={styles.p}>
        The Carrier Hub is a fully-featured TMS (truck management system). It
        allows a carrier's dispatcher to find loads on partner load boards and
        FreightWeb's own auctions. It also allows carriers to input and track
        and download their shipments, payments, drivers, financial data and much
        more.
      </p>
      <p className={styles.p}>
        The Driver Hub allows the drivers to provide updates to their dispatcher
        on their current load, view upcoming loads, open turn-by-turn
        directions, upload and view shipment documents and even view past
        paystubs.
      </p>
      <h3 className={styles.h3}>Result</h3>
      <p className={styles.p}>
        The app ecosystem consists of 4 apps including the previously
        unmentioned Admin Hub. All 4 share styles and components. The styles are
        applied through a package imported into each app allowing all apps to
        share the same stylesheets. Components required by more than one of the
        apps are maintained in a component library allowing them to be shared
        across apps as well.
      </p>
      <p className={styles.p}>
        By foucusing on displaying only relevant and momentary infomation, the
        end-to-end user experience is made up of clutter-free workflows that
        vastly improve task completion times. The UI is visually unified and
        more easily manageable over competitors products. There was an also an
        additional focus on simplicity and ease of use to lessen the learning
        curve that other logistics software requires. To add to this the user
        experience is streamlined, appealing and fully transparent for all
        invested parties.
      </p>
      <p className={styles.p}>
        In regard to the initial goal of reducing manual effort for brokers, we
        were able to estimate that on average, brokers were spending ~30 minutes
        on placing each load. This was a vast improvement over traditional
        call/email efforts.
      </p>
    </div>
  );
};

export default FreightWeb;
