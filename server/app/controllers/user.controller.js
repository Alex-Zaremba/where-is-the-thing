exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Welcome to 'Where is the thing?' application." });
};

exports.userBoard = (req, res) => {
  res.status(200).send({ message: "User Content." });
};

exports.adminBoard = (req, res) => {
  res.status(200).send({ message: "Admin Content." });
};
