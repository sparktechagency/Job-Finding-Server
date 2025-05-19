const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      default: null,
    },
    lastName: {
      type: String,
      required: false,
      default: null,
    },
    fullName: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    image: {
      type: String,
      required: false,
      default: "/uploads/users/user.png"
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },


    role: {
      type: String,
      enum: roles,
    },
    callingCode: {
      type: String,
      required: false,
      default: null
    },
    phoneNumber: {
      type: Number,
      required: false,
      default: null
    },
    address: {
      type: String,
      required: false,
      default: null
    },
    subscriptionExprireDate: {
      type: Date,
      required: false,
      default: null
    },
    subscriptionId: {
      type: String,
      required: false,
      default: null
    },
    isSubscriptionTaken: {
      type: Boolean,
      default: false
    },
    applicationJobs: {
      type: Array,
      required: false,
      default: []
    },
    shortlistedJobs: {
      type: Array,
      required: false,
      default: []
    },
    bookmarkedJobs: {
      type: Array,
      required: false,
      default: []
    },

    gender: {
      type: String,
      required: false,
      default: null
    },
    nationality: {
      type: String,
      required: false,
      default: null
    },
    myCv: {
      type: String,
      required: false,
      default: null
    },
    portfolio: {
      type: String,
      required: false,
      default: null
    },
    universityName: {
      type: String,
      required: false,
      default: null
    },
    passingYear: {
      type: Date,
      required: false,
      default: null
    },
    depertment: {
      type: String,
      required: false,
      default: null
    },
    skills: {
      type: Array,
      required: false,
      default: []
    },
    importentFectorNewJobs: {
      type: Array,
      required: false,
      default: []
    },
    jobLocaiton: {
      type: Array,
      required: false,
      default: []
    },
    jobRemoteLocation: {
      type: String,
      required: false,
      default: null
    },
    visaRequirement: {
      type: String,
      required: false,
      default: null
    },
    languages: {
      type: Array,
      required: false,
      default: []
    },
    jobStartTimeFrame: {
      type: String,
      required: false,
      default: null
    },
    referrdeJobRole: {
      type: String,
      required: false,
      default: null
    },
    followingCompanies: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: []
    },
    desiredRoleLavel: {
      type: String,
      required: false,
      default: null
    },
    companySizePreffered: {
      type: String,
      required: false,
      default: null
    },
    industryInterested: {
      type: String,
      required: false,
      default: null
    },
    prefferedTechonology: {
      type: Array,
      required: false,
      default: []
    },
    salaryExpectation: {
      type: String,
      required: false,
      default: null
    },
    pronouns: {
      type: String,
      required: false,
      default: null
    },
    genderIdentaty: {
      type: String,
      required: false,
      default: null
    },
    ethnicity: {
      type: String,
      required: false,
      default: null
    },
    jobEmailNotificaiton: {
      type: String,
      required: false,
      default: null
    },
    howKnowThisWebstie: {
      type: String,
      required: false,
      default: null
    },
    aboutMySelfe: {
      type: String,
      required: false,
      default: null
    },


    isBlocked: {
      type: Boolean,
      default: false
    },

    nidNumber: {
      type: Number,
      required: false,
      default: null
    },
    isNIDVerified: {
      type: Boolean,
      default: false,
      default: null
    },
    dataOfBirth: {
      type: Date,
      required: false,
      default: null
    },

    oneTimeCode: {
      type: String,
      required: false,
      default: null
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isResetPassword: {
      type: Boolean,
      default: false,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    fcmToken: { // onlly use for firebase push notification / mobile focus*
      type: String,
      required: false,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },

    securitySettings: {
      recoveryEmail: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        default: null,
      },
      recoveryPhone: {
        type: String,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
        default: null,
      },
      securityQuestion: {
        type: String,
        trim: true,
        default: null,
      },
      securityAnswer: {
        type: String,
        required: function () {
          return !!this.securityQuestion;
        },
        set: (answer) => (answer ? require("crypto").createHash("sha256").update(answer).digest("hex") : null),
        select: false,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};
userSchema.statics.isPhoneNumberTaken = async function (
  phoneNumber,
  excludeUserId
) {
  const user = await this.findOne({ phoneNumber, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
