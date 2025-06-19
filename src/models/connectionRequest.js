const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,

    },
    status: {
      type: String,
      enum: { 
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: `{VALUE} is incorrrect status type`,
      },
      required:true,

    },
  },
  {
    timestamps: true,
  }
);

// IF i do connectionrequest.find({fromUseId;5678756786567, toUserI:2345987478987784374})
connectionRequestSchema.index({fromUserId:1 , toUserId:1});

connectionRequestSchema.pre("save", function(next){
  const connectionRequest = this;
  //Check if the fromUserID is same as toUserID
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection to self")
  }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;

