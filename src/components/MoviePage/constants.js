import dayjs from "dayjs";
import * as yup from "yup";

export const yearSchema = yup
  .number()
  .min(1888, "Year must be at least 1888")
  .max(
    dayjs().year() + 5,
    `Year must be less than or equal to ${dayjs().year() + 5}`
  )
  .nullable()
  .transform(value => (isNaN(value) ? null : value));

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_POSTER_URL =
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
