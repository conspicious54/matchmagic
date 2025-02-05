import { supabase } from './supabase';

export interface UploadedPhoto {
  id: string;
  path: string;
  size: number;
  originalName: string;
  mimeType: string;
}

export async function uploadUserPhoto(userId: string, file: File): Promise<UploadedPhoto> {
  // Create a unique filename
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;
  const path = `users/${userId}/photos/${filename}`;

  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('user-photos')
    .upload(path, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw uploadError;
  }

  // Insert record into user_photos table
  const { data: photoData, error: insertError } = await supabase
    .from('user_photos')
    .insert({
      user_id: userId,
      storage_path: path,
      original_name: file.name,
      size: file.size,
      mime_type: file.type,
      metadata: {
        uploadedAt: new Date().toISOString()
      }
    })
    .select()
    .single();

  if (insertError) {
    // If insert fails, try to clean up the uploaded file
    await supabase.storage.from('user-photos').remove([path]);
    console.error('Error inserting photo record:', insertError);
    throw insertError;
  }

  return {
    id: photoData.id,
    path: photoData.storage_path,
    size: photoData.size,
    originalName: photoData.original_name,
    mimeType: photoData.mime_type
  };
}

export async function deleteUserPhoto(userId: string, photoId: string): Promise<void> {
  // Get the photo record first to get the storage path
  const { data: photo, error: fetchError } = await supabase
    .from('user_photos')
    .select('storage_path')
    .eq('id', photoId)
    .eq('user_id', userId)
    .single();

  if (fetchError) {
    console.error('Error fetching photo:', fetchError);
    throw fetchError;
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('user-photos')
    .remove([photo.storage_path]);

  if (storageError) {
    console.error('Error deleting file from storage:', storageError);
    throw storageError;
  }

  // Delete from database
  const { error: deleteError } = await supabase
    .from('user_photos')
    .delete()
    .eq('id', photoId)
    .eq('user_id', userId);

  if (deleteError) {
    console.error('Error deleting photo record:', deleteError);
    throw deleteError;
  }
}

export async function getUserPhotos(userId: string): Promise<UploadedPhoto[]> {
  const { data, error } = await supabase
    .from('user_photos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }

  return data.map(photo => ({
    id: photo.id,
    path: photo.storage_path,
    size: photo.size,
    originalName: photo.original_name,
    mimeType: photo.mime_type
  }));
}