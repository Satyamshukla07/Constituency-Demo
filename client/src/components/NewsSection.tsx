
import React from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
  title: string;
  date: string;
  content: string;
  type: 'speech' | 'press';
}

const newsItems: NewsItem[] = [
  {
    title: "Address at Magathane Development Summit",
    date: "2024-03-15",
    content: "Outlined the comprehensive development plan for Magathane constituency...",
    type: "speech"
  },
  {
    title: "Infrastructure Development Press Release",
    date: "2024-03-10",
    content: "Announced new infrastructure projects worth ₹100 crore for Magathane...",
    type: "press"
  }
];

export default function NewsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">News & Updates</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <span className={`inline-block px-3 py-1 rounded text-sm mb-3 ${
                item.type === 'speech' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {item.type === 'speech' ? 'Speech' : 'Press Release'}
              </span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.date}</p>
              <p className="text-gray-700">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
