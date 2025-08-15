// const usersDB = {
//   users: require('../model/users.json')
// };
usersDB=require('../model/userDB');

const getUser = async(req, res) => {
  const { id } = req.params;

  const user = await usersDB.findOne({_id: id});
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user._id, name: user.name, email: user.email });
};

module.exports = getUser;
