import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase
    .from('cabins')
    .select('*')
    if(error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }
    return data
}

export async function getCabinById(id) {
    let { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    if(error) {
        console.error(error);
        throw new Error('Cabin could not be loaded');
    }
    return data[0]
}

export async function deleteCabin(id) {
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    if(error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
    return;
}

export async function createEditCabin(newCabin, id) {
    //map data
    const mappedCabin = {
        ...newCabin,
        max_capacity: Number(newCabin.maxCapacity),
        regular_price: Number(newCabin.regularPrice),
        discount: Number(newCabin.discount)
    }
    delete mappedCabin.maxCapacity
    delete mappedCabin.regularPrice

    const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);
    const imageName = `${Math.random()}-${mappedCabin.image.name}`.replaceAll("/","");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

    // 1. Create/Edit cabin
    let query = supabase.from('cabins');
    // A) CREATE
    if(!id) {
        query = 
        query
        .insert({
            ...mappedCabin,
            image: imagePath
        })
    }
    // B) EDIT
    if(id) {
        query = query
        .update({
            ...mappedCabin,
            image: imagePath
        })
        .eq('id', id)
        
    }
    const { data, error } = await query.select().single();
    if(error) {
        console.error(error);
        throw new Error(`Cabin could not be ${id ? 'edited' : 'created'}`);
    }
    // 2. Upload image
    const { error: storageError } = await supabase
        .storage
        .from('cabin_images')
        .upload(imageName, mappedCabin.image, {
            cacheControl: '3600',
            upsert: false
        })
    if(storageError) {
        const { error: deleteError } = await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id)
        console.error(storageError);
        throw new Error(`Cabin image could not be uploaded and cabin was not ${id ? 'edited' : 'created'}`);
    }
    return;
}