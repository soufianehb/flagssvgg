
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/lib/i18n";

interface Category {
  id: string;
  slug: string;
  name: string;
  language: string;
}

interface Subcategory {
  id: string;
  slug: string;
  category_id: string;
  name: string;
  language: string;
}

interface SubSubcategory {
  id: string;
  slug: string;
  subcategory_id: string;
  name: string;
  language: string;
}

interface UseCategoriesReturn {
  categories: Category[];
  subcategories: Record<string, Subcategory[]>;
  subSubcategories: Record<string, SubSubcategory[]>;
  isLoading: boolean;
  error: Error | null;
}

export const useCategories = (): UseCategoriesReturn => {
  const { language } = useTranslation();

  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          slug,
          category_translations!inner(
            name,
            language
          )
        `)
        .eq('is_active', true)
        .eq('category_translations.language', language)
        .order('sort_order');

      if (error) throw error;
      return data.map(category => ({
        id: category.id,
        slug: category.slug,
        name: category.category_translations[0].name,
        language: category.category_translations[0].language
      }));
    }
  });

  const { data: subcategories = [], isLoading: isSubcategoriesLoading, error: subcategoriesError } = useQuery({
    queryKey: ['subcategories', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subcategories')
        .select(`
          id,
          slug,
          category_id,
          subcategory_translations!inner(
            name,
            language
          )
        `)
        .eq('is_active', true)
        .eq('subcategory_translations.language', language)
        .order('sort_order');

      if (error) throw error;
      return data.map(subcategory => ({
        id: subcategory.id,
        slug: subcategory.slug,
        category_id: subcategory.category_id,
        name: subcategory.subcategory_translations[0].name,
        language: subcategory.subcategory_translations[0].language
      }));
    }
  });

  const { data: subSubcategories = [], isLoading: isSubSubcategoriesLoading, error: subSubcategoriesError } = useQuery({
    queryKey: ['sub_subcategories', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sub_subcategories')
        .select(`
          id,
          slug,
          subcategory_id,
          sub_subcategory_translations!inner(
            name,
            language
          )
        `)
        .eq('is_active', true)
        .eq('sub_subcategory_translations.language', language)
        .order('sort_order');

      if (error) throw error;
      return data.map(subSubcategory => ({
        id: subSubcategory.id,
        slug: subSubcategory.slug,
        subcategory_id: subSubcategory.subcategory_id,
        name: subSubcategory.sub_subcategory_translations[0].name,
        language: subSubcategory.sub_subcategory_translations[0].language
      }));
    }
  });

  const isLoading = isCategoriesLoading || isSubcategoriesLoading || isSubSubcategoriesLoading;
  const error = categoriesError || subcategoriesError || subSubcategoriesError;

  const subcategoriesByCategory = subcategories.reduce((acc, subcategory) => {
    if (!acc[subcategory.category_id]) {
      acc[subcategory.category_id] = [];
    }
    acc[subcategory.category_id].push(subcategory);
    return acc;
  }, {} as Record<string, Subcategory[]>);

  const subSubcategoriesBySubcategory = subSubcategories.reduce((acc, subSubcategory) => {
    if (!acc[subSubcategory.subcategory_id]) {
      acc[subSubcategory.subcategory_id] = [];
    }
    acc[subSubcategory.subcategory_id].push(subSubcategory);
    return acc;
  }, {} as Record<string, SubSubcategory[]>);

  return {
    categories,
    subcategories: subcategoriesByCategory,
    subSubcategories: subSubcategoriesBySubcategory,
    isLoading,
    error: error as Error | null
  };
};
