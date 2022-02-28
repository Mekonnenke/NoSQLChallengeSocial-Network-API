const { Schema, model, Types } = require("mongoose");
const moment = require("moment"); 

const ReactionsSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: (createdAtValue) => moment(createdAtValue).format("MMM Do, YYYY [at] hh:mm a")
    }
  },
  {
    toJSON: {
      getters: true
    }, 
    _id: false
  }
);

const ThoughtsSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    }, 
    username: {
      type: String,
      required: true,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => moment(createdAtValue).format("MMM Do, YYYY [at] hh:mm a")
    }, 
   
    reactions: [ReactionsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// virtual to retrieve the length of the though's reactions array field
ThoughtsSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;