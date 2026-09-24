interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
    path: string;
    maxAge: number;
    domain?: string;
}

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: process.env.NODE_ENV === "local" ? "none" : "strict",
    path: "/",
    ...(process.env.NODE_ENV === "local" ? {  } : { domain: "email-sender.test" }),
    maxAge: 48 * 60 * 60 * 1000
};

export const csrfCookieOptions: CookieOptions = {
    httpOnly: false,
    secure: true,
    sameSite: process.env.NODE_ENV === "local" ? "strict" : "strict",
    path: "/",
    ...(process.env.NODE_ENV === "local" ? {  } : { domain: "email-sender.test" }),
    maxAge: 48 * 60 * 60 * 1000
};

