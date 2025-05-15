const isAdminMiddleware = async (req, res, next) => {
    const user =  req.user
    if(!user.role){
          return res
        .status(401)
        .send({ success: false, message: "Un Authorize access." });
    }
    next();
}
export default isAdminMiddleware