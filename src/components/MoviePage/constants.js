import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const yearSchema = yup
  .number()
  .min(1888, t("errorMessages.yearMinError"))
  .max(
    dayjs().year() + 5,
    t("errorMessages.yearMaxError", {
      maxYear: dayjs().year() + 5,
    })
  )
  .nullable()
  .transform(value => (isNaN(value) ? null : value));

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_POSTER_URL =
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
