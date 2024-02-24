import { Handler } from "@netlify/functions";
import { headers } from "../config";

export const handler: Handler = async (event) => {
  const colors = event.body ? JSON.parse(event.body) : undefined;

  try {
    const response = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify({
        model: "ui",
        input: colors,
      }),
    });

    const colorData = await response.json();

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(colorData),
    };
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify(err),
    };
  }
};
