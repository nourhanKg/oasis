import supabase, { supabaseUrl } from "./supabase";

import { PAGE_SIZE } from '../utils/constants'
export async function getBookings(filter = {}, sortBy={}, page = 1) {
    let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(full_name, email)', { count: 'exact' })
    //check if there's a filter and if so add it to the query
    if(filter?.field && filter?.value) query = query.eq(filter?.field, filter?.value)
    //check if there's a sort and if so add it to the query
    if(sortBy?.field && sortBy?.direction) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc"});
    //check if there's a page and if so add it to the query
    if(page) query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    let { data, error, count } = await query
    if(error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }
    return { data, count }
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