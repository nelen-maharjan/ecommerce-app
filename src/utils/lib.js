export const sessionOptions = {
    password: process.env.NEXT_PUBLIC_SECRET_KEY,
    cookieName: "nelen-ecommerce",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
};

  
  export const defaultSession = {
    isLoggedIn: false,
  };