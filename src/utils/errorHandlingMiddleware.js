export const errorHandlingMiddleware = api => next => action => {
  if (action.type.startsWith("api/") && action.error) {
    console.error("Error identificator: ", action.payload);
  }
  return next(action);
};
