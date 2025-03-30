import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "El apellido es requerido"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    role: {
      type: String,
      enum: ["teacher", "coordinator", "administrator"],
      default: "teacher",
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    googleProfileImage: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    }
  },
  {
    timestamps: true,
  }
);

// Virtual para obtener el nombre completo
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
