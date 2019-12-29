import { checkSchema } from "express-validator";

export const playerIdSchema = checkSchema({
  playerId: {
    in: "params",
    exists: true,
    errorMessage: "must provide a player id"
  }
});

export const playerSchema = checkSchema({
  id: {
    in: "body",
    optional: true,
    isInt: {
      errorMessage: "id must be an integer"
    }
  },
  name: {
    in: "body",
    exists: true,
    isString: true,
    notEmpty: true,
    errorMessage: "name is required"
  },
  position: {
    in: "body",
    optional: true,
    matches: {
      options: [/\b(?:C|PF|SF|PG|SG)\b/],
      errorMessage: "position must be one of C, PF, SF, PG, SG"
    }
  }
});
