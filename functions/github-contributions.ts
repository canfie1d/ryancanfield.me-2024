import { Handler } from "@netlify/functions";
import { headers } from "../config";

export const handler: Handler = async (event, context) => {
  try {
    const response = await fetch(
      "https://github-contributions.vercel.app/api/v1/canfie1d"
    );
    const data = await response.json();
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ data }),
    };
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
