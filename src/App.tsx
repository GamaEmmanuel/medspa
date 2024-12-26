import React, { useState, useRef } from 'react';
import { Sparkles, ChevronRight, Star, Shield, Clock, Users } from 'lucide-react';
import { services } from './data/services';
import { ServiceCard } from './components/ServiceCard';
import { BookingForm } from './components/BookingForm';
import { StaffPortal } from './pages/StaffPortal';
import { ChatBot } from './components/chat/ChatBot';
import type { Service } from './types';

function App() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isStaffPortal, setIsStaffPortal] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);

  const handleBookingSubmit = (formData: any) => {
    console.log('Booking submitted:', formData);
    alert('Booking confirmed! We will send you a confirmation email shortly.');
    setSelectedService(null);
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isStaffPortal) {
    return <StaffPortal />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=2070"
            alt="Spa background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-white" />
                <h1 className="ml-2 text-2xl font-bold text-white">Serenity MedSpa</h1>
              </div>
              <button
                onClick={() => setIsStaffPortal(true)}
                className="text-sm text-white hover:text-gray-200"
              >
                Staff Portal
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Your Journey to Radiant Beauty
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Experience luxury treatments and cutting-edge technology for your ultimate wellness journey.
              </p>
              <button
                onClick={scrollToServices}
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white text-lg font-medium rounded-full hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105"
              >
                Book Your Experience <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        {/* ... Features section content remains the same ... */}
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated treatments designed to enhance your natural beauty
              and promote overall wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}

      {selectedService && (
        <BookingForm
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSubmit={handleBookingSubmit}
        />
      )}
      
      <ChatBot />
    </div>
  );
}

export default App;