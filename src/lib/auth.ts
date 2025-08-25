import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { post } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/types/auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    phone?: string;
    isActive: boolean;
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      firstName: string;
      lastName: string;
      role: string;
      phone?: string | null;
      isActive: boolean;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: string;
    firstName: string;
    lastName: string;
    phone?: string;
    isActive: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginData: LoginRequest = {
            email: credentials.email,
            password: credentials.password,
          };

          const response: LoginResponse = await post<LoginResponse>(
            "/auth/login",
            loginData
          );

          if (response.accessToken && response.user) {
            return {
              id: response.user.id,
              email: response.user.email,
              name: `${response.user.firstName || ''} ${response.user.lastName}`,
              firstName: response.user.firstName || '',
              lastName: response.user.lastName,
              role: response.user.role.name,
              phone: response.user.phone,
              isActive: response.user.isActive,
              accessToken: response.accessToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sub && session.user) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
        session.user.role = token.role || "client";
        session.user.firstName = token.firstName || "";
        session.user.lastName = token.lastName || "";
        session.user.phone = token.phone || null;
        session.user.isActive = token.isActive || false;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
