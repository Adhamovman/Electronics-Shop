import sha256 from "sha256";
import { sendMail } from "../middlewares/sender.js";
import { user_model } from "../models/user.model.js";
import { user_schema } from "../schemas/user.schema.js";
import { SIGN } from "../utils/jwt.js";
import fs from "fs";

class user {
    async get(req, res) {
        try {
            const { id } = req.params;
            let data = await user_model.select(id, req.query);
            if (typeof data == 'string') throw new Error(data);

            res.send({
                status: 200,
                message: "Success",
                data
            })
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async getU(req, res) {
        try {
            const { token } = req.params;
            let data = await user_model.check(token);
            if (typeof data == 'string') throw new Error(data);
            res.send({
                status: 200,
                message: "Success",
                data
            })
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async register(req, res) {
        try {
            const { email } = req.body;
            let is_old_user = await user_schema.findOne({ email });
            if (is_old_user) throw new Error("This email already registered!");
            let user = await user_model.register(req.body);
            if (typeof user == 'string') throw new Error(user);
            res.send({
                status: 201,
                message: "Successfully registered!",
                token: await SIGN(user._id)
            });
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async login(req, res) {
        try {
            let user = await user_model.login(req.body);
            if (typeof user == 'string') throw new Error(user);
            res.send({
                status: 200,
                message: "Success!",
                data: { token: await SIGN(user._id), position: user.pos_ref_id.pos_name }
            });
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async put(req, res) {
        try {
            const { id } = req.params;
            let result = await user_model.update(id, req.body);
            if (typeof result == 'string') throw new Error(result);

            res.send(result);
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async addadmin(req, res) {
        try {
            const { id } = req.params;
            let data = await user_model.addadmin(id);
            if (typeof data == 'string') throw new Error(data);

            res.send({
                status: 200,
                message: "Success",
                data
            })
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            let result = await user_model.logout(id);
            if (typeof result == 'string') throw new Error(result);
            res.send(result);
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async checkPassword(req, res) {
        try {
            let { newpassword, email } = req.body;
            let data = JSON.parse(fs.readFileSync("./passwords.json", "utf-8"));

            if (data.password == req.params.pass) {
                let newUser = await user_schema.findOneAndUpdate({ email }, { password: sha256(newpassword) }, { new: true });

                res.send({
                    status: 200,
                    message: "Success",
                    token: await SIGN(newUser._id)
                })
            }
            else { throw new Error("Password doesn't not match!") }
        } catch (error) {
            res.send({
                status: 404,
                message: error.message,
                data: null
            })
        }
    }
    async sendPassword(req, res) {
        try {
            const { email } = req.body;
            const password = Math.floor(Math.random() * 900000 + 100000);
            let result = await sendMail(email, "Qaytganingiz bilan!", password);

            if (result.accepted.length) {
                fs.writeFileSync(
                    "./passwords.json",
                    JSON.stringify({ user: email, password }, null, 2)
                );
            }
            res.send({
                status: 200,
                message: `Password ${email} ga muvafaqqiyatli yuborildi!`,
                data: { email }
            });
        } catch (err) {
            res.send({
                status: 400,
                message: err.message,
                data: null
            });
        }
    }
}



export const user_controller = new user();