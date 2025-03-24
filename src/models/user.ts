import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es requerido"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Por favor ingresa un correo electrónico válido",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      select: false,
    },
    role: {
      type: String,
      enum: ["teacher", "coordinator", "admin"],
      default: "teacher",
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
