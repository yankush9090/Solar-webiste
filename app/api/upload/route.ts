import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Safe sanitized unique filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
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
