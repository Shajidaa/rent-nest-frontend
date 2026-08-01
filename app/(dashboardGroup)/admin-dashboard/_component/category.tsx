"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCategory } from "../_actions/createCategory";
import { toast } from "sonner";


export default function CategoryForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateName = (value: string) => {
    if (value.length < 2) {
      setNameError("Category name must be at least 2 characters.");
      return false;
    }
    setNameError("");
    return true;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!validateName(name)) {
      return;
    }

    if (description.length > 250) {
      setError("Description cannot exceed 250 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await createCategory(name, description);

      if (res.success) {
        setName("");
        setDescription("");
        router.refresh();
        toast.success(`The category "${name}" has been created.`);
      } else {
        setError(res.message || "Failed to create category");
      }
    } catch (err) {
      setError("An error occurred while creating the category");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g. Electronics"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) validateName(e.target.value);
              }}
              onBlur={(e) => validateName(e.target.value)}
              disabled={isLoading}
            />
            {nameError && (
              <p className="text-sm text-destructive">{nameError}</p>
            )}
            <p className="text-sm text-muted-foreground">
              This is the name of your property category.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-muted-foreground">(optional)</span></Label>
            <Textarea
              id="description"
              placeholder="Brief description of the category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Optional details about what belongs in this category. ({description.length}/250)
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
