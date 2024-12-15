"use server";
import { defaultSession, sessionOptions } from "./lib";
import bcrypt from "bcryptjs";
import prisma from "./connection";
import sendEmail from "@/services/sendEmail";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";

function generateToken(length) {
  let result = "";
  const charactorLength = process.env.NEXT_PUBLIC_CHARACTERS.length;

  for (let i = 0; i < length; i++) {
    result += process.env.NEXT_PUBLIC_CHARACTERS.charAt(
      Math.floor(Math.random() * charactorLength)
    );
  }

  return result;
}

let token = generateToken(32);

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

let hashedPassword;

// Register a new user
// Register a new user
export const register = async (formData, image) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma?.user?.findUnique({
    where: { email },
  });

  if (user && user.emailVerified) {
    return { error: "User already exists!" };
  }

  // Ensure role is set to 'USER' for new users
  const newUser = await prisma?.user.upsert({
    where: { email },
    create: {
      name,
      email,
      password: hashedPassword,
      token,
      image,
      role: 'USER', 
    },
    update: { token },
  });

  if (newUser) {
    await sendEmail(
      newUser.email,
      "Email Verification",
      `<p>Welcome to Nelen Ecommerce store, this is your email verification token. Click here to verify your email! http://localhost:3000/verify/${token}</p>`
    );
    return { message: "Verify your email" };
  } else {
    return { error: "Something went wrong" };
  }
};

// Verify the email using the token
export const emailVerify = async (getToken) => {
  if (getToken) {
    const getUser = await prisma?.user?.findUnique({
      where: {
        token: getToken,
      },
    });

    if (getUser) {
      const user = await prisma?.user?.update({
        where: { id: getUser.id },
        data: { emailVerified: true },
      });
      if (user) {
        redirect("/login");
      }
    } else {
      return {
        error: "Token expired",
      };
    }
  }
};

// Login function
export const login = async (formData) => {
  const session = await getSession();
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Sorry, this user does not exist" };
  }

  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    return { error: "Password does not match" };
  }

  session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role, // Include the role here
  };
  session.isLoggedIn = true;

  await session.save();

  redirect("/"); // Redirect after login
};

// Delete a function
export const deleteFunction = async ({ id, table }) => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return { Error: "User not logged in!" };
  }

  let item;
  try {
    item = await prisma[table].delete({
      where: { id },
    });
  } catch (error) {
    if (!item) {
      return { error: `${table} not deleted!` };
    }
  }

  // Revalidate the cache after deletion
  revalidatePath(`/dashboard/${table == "category" ? "categories" : `${table}`}s`);
  return { result: item };
};

// Logout function to destroy the session
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login"); 
};
