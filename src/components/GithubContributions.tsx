import { useRef, useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import { drawContributions } from "github-contributions-canvas";
import { useAchievementContext } from "../contexts/AchievementProvider";
import Modal from "../components/Modal";
import Icon from "../components/Icon";
import Loader from "./Loader";
import Button from "./Button";

type StateType = {
  isPending: boolean;
  data: any;
  likesIt: boolean | undefined;
  showData: boolean;
};

const reducer = (state: StateType, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "SET_LIKES_IT":
      return { ...state, likesIt: action.payload };
    case "SET_IS_PENDING":
      return { ...state, isPending: action.payload };
    case "SET_SHOW_DATA":
      return { ...state, showData: action.payload };
    case "SET_DATA":
      return action.payload;
    default:
      throw new Error();
  }
};
const DEFAULT_STATE: StateType = {
  isPending: false,
  data: null,
  likesIt: undefined,
  showData: false,
};

const GithubContributions = () => {
  const { hasAchievement, addAchievement } = useAchievementContext();

  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && state.data) {
      drawContributions(canvasRef.current, {
        data: state.data,
        username: "canfie1d",
        themeName: "standard",
        fontFace: "Nunito",
      });
    }
  }, [state.data, state.showData]);

  const handleGetData = async () => {
    if (!hasAchievement("git_good")) {
      addAchievement("git_good");
    }

    if (state.data) {
      dispatch({ type: "SET_SHOW_DATA", payload: true });
    } else {
      dispatch({ type: "SET_IS_PENDING", payload: true });

      try {
        const response = await fetch("/api/github-contributions");
        const data = await response.json();

        dispatch({
          type: "SET_DATA",
          payload: { isPending: false, data: data.data, showData: true },
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: "SET_IS_PENDING",
          payload: { isPending: false },
        });
      }
    }
  };

  const handlePollClick = (arg: boolean) => {
    dispatch({ type: "SET_LIKES_IT", payload: arg });
    if (!hasAchievement("feeding_back")) {
      addAchievement("feeding_back");
    }
  };

  return (
    <>
      {createPortal(
        <Modal
          show={state.showData}
          onClose={() => dispatch({ type: "SET_SHOW_DATA", payload: false })}
          header={
            <Modal.Header
              title="Github Contributions per day"
              subtitle="current to 2012"
              icon="github"
              onClose={() =>
                dispatch({ type: "SET_SHOW_DATA", payload: false })
              }
            />
          }
        >
          {state.isPending ? (
            <Loader />
          ) : (
            <>
              <canvas
                ref={canvasRef}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  margin: "auto",
                }}
              />
              <p style={{ textAlign: "center", fontStyle: "italic" }}>
                {state.likesIt === undefined ? (
                  <code className="inlineBlock">
                    // I'm not really sure why I added this to the site. Should
                    I keep it?{" "}
                    <Button
                      variant="transparent"
                      onClick={() => handlePollClick(true)}
                      style={{ display: "inline", color: "#31c22a" }}
                    >
                      ( Y )
                    </Button>
                    &nbsp;
                    <Button
                      variant="transparent"
                      onClick={() => handlePollClick(false)}
                      style={{ display: "inline", color: "red" }}
                    >
                      ( N )
                    </Button>
                  </code>
                ) : state.likesIt === false ? (
                  "You're probably right. I'll remove it. Thanks for the feedback."
                ) : (
                  "Yeah? Ok- I'll keep it. Thanks for the feedback."
                )}
              </p>
            </>
          )}
        </Modal>,
        document.body,
        "gh-data"
      )}
      <Button
        variant={
          state.likesIt === false && state.showData === false
            ? "vanishing"
            : undefined
        }
        style={{ marginTop: "var(--spacing-unit)" }}
        onMouseEnter={() => {
          if (state.likesIt === false && !hasAchievement("finders_keepers")) {
            addAchievement("finders_keepers");
          }
        }}
        onClick={handleGetData}
        disabled={state.showData || state.isPending}
      >
        <Icon name="github" size="small" />
        <span style={{ paddingLeft: "var(--spacing-unit-half)" }}>
          {state.isPending ? "Loading..." : "Github Contribution Graph"}
        </span>
      </Button>
    </>
  );
};

export default GithubContributions;
