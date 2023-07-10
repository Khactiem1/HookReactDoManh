import type { RegisterOptions } from "react-hook-form";
type Rules = {
  [key in
    | "email"
    | "product_name"
    | "phone_number"
    | "notRequired"
    | "isRequired"]: RegisterOptions;
};
export const rules: Rules = {
  notRequired: {
    required: false,
  },
  isRequired: {
    required: { value: true, message: "Is required" },
  },
  email: {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Email invalidate",
    },
    maxLength: {
      value: 150,
      message: "Length from 5-10 characters",
    },
    minLength: {
      value: 5,
      message: "Length from 5-10 characters",
    },
  },
  phone_number: {
    // required: {
    //   value: false,
    //   message: "Email is required",
    // },
    pattern: {
      value:
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
      message: "Phone number invalidate",
    },
  },
  product_name: {
    required: {
      value: true,
      message: "Is required",
    },
    minLength: {
      value: 5,
      message: "Length from 5-10 characters",
    },
  },
};
