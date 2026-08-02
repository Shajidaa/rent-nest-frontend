import { fetchCategories } from "../../_action/getCategory";
import { Button } from "@/components/ui/button";
import { Home, Building2, Briefcase } from "lucide-react";
import Link from "next/link";


const getCategoryIcon = (slug: string) => {
  switch (slug.toLowerCase()) {
    case "apartment":
    case "home":
      return <Home className="w-4 h-4 mr-2" />;
    case "office":
      return <Building2 className="w-4 h-4 mr-2" />;
    default:
      return <Briefcase className="w-4 h-4 mr-2" />;
  }
};

export default async function Category() {
  const categories = await fetchCategories();


  return (
    <div className="flex justify-center items-center gap-3 overflow-x-auto py-4">
      {categories.categories.map((category: { id: string; name: string; slug: string }) => (
        <Link key={category.id} href={`/properties?category=${category.slug}`}>
          <Button
            variant="outline"
            className="rounded-full px-6 py-2 h-auto text-sm font-medium border-slate-200 hover:bg-slate-50 hover:text-primary transition-all shadow-sm"
          >
            {getCategoryIcon(category.slug)}
            {category.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}