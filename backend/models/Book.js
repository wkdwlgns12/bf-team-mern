const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            ype: String,
            default: ""
        },
    }, {
    timestamps: true
}
);

module.exports = mongoose.model("Book", bookSchema);