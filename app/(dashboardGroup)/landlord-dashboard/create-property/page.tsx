import { KeyRound } from "lucide-react";
import { CreatePropertyForm } from "../_component/CreatePropertyForm";
import { getCategories } from "../../admin-dashboard/_actions/adminAction";




export default async function CreatePropertyPage() {
  const categories = await getCategories();


  return (
    <div className="min-h-screen bg-background text-[#1C1C1A] p-6 md:p-10">
      <div className=" mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-9 w-9 rounded-lg bg-[#0B4F4A] flex items-center justify-center">
            <KeyRound className="h-4.5 w-4.5 text-white" size={18} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Add a new property
          </h1>
        </div>
        <p className="text-sm text-neutral-500 mb-8 ml-12">
          Fill in the details below. You can save as a draft and publish later.
        </p>
        <CreatePropertyForm categories={categories} />
      </div>
    </div>
  );
}
