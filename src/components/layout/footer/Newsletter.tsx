import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Newsletter = () => (
  <div className="space-y-4">
    <h3 className="font-bold text-lg font-montserrat">Newsletter</h3>
    <div className="space-y-3">
      <div className="relative">
        <Input
          type="email"
          placeholder="Enter your email"
          className="bg-transparent border-primary-foreground/20 placeholder:text-primary-foreground/50 focus:border-accent font-open-sans"
        />
        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/50" />
      </div>
      <Button variant="outline" className="w-full hover:bg-accent hover:text-white font-open-sans">
        Subscribe
      </Button>
    </div>
  </div>
);