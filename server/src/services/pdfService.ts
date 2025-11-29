export async function generateInvoicePdf(invoice: any) {
  // TODO: implement PDF generation (puppeteer/pdfkit)
  // For now return a stub buffer or path
  return Buffer.from('PDF stub - invoice ' + (invoice.invoice_number || invoice.id));
}
