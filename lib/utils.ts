import Exa from "exa-js";

export const exa = new Exa(process.env.EXA_API_KEY);

export const SuccessResponse = () => new Response("Success!", { status: 200 });
