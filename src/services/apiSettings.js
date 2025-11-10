import supabase from "./supabase";

export async function getSettings() {
    let { data, error } = await supabase
    .from('settings')
    .select('*')
    if(error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }
    return data[0]
}

export async function updateSettings(settings) {
    let { data, error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1)
    .select().single()
    if(error) {
        console.error(error);
        throw new Error('Settings could not be updated');
    }
    return data;
}