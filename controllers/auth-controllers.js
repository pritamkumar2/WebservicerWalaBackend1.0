import { User, Contact, Service } from "../models/userSchema.js";

const registerUser = (req, res) => {
  res.status(200).send("Welcome to the register page!");
};

const contactUser = (req, res) => {
  res.status(200).send("Welcome to the contact page!");
};

const userLogin = (req, res) => {
  res.status(200).send("Welcome to the login page!");
};

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the home page!");
  } catch (e) {
    console.log(e.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    if (!(username && email && password && phone)) {
      res.status(422).json("Fill out the form correctly");
      return;
    }

    const checkUserProfile = await User.findOne({ email: email });
    if (checkUserProfile) {
      res.status(222).json("You already have a profile");
      return;
    }

    const createdData = new User({
      username: username,
      email: email,
      phone: phone,
      password: password,
      isAdmin: false,
    });

    await createdData.save();

    res.status(200).json({
      msg: createdData,
      token: await createdData.generateToken(),
      userId: createdData._id.toString(),
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).send("Please enter both email and password");
    }

    const existEmail = await User.findOne({ email: email });

    if (!existEmail) {
      return res.status(222).json("Email not found");
    }

    const userVerification = await existEmail.decrypt(password);

    if (userVerification) {
      return res.status(200).json({
        msg: "Login successful",
        token: await existEmail.generateToken(),
        userId: existEmail._id.toString(),
      });
    } else {
      return res.status(222).json("Invalid credentials, try again");
    }
  } catch (e) {
    console.log("Error in login:", e);
    return res.json("Internal Server Error");
  }
};

const contacts = async (req, res) => {
  try {
    const { username, email, message, phone } = req.body;
    if (!username || !email || !message || !phone) {
      return res
        .status(422)
        .json("Please fill in the username, email, and message");
    }

    const updateContact = new Contact({
      username: username,
      email: email,
      message: message,
      phone: phone,
    });

    await updateContact.save();

    console.log("Contact submitted", updateContact);
    res.status(200).json("Your query has been submitted");
  } catch (e) {
    console.log("Error from contact db conn", e);
  }
};

const UserJwt = async (req, res) => {
  try {
    const userData = req.user;
    console.log("Data from UserJwt:", userData);
    return res.status(200).json({ userData });
  } catch (e) {
    console.log("UserJwt error:", e);
  }
};

const servicePage = async (req, res) => {
  try {
    const response = await Service.find();
    console.log(response);
    if (!response) {
      res.status(404).json({ mess: "no service found" });
    }
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const AdminUsers = async(req, res) => {
  try{
    const response = await User.find();
    console.log("hi users are here:",response);
  return res.status(200).json(response);   
  }catch (e) {
console.log('AdminUser error',e.message);
  }
};
export {
  home,
  register,
  registerUser,
  login,
  contacts,
  contactUser,
  userLogin,
  UserJwt,
  servicePage,
  AdminUsers,
};
