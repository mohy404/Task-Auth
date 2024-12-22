
"use client"
import ProtectedRoute from "@/src/ProtectedRoute";
import UserForm from "./UserForm";

export default function DashboardPage() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <UserForm />
    </div>
  
  );
}