import { fetchCategories } from "../../_action/getCategory";
import { Button } from "@/components/ui/button";
import { Home, Building2, Briefcase, ShoppingBag, House } from "lucide-react";
import Link from "next/link";

const getCategoryIcon = (slug: string) => {
    switch (slug.toLowerCase()) {
        case "apartment":
        case "home":
            return <Home className="w-4 h-4 mr-2" />;
        case "office":
            return <Building2 className="w-4 h-4 mr-2" />;
        case "shop":
            return <ShoppingBag className="w-4 h-4 mr-2" />;
        case "hostel":
            return <House className="w-4 h-4 mr-2" />;
        default:
            return <Briefcase className="w-4 h-4 mr-2" />;
    }
};

export default async function CategoryPills({ activeSlug }: { activeSlug?: string }) {
    const res = await fetchCategories();
    const categories: { id: string; name: string; slug: string }[] = res?.categories ?? [];

    return (
        <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
            <Link href="/properties">
                <Button
                    variant={!activeSlug ? "default" : "outline"}
                    className="rounded-full px-5 py-2 h-auto text-sm font-medium shrink-0"
                >
                    All
                </Button>
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/properties?category=${category.slug}`}
                >
                    <Button
                        variant={activeSlug === category.slug ? "default" : "outline"}
                        className="rounded-full px-5 py-2 h-auto text-sm font-medium shrink-0 border-slate-200 hover:text-primary transition-all shadow-sm"
                    >
                        {getCategoryIcon(category.slug)}
                        {category.name}
                    </Button>
                </Link>
            ))}
        </div>
    );
}
