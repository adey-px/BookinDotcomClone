import User from "../models/User.js";


// Logic for updating user account
export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);

  } catch (err) {
    next(err);
  }
}

// Logic for deleting user account
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");

  } catch (err) {
    next(err);
  }
}

// Logic for getting user account
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);

  } catch (err) {
    next(err);
  }
}

// Logic for retrieving all user accounts
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);

  } catch (err) {
    next(err);
  }
}