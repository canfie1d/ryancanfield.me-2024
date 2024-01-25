import { Handler } from "@netlify/functions";

let headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": "2592000",
  "Access-Control-Allow-Credentials": "true",
};

export const handler: Handler = async (event) => {
  const colors = event.body ? JSON.parse(event.body) : undefined;

  try {
    const response = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify({
        model: "ui",
        input: JSON.stringify(colors),
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
