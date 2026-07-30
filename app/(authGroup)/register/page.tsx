
import Link from "next/link";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "../_component/RegisterForm";



export default function RegisterPage() {


  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
      <Card className="w-full max-w-md shadow-lg border-emerald-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-emerald-900">
            Register to RentNest 
          </CardTitle>
          <CardDescription className="text-slate-500">
            Provide your details to create a new Tenant account
          </CardDescription>
        </CardHeader>
        
    <RegisterForm/>

        <CardFooter className="flex justify-center border-t border-slate-100 py-4">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-emerald-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}