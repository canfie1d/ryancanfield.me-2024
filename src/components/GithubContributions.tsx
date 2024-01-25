import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { drawContributions } from "github-contributions-canvas";
import Modal from "../components/Modal";
import CircleX from "../icons/circle-x.svg?react";

const GithubContributions = () => {
  const [getData, setGetData] = useState(false);

  const {
    isPending,
    error,
    data: ghData,
  } = useQuery({
    enabled: getData,
    queryKey: ["ghData"],
    queryFn: async () => {
      return await fetch(
        "https://github-contributions.vercel.app/api/v1/canfie1d"
      ).then((res) => {
        console.log(res);
        return res.json();
      });
    },
  });

  if (error) {
    console.error(error);
  }

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && ghData) {
      drawContributions(canvasRef.current, {
        data: ghData.data,
        username: "canfie1d",
        themeName: "standard",
        fontFace: "Nunito",
      });
    }
  }, [ghData]);

  return (
    <>
      {createPortal(
        <Modal
          show={!!ghData}
          header={
            <>
              <h2>GitHub Contributions</h2>
              <button
                className="hidden-button"
                onClick={() => setGetData(false)}
              >
                <CircleX />
              </button>
            </>
          }
        >
          <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
        </Modal>,
        document.body,
        "gh-data"
      )}
      <button onClick={() => setGetData(true)} disabled={getData && isPending}>
        {getData && isPending
          ? "Getting Latest Contributions from Github..."
          : "View Github Contributions"}
      </button>
    </>
  );
};

export default GithubContributions;
