import User from "../models/User.js";


// Read or getuser account
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    res.status(200).json(user);

  } catch (err) {
    next(err);
  }
}


// Read or get ALL user accounts
export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (err) {
    next(err);
  }
}


// Update user account
export const updateUser = async (req, res, next) => {
  try {
    const editUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(editUser);

  } catch (err) {
    next(err);
  }
}


// Delete user account
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");

  } catch (err) {
    next(err);
  }
}