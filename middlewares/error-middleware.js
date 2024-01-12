const errorMiddleware = (erorr, req, res, next) => {
  const status = erorr.status || 500;
  const message = erorr.message || "backend error";
  const extraDetails = erorr.extraDetails || "error from the backend server";


  // Send a JSON response with the error details
 return res.status(222).json({ message, extraDetails } );

};

export default errorMiddleware;
