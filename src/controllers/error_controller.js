import { validationResult } from "express-validator";

export const playerValidationErrors = (err, req, res, next) => {
  const errors = validationResult(req).formatWith(({ param, msg }) => ({
    [param]: msg
  }));
  if (!errors.isEmpty())
    res.status(405).json(errors.array({ onlyFirstError: true }));
  else res.status(400).json({ errors: "something went wrong" });
};
