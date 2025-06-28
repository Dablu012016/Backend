import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (res, req) => {
    // get user details from frontend
    const { username, email, fullName, password } = req.body;

    // validation - not empty
    if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
        throw new apiError(400, "this field is required");
    };

    // check if user already exist: username, email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new apiError(409, "User with email or username already exists");
    };
    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;    

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is required");
    };

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new apiError(400, "avatar file is required");
    }
    
    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation
    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user")
    };
    // return res

     return res.status(201).json(
        new apiResponse(200, createdUser, "User Registered Successfully")
     )
});

export { registerUser };