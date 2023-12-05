import model from "./models.js";

// all functions are async, need to deal with promises
export const createUser = (user) => model.create(user);       //3.5.5
export const findAllUsers = () => model.find();



export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });

// to retrieve a document that matches properties username and 
                                        //password with the parameters usr and pass passed 
                                        //from the user interface through the RESTful API.
export const findUserByCredentials = (usr, pass) =>
  model.findOne({ username: usr, password: pass });


export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
