import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Book, Globe, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground">About</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-7xl font-light text-muted-foreground mb-4">2024 →</h2>
          <h1 className="text-4xl font-bold mb-6">We share knowledge with the world</h1>
          <p className="text-muted-foreground mb-8">
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Nunc tempor at magna a aliquam. Donec non ipsum nec risus sagittis nec risus.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/placeholder.svg?height=300&width=250"
            alt="Team member 1"
            className="rounded-lg object-cover h-full w-full"
          />
          <img
            src="/placeholder.svg?height=300&width=250"
            alt="Team member 2"
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
      </section>

      {/* Trusted Platforms Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-xl font-semibold mb-6">Trusted Platforms We Rely On</h3>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          We use trusted partners to share our content, ensuring that we can deliver comprehensive guidance and practical skills.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {['YouTube', 'Google', 'Medium', 'OpenAI'].map((platform) => (
            <div key={platform} className="h-12 bg-muted rounded flex items-center justify-center">
              {platform}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Wix', 'Fiverr', 'Upwork', 'Coursera'].map((platform) => (
            <div key={platform} className="h-12 bg-muted rounded flex items-center justify-center">
              {platform}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <Users className="w-8 h-8 mx-auto mb-4 text-orange-500" />
          <div className="text-2xl font-bold">671k</div>
          <div className="text-sm text-muted-foreground">Students</div>
        </div>
        <div className="text-center">
          <Book className="w-8 h-8 mx-auto mb-4 text-blue-500" />
          <div className="text-2xl font-bold">26k</div>
          <div className="text-sm text-muted-foreground">Certified Students</div>
        </div>
        <div className="text-center">
          <Globe className="w-8 h-8 mx-auto mb-4 text-green-500" />
          <div className="text-2xl font-bold">72</div>
          <div className="text-sm text-muted-foreground">Country Language</div>
        </div>
        <div className="text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-4 text-purple-500" />
          <div className="text-2xl font-bold">99.9%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/placeholder.svg?height=400&width=500"
            alt="Team collaboration"
            className="rounded-lg"
          />
          <div>
            <div className="text-orange-500 font-medium mb-4">OUR ONE BILLION MISSION</div>
            <h2 className="text-3xl font-bold mb-6">
              Our one billion mission sounds bold, We agree.
            </h2>
            <p className="text-muted-foreground">
              "We started with our ambition with the idea thinking big could often be simpler than we created then—Gilbert Brooks. Institutions are due to change, but we're also doing good work and shouldn't. Working up to the current goal was a good idea and shouldn't. Working up to the goal was the safe, clear and begin with that," Gilbert Brooks.
            </p>
          </div>
        </div>
      </section>

      {/* Since 2024 Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="text-orange-500 font-medium mb-4">OUR GALLERY</div>
          <h2 className="text-3xl font-bold mb-4">Since 2024...</h2>
          <p className="text-muted-foreground max-w-2xl">
            Fusce dictum leo augue, ut amet tempus nec commodo in. Aliquam ac lorem quis dolor venenatis tempor. Sed sed nunc lorem. Curabitur in augue ligula. Praesent justo elit.
          </p>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600">
            Join Our Team <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <img
              key={i}
              src={`/placeholder.svg?height=${200 + (i % 2) * 100}&width=${250}`}
              alt={`Gallery image ${i + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

