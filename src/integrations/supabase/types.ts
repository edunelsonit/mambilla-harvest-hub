export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      listings: {
        Row: {
          condition: string | null
          created_at: string | null
          farmer_id: string | null
          id: string
          notes: string | null
          price_per_unit: number
          product_id: string | null
          quantity: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          condition?: string | null
          created_at?: string | null
          farmer_id?: string | null
          id?: string
          notes?: string | null
          price_per_unit: number
          product_id?: string | null
          quantity: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          condition?: string | null
          created_at?: string | null
          farmer_id?: string | null
          id?: string
          notes?: string | null
          price_per_unit?: number
          product_id?: string | null
          quantity?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string | null
          id: string
          listing_id: string | null
          quantity: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          quantity: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          listing_id?: string | null
          quantity?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      payloads: {
        Row: {
          available_space_kg: number
          capacity_kg: number
          created_at: string | null
          departure_date: string | null
          destination: string | null
          driver_id: string | null
          id: string
          notes: string | null
          price_per_kg: number
          route_from: string
          route_to: string
          status: string | null
          updated_at: string | null
          vehicle_type: string | null
        }
        Insert: {
          available_space_kg: number
          capacity_kg: number
          created_at?: string | null
          departure_date?: string | null
          destination?: string | null
          driver_id?: string | null
          id?: string
          notes?: string | null
          price_per_kg: number
          route_from: string
          route_to: string
          status?: string | null
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Update: {
          available_space_kg?: number
          capacity_kg?: number
          created_at?: string | null
          departure_date?: string | null
          destination?: string | null
          driver_id?: string | null
          id?: string
          notes?: string | null
          price_per_kg?: number
          route_from?: string
          route_to?: string
          status?: string | null
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payloads_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          unit: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          unit?: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          unit?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          location: string | null
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id?: string
          location?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
