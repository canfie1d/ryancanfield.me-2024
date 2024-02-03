import { useRef, useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import { drawContributions } from "github-contributions-canvas";
import Modal from "../components/Modal";
import GithubIcon from "../icons/github.svg?react";
import Loader from "./Loader";

type StateType = {
  isPending: boolean;
  data: any;
  showData: boolean;
};

const reducer = (state: StateType, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "setIsPending":
      return { ...state, isPending: action.payload };
    case "setShowData":
      return { ...state, showData: action.payload };
    case "setData":
      return action.payload;
    default:
      throw new Error();
  }
};
const DEFAULT_STATE: StateType = {
  isPending: false,
  data: null,
  showData: false,
};

const GithubContributions = () => {
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
    if (state.data) {
      dispatch({ type: "setShowData", payload: true });
    } else {
      dispatch({ type: "setIsPending", payload: true });

      try {
        const response = await fetch("/api/github-contributions");
        const data = await response.json();

        dispatch({
          type: "setData",
          payload: { isPending: false, data: data.data, showData: true },
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: "setIsPending",
          payload: { isPending: false },
        });
      }
    }
  };

  return (
    <>
      {createPortal(
        <Modal
          show={state.showData}
          header={
            <Modal.Header
              title="Github Contributions per day"
              subtitle="current to 2012"
              icon={<GithubIcon />}
              onClose={() => dispatch({ type: "setShowData", payload: false })}
            />
          }
        >
          {state.isPending ? (
            <Loader />
          ) : (
            <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
          )}
        </Modal>,
        document.body,
        "gh-data"
      )}
      <button
        onClick={handleGetData}
        className="modal-trigger"
        disabled={state.showData || state.isPending}
      >
        <GithubIcon />
        {state.isPending ? "Loading..." : "Github Contribution Graph"}
      </button>
    </>
  );
};

export default GithubContributions;
