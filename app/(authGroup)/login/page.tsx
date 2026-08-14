import React from "react";
import LoginForm from "../_component/LoginForm";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BorderBeam } from "@/components/ui/border-beam";


export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
            <div className="relative w-full max-w-md"> 
          <Card className="w-full relative  overflow-hidden shadow-lg border-emerald-100">
  <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-emerald-900">
            Welcome to RentNest
          </CardTitle>
          <CardDescription className="text-slate-500">
         Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <LoginForm />
            <CardFooter className="flex justify-center border-t border-slate-100 py-4">
          <p className="text-sm text-slate-600">
            Don&rsquo;t have an account?
            <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
             Register
            </Link>
          </p>
        </CardFooter>
              <BorderBeam
                duration={8}
                size={100}
                
                className="from-transparent via-green-500 to-transparent"
              />
          </Card>
         </div>
      </div>
    </main>
  );
}