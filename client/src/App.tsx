import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowDown,
  ChevronRight
} from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaWhatsapp, FaFlag, FaHeart } from "react-icons/fa";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import EventsPage from "@/pages/events-page";
import IssuesPage from "@/pages/issues-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { Navbar } from "@/components/layout/navbar";


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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FF9933]/20 via-white/50 to-[#138808]/20">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-10"
            >
              <div className="flex flex-col items-center justify-center mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="relative mb-8"
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#FF9933] shadow-xl">
                    <img 
                      src="/assets/profile.jpeg"
                      alt="Lalit Shukla"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x400/FF9933/white?text=LS";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-4 right-0 transform translate-x-1/4">
                    <FaFlag className="w-16 h-16 text-[#FF9933]" />
                  </div>
                </motion.div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Lalit Shukla
              </h1>
              <p className="text-2xl text-[#FF9933] font-semibold mb-8">
                General Secretary, Magathane Vidhansabha
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Dedicated BJP leader working towards the development and prosperity of Magathane constituency
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-xl mb-12 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-[#FF9933] mb-4">Recent Highlight</h3>
                <div className="flex items-center gap-6">
                  <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="/assets/pm-meeting.jpeg" 
                      alt="Meeting with PM Modi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Special Meeting with PM Narendra Modi</h4>
                    <p className="text-gray-600">Honored to meet Hon'ble Prime Minister Shri Narendra Modi ji and discuss the development initiatives for Magathane constituency. Together we are working towards a stronger and more prosperous Mumbai.</p>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-[#FF9933] hover:bg-[#FF9933]/90 shadow-lg transform hover:scale-105 transition-all">
                <Link href="#contact">
                  <span className="flex items-center">
                    Connect With Me
                    <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-2xl opacity-20">
            <div className="w-96 h-96 rounded-full bg-[#FF9933]" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-2xl opacity-20">
            <div className="w-96 h-96 rounded-full bg-[#138808]" />
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

        {/* Posts Section */}
        <div className="py-24 bg-white/50" id="posts">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Activities
              </h2>
              <p className="text-lg text-gray-600">
                Dedicated service to our community and constituency
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to a local placeholder if the image fails to load
                        e.currentTarget.src = "https://placehold.co/600x400/FF9933/white?text=Activity";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.location}</span>
                    </div>
                  </div>
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

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="hover:text-[#FF9933] transition-colors">About Me</a></li>
                  <li><a href="#achievements" className="hover:text-[#FF9933] transition-colors">Achievements</a></li>
                  <li><a href="#posts" className="hover:text-[#FF9933] transition-colors">Recent Activities</a></li>
                  <li><a href="#contact" className="hover:text-[#FF9933] transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Constituency</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Ward Information</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Development Projects</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Citizen Services</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Report Issues</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">BJP Resources</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.bjp.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9933] transition-colors">BJP Official Website</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Party Membership</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Vision Document</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Press Releases</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4 mb-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                    className="text-white hover:text-[#FF9933] transition-colors">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                    className="text-white hover:text-[#FF9933] transition-colors">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="text-white hover:text-[#FF9933] transition-colors">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer"
                    className="text-white hover:text-[#FF9933] transition-colors">
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-sm text-gray-400">
                  Subscribe to our newsletter for updates
                </p>
                <div className="mt-2 flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#FF9933]"
                  />
                  <button className="px-4 py-2 bg-[#FF9933] text-white rounded-r-md hover:bg-[#FF9933]/90 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-400">
                  © 2025 Lalit Shukla. All rights reserved.
                </p>
                <div className="flex items-center mt-4 md:mt-0">
                  <span className="text-sm text-gray-400 flex items-center">
                    Made with <FaHeart className="w-4 h-4 text-[#FF9933] mx-1" /> for the people of Magathane
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>

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

const posts = [
  {
    title: "विकास यात्रा - Development Journey",
    description: "Inaugurating new road development project in Magathane, enhancing connectivity for our residents. भाजपा के विकास के एजेंडे को आगे बढ़ाते हुए।",
    imageUrl: "https://images.unsplash.com/photo-1533773984958-b816551a3f98?w=600&auto=format&fit=crop&q=80",
    date: "March 10, 2025",
    location: "Magathane East"
  },
  {
    title: "जन संवाद - Public Dialogue",
    description: "Monthly public meeting with residents, addressing community concerns and sharing progress updates. जनता की आवाज, हमारी प्राथमिकता।",
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80",
    date: "March 5, 2025",
    location: "Ward Community Hall"
  },
  {
    title: "स्वच्छ भारत अभियान",
    description: "Leading cleanliness drive with BJP karyakartas, making our constituency cleaner and greener. स्वच्छ भारत, स्वस्थ भारत।",
    imageUrl: "https://images.unsplash.com/photo-1618477202872-8e4026202244?w=600&auto=format&fit=crop&q=80",
    date: "March 1, 2025",
    location: "Magathane West"
  },
  {
    title: "शिक्षा सशक्तिकरण - Education Empowerment",
    description: "Distributing educational materials to underprivileged students. भविष्य की नींव, शिक्षा के साथ।",
    imageUrl: "https://placehold.co/600x400/FF9933/white?text=Education+Initiative",
    date: "February 28, 2025",
    location: "Magathane School Complex"
  },
  {
    title: "स्वास्थ्य शिविर - Health Camp",
    description: "Free health checkup camp organized for senior citizens. स्वस्थ समाज, सशक्त समाज।",
    imageUrl: "https://placehold.co/600x400/FF9933/white?text=Health+Camp",
    date: "February 25, 2025",
    location: "Community Center"
  },
  {
    title: "भाजपा कार्यकर्ता सम्मेलन",
    description: "Meeting with BJP workers to discuss party initiatives and future plans. संगठन की मजबूती, विकास की गारंटी।",
    imageUrl: "https://placehold.co/600x400/FF9933/white?text=BJP+Workers+Meet",
    date: "February 20, 2025",
    location: "BJP Office Magathane"
  }
];

export default App;