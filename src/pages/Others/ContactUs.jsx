import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('help.eduguard@gmail.com');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground">Contact</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">Connect with us</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Want to chat? We'd love to hear from you! Get in touch with our Customer Success Team to inquire about speaking events, advertising rates, or just say hello.
            </p>
            <Button 
              variant="default" 
              onClick={handleCopyEmail}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Email
            </Button>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Customer service representative"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div>
            <p className="text-muted-foreground mb-8">
              Will you be in Los Angeles or any other branches any time soon? Stop by the office! We'd love to meet.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="text-orange-500 font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  ADDRESS
                </div>
                <p className="text-muted-foreground">
                  1702 Olympic Boulevard<br />
                  Santa Monica, CA 90404
                </p>
              </div>

              <div>
                <div className="text-orange-500 font-medium mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  PHONE NUMBER
                </div>
                <p className="text-muted-foreground">
                  (480) 555-0103<br />
                  (219) 555-0114
                </p>
              </div>

              <div>
                <div className="text-orange-500 font-medium mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  EMAIL ADDRESS
                </div>
                <p className="text-muted-foreground">
                  help.eduguard@gmail.com<br />
                  career.eduguard@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Get In touch</h3>
              <p className="text-muted-foreground">
                Feel free contact with us, we love to make new partners & friends
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="First name"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Last name"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  placeholder="Message Subject"
                  className="w-full"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Message"
                  className="w-full min-h-[120px]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

