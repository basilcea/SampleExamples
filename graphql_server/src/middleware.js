import csurf from "csurf";

const crsfProtection = csurf({ cookie: true });

export const csrfMiddleware = {
  Mutation: {
      login: crsfProtection,
      post: crsfProtection,
      signup: crsfProtection,
      vote: crsfProtection,
  }
};
