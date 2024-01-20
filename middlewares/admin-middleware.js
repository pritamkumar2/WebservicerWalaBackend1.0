export const adminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.isAdmin === true) {
      console.log("is admin  //////////////////////////////////////////");

      next();
    } else {
      console.log("is not admin //////////////////////////////////");
      res.status(400).json("admin middelware: admin invalid unsuccessful");
    }
  } catch (error) {
    console.log(error);
  }
};
