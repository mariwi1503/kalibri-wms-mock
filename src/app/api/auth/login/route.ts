// import sql from "@/app/api/utils/sql";
import { demoUsers } from "@/constant/users";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user by email
    const user = demoUsers.find(x => x.email === email)

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (password !== user.password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    return Response.json({
      user,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}