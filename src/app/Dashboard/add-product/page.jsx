import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddProductForm from "./AddProductForm";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login"); // redirect unauthenticated users
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
