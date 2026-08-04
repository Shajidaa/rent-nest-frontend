/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string | undefined) => {
  if (!secret) {
    console.error("Token verification failed: Secret is undefined!");
    return {
      success: false,
      error: "Secret key is missing",
    };
  }

  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error: any) {
    if (error?.message === "NEXT_REDIRECT") throw error;

    // Handle connection drops specifically
    if (error.code === "ECONNRESET" || error.code === "ECONNREFUSED") {
      console.error(
        "Backend connection refused or reset. Is the backend server running?",
      );
      return {
        success: false,
        message:
          "Unable to connect to the authentication server. Please try again later.",
      };
    }

    // console.log("Token verification failed:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
