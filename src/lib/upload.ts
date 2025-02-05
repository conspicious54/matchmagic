import { supabase } from './supabase';

export interface UploadResult {
  path: string;
  error?: string;
}

export async function uploadTrainingPhoto(userId: string, file: File): Promise<UploadResult> {
  try {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return {
        path: '',
        error: 'File size must be less than 10MB'
      };
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        path: '',
        error: 'File must be an image'
      };
    }

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${randomString}.${extension}`;
    const filePath = `training/${userId}/${filename}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('user-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return {
        path: '',
        error: 'Failed to upload file to storage'
      };
    }

    // Create database record
    const { error: dbError } = await supabase
      .from('user_photos')
      .insert({
        user_id: userId,
        storage_path: filePath,
        original_name: file.name,
        size: file.size,
        mime_type: file.type,
        metadata: {
          uploadedAt: new Date().toISOString(),
          purpose: 'training'
        }
      });

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Try to clean up the uploaded file
      await supabase.storage
        .from('user-photos')
        .remove([filePath]);
      
      return {
        path: '',
        error: 'Failed to create database record'
      };
    }

    return { path: filePath };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      path: '',
      error: 'An unexpected error occurred'
    };
  }
}

export async function deleteTrainingPhoto(userId: string, path: string): Promise<{ error?: string }> {
  try {
    // Delete from storage first
    const { error: storageError } = await supabase.storage
      .from('user-photos')
      .remove([path]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
      return { error: 'Failed to delete file from storage' };
    }

    // Delete database record
    const { error: dbError } = await supabase
      .from('user_photos')
      .delete()
      .match({ user_id: userId, storage_path: path });

    if (dbError) {
      console.error('Database delete error:', dbError);
      return { error: 'Failed to delete database record' };
    }

    return {};
  } catch (error) {
    console.error('Delete error:', error);
    return { error: 'An unexpected error occurred' };
  }
}