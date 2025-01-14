import { FilterForm } from "@/components/filters/FilterForm";
import { FilterSheet } from "@/components/filters/FilterSheet";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Clock } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();

  const announcements = [
    {
      id: 1,
      title: "Modern Office Space",
      description: "Prime location in downtown area with modern amenities",
      category: "Architecture & Design",
      subcategory: "Interior Design",
      subsubcategory: "Commercial",
      location: "New York, USA",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Sustainable Farm Equipment",
      description: "High-efficiency farming machinery for organic cultivation",
      category: "Agriculture",
      subcategory: "Farming",
      subsubcategory: "Organic",
      location: "California, USA",
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Medical Laboratory Setup",
      description: "Complete laboratory equipment for medical research",
      category: "Medical",
      subcategory: "Laboratory",
      subsubcategory: "Research",
      location: "Boston, USA",
      date: "3 days ago",
    },
    {
      id: 4,
      title: "Industrial Warehouse Design",
      description: "Modern warehouse design with optimal space utilization",
      category: "Architecture & Design",
      subcategory: "Interior Design",
      subsubcategory: "Industrial",
      location: "Chicago, USA",
      date: "5 days ago",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      
      <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
            {t.filters.title}
          </h2>
          
          {/* Desktop Filters */}
          <div className="hidden md:block bg-white rounded-lg shadow-md p-6 mb-8">
            <FilterForm />
          </div>

          {/* Mobile Sheet */}
          <FilterSheet />

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{announcement.title}</CardTitle>
                  <CardDescription>{announcement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-[#B08A38] text-white hover:bg-[#B08A38]/90">
                      {announcement.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {announcement.location}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {announcement.date}
                  </div>
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    {announcement.subcategory}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;