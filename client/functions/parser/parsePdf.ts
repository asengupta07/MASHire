// @ts-ignore
import * as pdf from 'pdf-parse/lib/pdf-parse.js' 

export async function extractPdfText(file: File): Promise<string> {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Invalid file type. Please upload a PDF.');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const data = await extractPdfTextFromBuffer(buffer);
  return data;
}

export async function extractPdfTextFromBuffer(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}
    
// async function test() {
//     const filePath = path.join(process.cwd(), 'test.pdf'); // your PDF file in root
//     const buffer = fs.readFileSync(filePath);
  
//     const text = await extractPdfTextFromBuffer(buffer);
//     console.log('Extracted Text:\n', text);
//   }
  
//   test().catch(console.error);
