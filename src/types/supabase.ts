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
      services: {
        Row: {
          id: string
          name: string
          duration: number
          price: number
          description: string
          image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          duration: number
          price: number
          description: string
          image: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          duration?: number
          price?: number
          description?: string
          image?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}