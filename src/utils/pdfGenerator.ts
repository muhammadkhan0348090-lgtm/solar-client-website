import { jsPDF } from 'jspdf';

interface QuotationPdfData {
  customerName?: string;
  phone?: string;
  city?: string;
  systemSizeKw: number;
  panelBrand?: string;
  monthlyBillPkr: number;
  monthlySavingsPkr: number;
  totalCapexPkr: number;
  paybackTimeline: string;
}

export const generateQuotationPDF = (data: QuotationPdfData) => {
  const doc = new jsPDF();

  const name = data.customerName || 'Valued Customer';
  const phone = data.phone || '+92-03480906798';
  const city = data.city || 'Lahore';
  const systemKw = data.systemSizeKw || 10;
  const brand = data.panelBrand || 'Longi / Jinko 585W N-Type Tier-1';
  const capex = data.totalCapexPkr || 1350000;
  const savings = data.monthlySavingsPkr || 45000;
  const payback = data.paybackTimeline || '2.5 Years';

  // Dark Header Banner
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, 210, 45, 'F');

  doc.setTextColor(245, 158, 11); // Amber
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('SOLAR COMPANY PAKISTAN', 14, 22);

  doc.setTextColor(16, 185, 129); // Emerald
  doc.setFontSize(11);
  doc.text('Official Turn-Key System Quotation & Technical Proposal', 14, 32);

  // Client Details Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.text('1. Client & Proposal Overview', 14, 58);
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 62, 196, 62);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Client Name: ${name}`, 14, 70);
  doc.text(`Phone / WhatsApp: ${phone}`, 14, 77);
  doc.text(`City: ${city}`, 14, 84);
  doc.text(`Proposal Date: ${new Date().toLocaleDateString()}`, 130, 70);
  doc.text(`Quotation ID: #SOL-${Math.floor(100000 + Math.random() * 900000)}`, 130, 77);

  // Technical System Specifications Table
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Recommended System Specifications', 14, 100);
  doc.line(14, 104, 196, 104);

  doc.setFillColor(241, 245, 249);
  doc.rect(14, 110, 182, 48, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Item Description', 20, 118);
  doc.text('Specification Details', 95, 118);

  doc.setFont('helvetica', 'normal');
  doc.text('System Capacity:', 20, 126);
  doc.text(`${systemKw} kW Turn-Key Rooftop Setup`, 95, 126);

  doc.text('Solar Panel Brand:', 20, 133);
  doc.text(`${brand}`, 95, 133);

  doc.text('Inverter System:', 20, 140);
  doc.text(`On-Grid / Hybrid String Inverter (10-Yr Warranty)`, 95, 140);

  doc.text('DISCO Green Metering:', 20, 147);
  doc.text(`LESCO / IESCO / K-Electric NEPRA License Included`, 95, 147);

  // Financial Breakdown & ROI Table
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Turn-Key Investment & Financial Return (PKR)', 14, 172);
  doc.line(14, 176, 196, 176);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Total Turn-Key Upfront CAPEX:', 14, 186);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs. ${capex.toLocaleString()} PKR`, 130, 186);

  doc.setFont('helvetica', 'normal');
  doc.text('Est. Monthly Electricity Savings:', 14, 194);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`Rs. ${savings.toLocaleString()} PKR / Month`, 130, 194);

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text('Estimated Investment Payback Period:', 14, 202);
  doc.setFont('helvetica', 'bold');
  doc.text(`${payback}`, 130, 202);

  // Official Company Footer
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 260, 210, 37, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SOLAR COMPANY PAKISTAN - Turn-Key EPC Engineers', 14, 272);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Phone / WhatsApp: +92-03480906798  |  Email: tradernft0348@gmail.com', 14, 280);
  doc.text('Website: http://localhost:3000  |  Verified Tier-1 Panel & Inverter Guarantee', 14, 286);

  // Trigger Download
  doc.save(`Solar_Quotation_${systemKw}kW_Package.pdf`);
};
