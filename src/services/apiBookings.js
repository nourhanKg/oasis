import supabase, { supabaseUrl } from "./supabase";

export async function getBookings(filter = {}, sortBy={}) {
    let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(full_name, email)')
    if(filter?.field && filter?.value) query = query.eq(filter?.field, filter?.value)
    if(sortBy?.field && sortBy?.direction) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc"});
    let { data, error } = await query
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