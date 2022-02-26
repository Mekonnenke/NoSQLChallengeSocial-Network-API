const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: 'Please enter a username',
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true,'Please enter a valid email address'],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
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

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;