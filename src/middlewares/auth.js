const adminAuth = (req, res, next) => {
  //Logic of Fetching Data
  // It should be authorised
  console.log("Adin auth is checkeding ");
  const token = "xyz";
  const isAdminAuthDone = token === "xyz";
  if (isAdminAuthDone) {
    next();
  } else {
    res.status(401).send("Unauthrosied Result");
  }
}

const userAuth = (req, res, next) => {
  //Logic of Fetching Data
  // It should be authorised
  console.log("Adin auth is checkeding ");
  const token = "xyz";
  const isAdminAuthDone = token === "xyz";
  if (isAdminAuthDone) {
    next();
  } else {
    res.status(401).send("Unauthrosied Result");
  }
}

module.exports={
    adminAuth , userAuth
}