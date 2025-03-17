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
import React, { useState, useEffect } from 'react';

// Placeholder components
const NewsSection = () => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Latest News & Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card hover:translate-y-[-4px]">
            <img src={`/assets/news-${item}.jpg`} alt="News" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Latest Development Update</h3>
              <p className="text-gray-600">Recent initiatives and community developments in our constituency.</p>
              <button className="mt-4 text-blue-600 hover:text-blue-800">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <div className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card hover:translate-y-[-4px] p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <h4 className="font-semibold">Community Member</h4>
                <p className="text-gray-500">Local Resident</p>
              </div>
            </div>
            <p className="text-gray-600">"Great initiatives for our community development and welfare."</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EventsCalendar = () => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card hover:translate-y-[-4px] p-6">
            <div className="mb-4">
              <span className="text-lg font-semibold">Community Meeting</span>
              <p className="text-gray-500">March 25, 2024</p>
            </div>
            <p className="text-gray-600 mb-4">Join us for an important community discussion.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              RSVP Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactSection = () => (
  <div className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <p className="flex items-center"><Phone className="mr-2" /> +91 1234567890</p>
            <p className="flex items-center"><Mail className="mr-2" /> contact@example.com</p>
            <p className="flex items-center"><MapPin className="mr-2" /> Office Address, City, State</p>
          </div>
          <div className="mt-8 flex space-x-4">
            <FaTwitter className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <FaFacebook className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
          </div>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-2 border rounded-lg"
          ></textarea>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);


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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white"> {/* Updated background */}
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#f0f0f0]/20 via-white/50 to-[#f0f0f0]/20 min-h-screen"> {/* Updated background */}
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
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-300 shadow-xl"> {/* Updated border color */}
                    <img
                      src="/assets/profile.jpeg"
                      alt="Lalit Shukla"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x400/gray-300/white?text=LS"; {/* Updated placeholder */}
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-4 right-0 transform translate-x-1/4">
                    <FaFlag className="w-16 h-16 text-gray-500" /> {/* Updated color */}
                  </div>
                </motion.div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Lalit Shukla
              </h1>
              <p className="text-2xl text-gray-700 font-semibold mb-8"> {/* Updated color */}
                General Secretary, Magathane Vidhansabha
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Dedicated BJP leader working towards the development and prosperity of Magathane constituency
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-700 transition-colors" {/* Updated button style */}
              >
                Join the Movement
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Recent Highlights */}
        <div className="py-16 bg-white/80">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Recent Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card hover:translate-y-[-4px]">
                  <img
                    src="/assets/posts/residential.jpeg"
                    alt="Community Service"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Supporting Our Community</h3>
                    <p className="text-gray-600">Dedicated to serving our residential community by actively addressing their concerns and needs.</p>
                  </div>
                </div>
                <div className="card hover:translate-y-[-4px]">
                  <img
                    src="/assets/posts/pm-meeting.jpeg"
                    alt="Meeting with PM Modi"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Meeting with PM Modi</h3>
                    <p className="text-gray-600">Discussing development initiatives for Magathane constituency with Hon'ble Prime Minister.</p>
                  </div>
                </div>
              </div>
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
                    <Users className="w-5 h-5 text-gray-700" /> {/* Updated color */}
                    <span>Community Leader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-gray-700" /> {/* Updated color */}
                    <span>Vision Driven</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-700" /> {/* Updated color */}
                    <span>10+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gray-700" /> {/* Updated color */}
                    <span>BJP Core Member</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="card hover:translate-y-[-4px] p-6 shadow-lg"> {/* Updated card style */}
                  <h3 className="text-xl font-semibold mb-4">Key Focus Areas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-700" /> {/* Updated color */}
                      <span>Infrastructure Development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-700" /> {/* Updated color */}
                      <span>Education Initiatives</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-700" /> {/* Updated color */}
                      <span>Healthcare Access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-700" /> {/* Updated color */}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                  className="card hover:translate-y-[-4px] p-6 shadow-lg"
                >
                  <Award className="w-12 h-12 text-gray-700 mb-4" /> {/* Updated color */}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                  className="card hover:translate-y-[-4px] shadow-lg"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to a local placeholder if the image fails to load
                        e.currentTarget.src = "https://placehold.co/600x400/gray-300/white?text=Activity"; {/*Updated placeholder*/}
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

        {/* Added Sections */}
        <NewsSection />
        <EventsCalendar />
        <TestimonialsSection />
        <ContactSection />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>© 2024 Lalit Shukla. All rights reserved.</p>
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
    imageUrl: "https://placehold.co/600x400/gray-300/white?text=Education+Initiative", {/*Updated placeholder*/}
    date: "February 28, 2025",
    location: "Magathane School Complex"
  },
  {
    title: "स्वास्थ्य शिविर - Health Camp",
    description: "Free health checkup camp organized for senior citizens. स्वस्थ समाज, सशक्त समाज।",
    imageUrl: "https://placehold.co/600x400/gray-300/white?text=Health+Camp", {/*Updated placeholder*/}
    date: "February 25, 2025",
    location: "Community Center"
  },
  {
    title: "भाजपा कार्यकर्ता सम्मेलन",
    description: "Meeting with BJP workers to discuss party initiatives and future plans. संगठन की मजबूती, विकास की गारंटी।",
    imageUrl: "https://placehold.co/600x400/gray-300/white?text=BJP+Workers+Meet", {/*Updated placeholder*/}
    date: "February 20, 2025",
    location: "BJP Office Magathane"
  }
];

export default App;