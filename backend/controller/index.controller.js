import userModel from "../model/user.model.js";
import contactSubmission from "../model/contact.model.js";
import service from "../model/service.model.js";

export const getData = async (req, res) => {
    try {
        const data = await userModel.find();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching data",
        });
    }
};

export const handlerSignup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required",
            });
        }
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const user = new userModel({
            email,
            password,
            username,
        });
        await user.save();
        const token = await user.generateToken();
        return res.status(201).json({
            message: "User registered successfully",
            token: token,
            name: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error("Error saving data:", error);
        return res.status(500).json({
            message: "Error saving data",
        });
    }
};

export const handlerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(404).json({ message: "Incorrect password" });
        }
        const token = await user.generateToken();
        return res.status(201).json({
            message: "Login successful",
            token: token,
            name: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};

export const userUpdateHandler = async (req, res) => {
    try {
        const email = req.params.email;
        const data = req.body;
        const user = await userModel.findOneAndUpdate({ email }, data);
        if (!user) {
            res
                .json({
                    message: "User not found",
                })
                .status(404);
            return;
        }
        res
            .json({
                message: "Data updated successfully",
                data,
            })
            .status(200);
    } catch (error) {
        res
            .json({
                message: "Error updating data",
            })
            .status(500);
    }

}
export const userDeleteHandler = async (req, res) => {
    try {
        const name = req.params.user;
        const email = req.params.email;

        if (!name || !email) {
            res
                .json({
                    message: "Missing user or email",
                })
                .status(400);
            return;
        }

        const data = await userModel.findOneAndDelete({ name, email });
        if (!data) {
            res
                .json({
                    message: "Data not found",
                })
                .status(404);
            return;
        }
        res
            .json({
                message: "Data deleted successfully",
                data,
            })
            .status(200);
    } catch (error) {
        res
            .json({
                message: "Error deleting data",
            })
            .status(500);
    }

}

export const forgetPasswordHandler = async (req, res) => {
    console.log('hello world!');
    res.send('hello world!');
    try {
        const email = req.params.email;
        const { password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Account not found",
            });
        }
        user.password = password;
        await user.save();
        return res.status(200).json({
            message: "Account password successfully updated",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating data",
            error: error.message,
        });
    }
}

export const contactFormHandler = async (req, res) => {
    const { name, email, message } = req.body;

    // Validate the input fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Optionally: validate email format (if not already handled in frontend)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    try {
        // Check if the user has already submitted 10 messages
        const submissionCount = await contactSubmission.countDocuments({ email });

        if (submissionCount >= 10) {
            return res.status(400).json({ message: 'You have reached the limit of 10 messages.' });
        }

        // Create and save the contact form submission
        const contactForm = new contactSubmission({
            name,
            email,
            message,
        });

        await contactForm.save();

        // Respond with success message
        res.status(201).json({ message: 'Your message has been saved successfully!' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error saving submission:', error);

        // Send a 500 response for internal server error
        res.status(500).json({ message: 'Failed to save message. Please try again later.' });
    }
};

export const checkUserHandler = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        return res.status(200).json({
            message: "User authenticated successfully",
            user: req.user,
        });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({
            message: "Error finding user",
            error: error.message,
        });
    }
};

export const serviceHandler = async (req, res) => {
    try {
        const data = await service.find();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({
            message: "Error finding user",
            error: error.message,
        });
    }
}