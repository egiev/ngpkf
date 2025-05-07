import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

export async function saveBase64Pdf(
  base64: string,
): Promise<{ filePath: string; filename: string }> {
  // Strip the base64 prefix (if present)
  const base64Data = base64.replace(/^data:application\/pdf;base64,/, '');

  // Define filename and storage path
  const filename = `${v4()}.pdf`;
  const storageDir = path.join(process.cwd(), 'files'); // ✅ Save in /files directory
  const filePath = path.join(storageDir, filename);

  // Ensure the directory exists
  await fs.promises.mkdir(storageDir, { recursive: true });

  // Save the file
  await fs.promises.writeFile(filePath, base64Data, 'base64');

  return { filePath, filename };
}
