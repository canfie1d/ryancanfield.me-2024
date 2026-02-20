import { Link } from "react-router-dom";
import { useGameModeStore } from "~/stores/game-mode";

const AboutGameContent = () => {
  const activeGameModes = useGameModeStore((store) => store.activeGameModes);
  return (
    <div className="contentBody">
      <p>
        Welcome, noble wanderer, to the realm of <b>Eryndor</b>, a land of
        ancient magic and boundless wonder. You have stepped into a world where
        banners of gold and crimson flutter in the eternal breeze, and the
        whispers of forgotten legends guide your path. Here, the very fabric of
        the realm is woven with secrets, and your quest is to unravel the
        mysteries hidden within its opulent halls and enchanted glades.
      </p>
      <p>
        This is no ordinary journey, for <b>Eryndor</b> is a living tapestry of
        discovery and triumph. Though you have already ventured far, the realm
        is vast, and its deepest secrets remain shrouded. There are more
        treasures to unearth, more{" "}
        <Link to={activeGameModes.work ? "/work" : "/404"}>achievements</Link>{" "}
        to claim, and more tales to inscribe in the annals of your legacy.
      </p>
      <h2>The Weaving of the Realm</h2>
      <p>
        The world of <b>Eryndor</b> was forged by hand by those who sought to
        create a realm where exploration and wonder reign supreme. Every stone,
        every banner, and every whispered secret was crafted to draw you deeper
        into its embrace. The threads of tradition woven into every corner,
        blending the familiar with the extraordinary.
      </p>
      <p>
        As you traverse this realm, you will find that <b>Eryndor</b> is not
        merely a place—it is a living story, one that unfolds with every step
        you take. It is designed to inspire courage and curiosity, inviting you
        to uncover its hidden depths and claim your place among its legends.
      </p>
    </div>
  );
};

export default AboutGameContent;
