import type { Message, ChatResponse } from '../../types/chat';
import { services } from '../../data/services';
import { TIME_SLOTS } from '../../lib/constants';

const FAQ_RESPONSES: Record<string, ChatResponse> = {
  book: {
    content: 'I can help you book an appointment. Which service are you interested in?',
    quickReplies: services.map(service => ({
      label: service.name,
      value: `service_${service.id}`
    }))
  },
  billing: {
    content: 'What would you like to know about billing?',
    quickReplies: [
      { label: 'Payment Methods', value: 'payment_methods' },
      { label: 'Insurance', value: 'insurance' },
      { label: 'Pricing', value: 'pricing' }
    ]
  },
  services: {
    content: 'Here are our available services:',
    quickReplies: [
      ...services.map(service => ({
        label: `${service.name} ($${service.price})`,
        value: `service_info_${service.id}`
      })),
      { label: 'View All Services', value: 'all_services' }
    ]
  }
};

export async function processMessage(input: string): Promise<Message> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if it's a quick reply value
  if (FAQ_RESPONSES[input]) {
    return {
      type: 'bot',
      ...FAQ_RESPONSES[input]
    };
  }

  // Handle service selection
  if (input.startsWith('service_')) {
    const serviceId = input.split('_')[1];
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
      return {
        type: 'bot',
        content: `Great choice! When would you like to book your ${service.name}?`,
        quickReplies: TIME_SLOTS.map(time => ({
          label: time,
          value: `time_${serviceId}_${time}`
        }))
      };
    }
  }

  // Handle service info requests
  if (input.startsWith('service_info_')) {
    const serviceId = input.split('_')[2];
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
      return {
        type: 'bot',
        content: `${service.name} (${service.duration} min) - $${service.price}\n\n${service.description}`,
        quickReplies: [
          { label: 'Book Now', value: `service_${service.id}` },
          { label: 'View Other Services', value: 'services' }
        ]
      };
    }
  }

  // Default response
  return {
    type: 'bot',
    content: "I'm not sure I understand. How can I help you?",
    quickReplies: [
      { label: 'Book Appointment', value: 'book' },
      { label: 'Billing Question', value: 'billing' },
      { label: 'Services Info', value: 'services' }
    ]
  };
}