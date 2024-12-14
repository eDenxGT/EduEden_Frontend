import { Search } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tutors = [
  {
    id: 1,
    name: "Wade Warren",
    role: "Digital Product Designer",
    rating: 5.0,
    students: "236,568",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Bessie Cooper",
    role: "Senior Developer",
    rating: 4.9,
    students: "211,434",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "UI/UX Designer",
    rating: 4.8,
    students: "435,671",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "Ronald Richards",
    role: "Lead Developer",
    rating: 4.5,
    students: "1,356,236",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    name: "Devon Lane",
    role: "Senior Developer",
    rating: 4.8,
    students: "854",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    name: "Robert Fox",
    role: "UI/UX Designer",
    rating: 4.2,
    students: "197,637",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 7,
    name: "Kathryn Murphy",
    role: "Adobe Instructor",
    rating: 4.8,
    students: "197,637",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 8,
    name: "Jerome Bell",
    role: "Adobe Instructor",
    rating: 4.4,
    students: "2,711",
    image: "/placeholder.svg?height=400&width=400",
  },
];

export default function  AllTutorListing() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-6">All Instructors (241)</h1>
        
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="text-sm text-muted-foreground mb-2 block">
              Search:
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search in your teachers..."
                className="pl-9"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Courses:
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Teacher:
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Teachers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                <SelectItem value="design">Design Teachers</SelectItem>
                <SelectItem value="development">Development Teachers</SelectItem>
                <SelectItem value="marketing">Marketing Teachers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutors.map((tutor) => (
          <Card key={tutor.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{tutor.name}</h3>
              <p className="text-muted-foreground text-sm">{tutor.role}</p>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-medium">{tutor.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  {tutor.students} students
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                className="w-full hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
              >
                Send Message
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

