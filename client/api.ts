import { DEV_SERVER_PORT } from "../shared/constants";

const env = process.env.NODE_ENV;

export const host =
  env === "production"
    ? "https://libsizes.herokuapp.com"
    : "https://localhost:" + DEV_SERVER_PORT;
