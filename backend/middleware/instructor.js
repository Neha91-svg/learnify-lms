const instructor = (req, res, next) => {
    if (req.user && req.user.role === "instructor") {
        next();
    } else {
        res.status(403).json({ message: "Instructor access only" });
    }
};

module.exports = instructor;
