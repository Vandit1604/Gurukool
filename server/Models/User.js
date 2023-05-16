const mongoose = require("mongoose");
//defining the User Schema
const UserSchema = new mongoose.Schema(
  {
    isProUser: {
      type: Boolean,
      default: false,
    },
    newUser: {
      type: Boolean,
      default: true,
    },
    RouteId: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    AccountType: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: false,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 8,
    },
    ProfilePhoto: {
      type: String,
      required: false,
      default: "default.png",
    },
    Speciality: {
      type: String,
      required: false,
      default: "Student",
    },
    Gender: {
      type: String,
      required: false,
      default: "Not Specified",
    },
    DOB: {
      type: String,
      required: false,
      default: "0001-01-01",
    },
    Address: {
      type: String,
      required: false,
      default: "Not Specified",
    },
    PhoneNumber: {
      type: String,
      required: false,
      default: "Not Specified",
    },
    Subject: {
      type: {
        SubjectName: {
          type: String,
          default: "Not Specified",
        },
        Lower: {
          type: String,
          default: "Not Specified",
        },
        Higher: {
          type: String,
          default: "Not Specified",
        },
      },
      required: false,
      default: {
        Lower: "Not Specified",
        Higher: "Not Specified",
      },
    },
    Education: {
      type: String,
      required: false,
      default: "Not Specified",
    },
    Certification: {
      type: Array,
      required: false,
      default: [],
    },
    Experience: {
      type: Array,
      required: false,
      default: [],
    },
    TeachingDetails: {
      type: {
        Charges: {
          type: {
            Preference: String,
            MinimumFee: Number,
            MaximumFee: Number,
          },
        },
        FeeDetails: String,
        Experience: String,
        TeachingExperience: String,
        OnlineExperience: String,
        QnA: Object,
        Opportunities: String,
      },
      required: false,
      default: {
        Charges: {
          Preference: "Hourly",
          MinimumFee: 0,
          MaximumFee: 0,
        },
        FeeDetails: "",
        Experience: "",
        TeachingExperience: "",
        OnlineExperience: "",
        QnA: {},
        Opportunities: "Please Select",
      },
    },
    SkillSet: {
      type: Array,
      default: [],
    },
    ProfileDesc: {
      type: String,
      required: false,
      default: "Hii this is my new Account",
    },
    OneLiner: {
      type: String,
      required: false,
      default: "Hey I am newUser",
    },
    UserPoints: {
      type: {
        Points: {
          type: Number,
          default: 0,
        },
        RecentPointActivity: {
          type: String,
          default: "User Registration Bonus",
        },
      },
      default: {
        Points: 100,
        RecentPointActivity: "User Registration Bonus",
      },
    },
    Activities: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
//exporting the User model
module.exports = mongoose.model("user", UserSchema);
