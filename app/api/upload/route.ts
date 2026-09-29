import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    const category = (data.get('category') as string) || 'Uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Safe sanitized unique filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;

    let publicUrl = '';

    // 1. Prefer Supabase Storage (Required for Vercel / serverless deployments)
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'media';

      if (supabase) {
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filename, buffer, {
            contentType: file.type || 'image/jpeg',
            upsert: true,
          });

        if (uploadError) {
          console.warn('Supabase storage upload failed, attempting fallback:', uploadError.message);
        } else {
          const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filename);
          publicUrl = urlData.publicUrl;
        }
      }
    }

    // 2. Fallback to local filesystem only if not hosted on Vercel and Supabase didn't produce URL
    if (!publicUrl) {
      if (process.env.VERCEL) {
        throw new Error('Supabase Storage bucket is required on Vercel. Ensure a public bucket exists in Supabase Storage.');
      }
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, filename);
      await writeFile(filePath, buffer);
      publicUrl = `/uploads/${filename}`;
    }

    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    const sizeStr = file.size < 1024 * 1024 
      ? `${(file.size / 1024).toFixed(0)} KB` 
      : `${sizeMb} MB`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: file.name,
      category,
      size: sizeStr,
      type: file.type || 'image/jpeg',
      uploaded_at: new Date().toISOString().split('T')[0],
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

