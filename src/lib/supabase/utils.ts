import { supabase } from './client';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error.message);
      return false;
    }

    console.log('Supabase connection successful:', data);
    return true;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
}