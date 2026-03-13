import Papa from 'papaparse';

export function generateCsv(data: Record<string, unknown>[]): string {
  return Papa.unparse(data);
}

export function parseCsv<T>(csvString: string): T[] {
  const result = Papa.parse<T>(csvString, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  });
  return result.data;
}
