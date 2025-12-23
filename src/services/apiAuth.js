import supabase, { supabaseUrl } from "./supabase";

export const login = async ({email, password}) => {
    let { data, error } = await supabase.auth.signInWithPassword({email, password})
    if(error) {
        throw new Error(error.message)
    }
    return data
}

export const logout = async () => {
    let { error } = await supabase.auth.signOut()
    if(error) {
        throw new Error(error.message)
    }
}

export const signup = async ({email, password, fullName}) => {
    let { data, error } = await supabase.auth.signUp({email,password, options: {data: {full_name: fullName, avatar_url: ""}}})
    if(error) {
        throw new Error(error.message)
    }
}

export const getCurrentUser = async () => {
    let { data: session } = await supabase.auth.getSession()
    if(!session.session) return null
    const { data, error } = await supabase.auth.getUser()
    if(error) {
        throw new Error(error.message)
    }
    return data?.user
}

export const updateCurrentUser = async ({password, fullName, avatar}) => {
    let updatedUser;
    if(password) updatedUser = {password}
    if(fullName) updatedUser = {data: {full_name: fullName}}
    const { data, error } = await supabase.auth.updateUser(updatedUser)
    if(error) {
        throw new Error(error.message)
    }
    if(!avatar) return data;
    const fileName = `avatar-${data.user.id}-${Date.now()}`;
    const {error: storageError} = await supabase.storage.from('avatar').upload(fileName, avatar)
    if(storageError) {
        throw new Error(storageError.message)
    }
    const { data: updatedData, error: userError } = await supabase.auth.updateUser({
        data: {
            avatar_url: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`
        }
    })
    if(userError) {
        throw new Error(userError.message)
    }
    return updatedData
}