export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      staff: {
        Row: {
          id: string
          user_id: string
          name: string
          role: 'admin' | 'practitioner' | 'receptionist'
          specialties: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          role: 'admin' | 'practitioner' | 'receptionist'
          specialties?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          role?: 'admin' | 'practitioner' | 'receptionist'
          specialties?: string[] | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          duration: number
          price: number
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          duration: number
          price: number
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          duration?: number
          price?: number
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number | null
          gender: 'male' | 'female' | 'other' | null
          phone: string | null
          address_street: string | null
          address_city: string | null
          address_state: string | null
          address_zip: string | null
          medical_history: string | null
          preferences: string | null
          price_tier: 'standard' | 'preferred' | 'vip'
          marketing_preferences: 'email' | 'phone' | 'sms' | 'mail' | 'none'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age?: number | null
          gender?: 'male' | 'female' | 'other' | null
          phone?: string | null
          address_street?: string | null
          address_city?: string | null
          address_state?: string | null
          address_zip?: string | null
          medical_history?: string | null
          preferences?: string | null
          price_tier?: 'standard' | 'preferred' | 'vip'
          marketing_preferences?: 'email' | 'phone' | 'sms' | 'mail' | 'none'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age?: number | null
          gender?: 'male' | 'female' | 'other' | null
          phone?: string | null
          address_street?: string | null
          address_city?: string | null
          address_state?: string | null
          address_zip?: string | null
          medical_history?: string | null
          preferences?: string | null
          price_tier?: 'standard' | 'preferred' | 'vip'
          marketing_preferences?: 'email' | 'phone' | 'sms' | 'mail' | 'none'
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string
          service_id: string
          staff_id: string
          date: string
          time: string
          status: 'upcoming' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          service_id: string
          staff_id: string
          date: string
          time: string
          status: 'upcoming' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          service_id?: string
          staff_id?: string
          date?: string
          time?: string
          status?: 'upcoming' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          appointment_id: string
          amount: number
          payment_method: string
          status: 'completed' | 'refunded'
          created_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          amount: number
          payment_method: string
          status: 'completed' | 'refunded'
          created_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          amount?: number
          payment_method?: string
          status?: 'completed' | 'refunded'
          created_at?: string
        }
      }
    }
  }
}