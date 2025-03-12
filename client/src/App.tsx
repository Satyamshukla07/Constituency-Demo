import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import EventsPage from "@/pages/events-page";
import IssuesPage from "@/pages/issues-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Target,
  Sparkles,
  ArrowDown
} from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaWhatsapp, FaFlag } from "react-icons/fa";

function Router() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Switch>
        <ProtectedRoute path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/events" component={EventsPage} />
        <ProtectedRoute path="/issues" component={IssuesPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#FF9933]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center items-center mb-8">
                <FaFlag className="w-24 h-24 text-[#FF9933]" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Lalit Shukla
              </h1>
              <p className="text-2xl text-[#FF9933] font-semibold mb-8">
                General Secretary, Magathane Vidhansabha
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                Dedicated BJP leader working towards the development and prosperity of Magathane constituency
              </p>
              <Button asChild size="lg" className="bg-[#FF9933] hover:bg-[#FF9933]/90">
                <Link href="#contact">
                  <span className="flex items-center">
                    Connect With Me
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-24 bg-white/50" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About Me
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  As a dedicated BJP leader and General Secretary of Magathane Vidhansabha, I am committed to upholding our party's values and working towards the development of our community. Following Prime Minister Narendra Modi's vision of 'Sabka Saath, Sabka Vikas', I strive to ensure inclusive growth and development for all sections of society.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#FF9933]" />
                    <span>Community Leader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#FF9933]" />
                    <span>Vision Driven</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#FF9933]" />
                    <span>10+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF9933]" />
                    <span>BJP Core Member</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Key Focus Areas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#FF9933]" />
                      <span>Infrastructure Development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#FF9933]" />
                      <span>Education Initiatives</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#FF9933]" />
                      <span>Healthcare Access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#FF9933]" />
                      <span>Cultural Preservation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="py-24" id="achievements">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Achievements & Initiatives
              </h2>
              <p className="text-lg text-gray-600">
                Working towards BJP's vision of a developed and prosperous community
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-lg"
                >
                  <Award className="w-12 h-12 text-[#FF9933] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-24 bg-white/50" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                I'm here to listen to your concerns and work together for our community
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                <Phone className="w-8 h-8 text-[#FF9933] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+91 XXXXX XXXXX</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                <Mail className="w-8 h-8 text-[#FF9933] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">contact@lalitshukla.com</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                <MapPin className="w-8 h-8 text-[#FF9933] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Office</h3>
                <p className="text-gray-600">Magathane Vidhansabha Office</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-[#FF9933] hover:text-[#FF9933]/80 transition-colors">
                <FaTwitter className="w-8 h-8" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-[#FF9933] hover:text-[#FF9933]/80 transition-colors">
                <FaFacebook className="w-8 h-8" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-[#FF9933] hover:text-[#FF9933]/80 transition-colors">
                <FaInstagram className="w-8 h-8" />
              </a>
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer"
                className="text-[#FF9933] hover:text-[#FF9933]/80 transition-colors">
                <FaWhatsapp className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

const achievements = [
  {
    title: "Community Development",
    description: "Successfully implemented various BJP initiatives for infrastructure development and community welfare in Magathane.",
  },
  {
    title: "Youth Empowerment",
    description: "Launched skill development programs and created employment opportunities for local youth.",
  },
  {
    title: "Social Welfare",
    description: "Organized health camps and education support programs aligning with BJP's vision of inclusive growth.",
  },
];

export default App;