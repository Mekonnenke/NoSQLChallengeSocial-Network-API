// Require Mongoose
const { Schema , model } = require("mongoose");


const UsersSchema = new Schema (
    {
        username: {
            type: String,
            required: [true,'Please enter a username'],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required:true,
            unique: true,
             // use REGEX to validate correct email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Thought' 
                // The ref property is especially important because it tells the tought
                //to search to find the right comments
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,  
                ref: 'User' // data comes from the Thought model
            }
        ]
    },
    // toJson inform the schema that it can use virtuals
    {
        toJSON: {
            virtuals: true
        },
        id: false 
    }
);
// get total count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
// create the Users model using the Users Schema
const Users = model('Users', UsersSchema);

module.exports = Users;