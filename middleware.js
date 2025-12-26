// middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
    const { cookies, nextUrl } = req;
    const pathname = nextUrl.pathname;

    const userDataCookie = cookies.get("userData");
    const adminDataCookie = cookies.get("adminData");

    let parsedUser = null;
    if (userDataCookie?.value) {
        try {
            parsedUser = JSON.parse(userDataCookie.value);
        } catch {
            // corrupted cookie
            parsedUser = null;
        }
    }

    let parsedAdminData = null;
    if (adminDataCookie?.value) {
        try {
            parsedAdminData = JSON.parse(adminDataCookie.value);
        } catch {
            // corrupted cookie
            parsedAdminData = null;
        }
    }

    // Define your public/guest pages
    const guestPages = ["/", "/login", "/password", "/choose-plan", "/forget-password", "/new-password", "/otp-verify", "/plan-details", "/credit"];
    const adminGuestPage = ["/admin/login"];

    // Define protected pages (optional, middleware matcher can also control this)
    const protectedPages = ["/home", "/account", "/discover", "/movie-detail", "/movies", "/tv-shows", "/video", "/watch-list"];
    const adminProtectedPages = [
        "/admin/dashboard",
        "/admin/dashboard/banner-content",
        "/admin/dashboard/discovery-management",
        "/admin/dashboard/genre-category",
        "/admin/dashboard/movies",
        "/admin/dashboard/tv-shows"
    ]

    // For Public Pages

    // Guest pages logic
    if (guestPages.includes(pathname)) {
        if (parsedUser?.subscription_id) {
            // Logged-in user with subscription shouldn't visit guest pages
            return NextResponse.redirect(new URL("/home", req.url));
        }
        // Allow guests or logged-in users without subscription
        return NextResponse.next();
    }

    // Protected pages logic
    if (protectedPages.some((p) => pathname.startsWith(p))) {
        if (!parsedUser) {
            // Not logged in
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (!parsedUser.subscription_id) {
            // Logged in but no subscription
            return NextResponse.redirect(new URL("/choose-plan", req.url));
        }
        // Logged in with subscription, allow access
        return NextResponse.next();
    }
    // For Public Pages

    // For admin Pages

    if (adminGuestPage.includes(pathname)) {
        if (parsedAdminData) {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        return NextResponse.next();
    }

    if (adminProtectedPages.some((p) => pathname.startsWith(p))) {
        if (!parsedAdminData) {
            // Not logged in
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        return NextResponse.next();
    }
    // For admin Pages

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/password",
        "/choose-plan",
        "/forget-password",
        "/new-password",
        "/otp-verify",
        "/plan-details",
        "/credit",
        "/home",
        "/account",
        "/discover",
        "/movie-detail/:path*",
        "/movies",
        "/tv-shows",
        "/video/:path*",
        "/watch-list",
        "/admin/login",
        "/admin/dashboard/:path*",
    ],
};
