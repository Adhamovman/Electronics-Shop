import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function SIGN(payload) {
    return jwt.sign({ token: payload }, process.env.SECRET, {
        expiresIn: "12h",
    });
};
export function VERIFY(token) {
    return jwt.verify(token, process.env.SECRET);
}
