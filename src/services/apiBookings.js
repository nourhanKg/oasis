import supabase, { supabaseUrl } from "./supabase";

export async function getBookings() {
    let { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(name), guests(full_name, email)')

    if(error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }
    return data
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}