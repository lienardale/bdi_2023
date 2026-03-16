import { canImport } from '@/app/lib/auth-utils';
import ImportExportClient from './import-export-client';

export default async function ImportExportPage() {
  const showImport = await canImport();
  return <ImportExportClient canImport={showImport} />;
}
