import { subcategory_schema } from "../schemas/subcategory.schema.js";
import { category_schema } from "../schemas/category.schema.js";
import { discount_schema } from "../schemas/discount.schema.js";
import { product_schema } from "../schemas/product.schema.js";
import { brand_schema } from "../schemas/brand.schema.js";
import fs from 'fs'

class productModel {
    async select(id, filter) {
        const { pro_name, search } = filter;
        return id ? await product_schema.findById(id).populate('store_ref_id').populate('sub_ref_id') : pro_name ? await product_schema.findOne({ pro_name }).populate('comments').populate('sub_ref_id') : search ? await product_schema
            .find({
                $or: [
                    { pro_name: { $regex: new RegExp(search, 'i') } }, 
                    { pro_desc: { $regex: new RegExp(search, 'i') } }, 
                ],
            })
            .populate('brand_ref_id')
            .populate('disc_ref_id') : product_schema.find().populate("brand_ref_id").populate("disc_ref_id");
    }
    async create(body) {
        const { sub_ref_id, disc_ref_id, brand_ref_id, cat_ref_id } = body;

        let data = await product_schema.create(body);
        await subcategory_schema.findByIdAndUpdate(sub_ref_id, { $push: { products: data._id } })
        await category_schema.findByIdAndUpdate(cat_ref_id, { $push: { products: data._id } })
        await discount_schema.findByIdAndUpdate(disc_ref_id, { $push: { products: data._id } })
        await brand_schema.findByIdAndUpdate(brand_ref_id, { $push: { products: data._id } })

        return data;
    }
    async update(id, body) {
        return await product_schema.findByIdAndUpdate(id, body, { new: true });
    }
    async remove(id) {
        let old_pro = await product_schema.findById(id);
        let path = process.cwd() + old_pro.link;
        if (fs.existsSync(path)) fs.unlinkSync(path);
        await brand_schema.findByIdAndUpdate(old_pro.brand_ref_id, { $pop: { products: old_pro } });
        await category_schema.findByIdAndUpdate(old_pro.cat_ref_id, { $pop: { products: old_pro } });
        await subcategory_schema.findByIdAndUpdate(old_pro.sub_ref_id, { $pop: { products: old_pro } });

        return await product_schema.findByIdAndRemove(id);
    }
    async post_img(id, link) {
        let old_pro = await product_schema.findById(id);
        let path = process.cwd() + old_pro.link;
        if (fs.existsSync(path)) fs.unlinkSync(path);
        return await product_schema.findByIdAndUpdate(id, { link });
    }
}

export const product_model = new productModel();

// console.log(await product_schema.findById("64ffa8c002e21fd6602bfb7f"));