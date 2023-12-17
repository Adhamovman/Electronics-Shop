import sha256 from "sha256";
import { user_schema } from "../schemas/user.schema.js";
import { VERIFY } from "../utils/jwt.js";

class userModel {
    async select(id, filter) {
        const { username, off } = filter;
        return id ? await user_schema.findById(id).populate("pos_ref_id").populate("orders") : username ? await user_schema.findOne({ username }).populate("pos_ref_id") : user_schema.find().populate("pos_ref_id");
    }
    async check(token) {
        let id = VERIFY(token).token;
        return await user_schema.findById(id).populate("pos_ref_id").populate("orders").populate("products");
    }

    async register(body) {
        let { password } = body;
        return await user_schema.create({ ...body, password: sha256(password) });
    }
    async update(id, body) {
        return await user_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async addadmin(id) {
        let old_user = await user_schema.findById(id).populate("pos_ref_id");
        if (old_user.pos_ref_id.pos_name == "admin") {
            return await user_schema.findByIdAndUpdate(id, { pos_ref_id: "64f8b8d559a352f22d1b6163" }, { new: true });
        }
        else {
            return await user_schema.findByIdAndUpdate(id, { pos_ref_id: "64f8b8c259a352f22d1b615f" }, { new: true });

        }

    }
    async logout(id) {
        return await user_schema.findByIdAndUpdate(id, { deleted_at: new Date() }, { new: true });
    }
    async login(body) {
        const { email, password } = body;
        return await user_schema.findOne({ email, password: sha256(password) }).populate("pos_ref_id");
    }

}
export const user_model = new userModel();


// console.log(await user_schema.findById("6503467b4a82f64b5fcbb9d4").populate("orders").populate("products"));