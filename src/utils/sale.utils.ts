import jsPDF from "jspdf";
import moment from "moment";
import config from "../config";

/* --------------> Sale Price Calculator <--------------- */
export const calculateSalePrice = (quantity: number, price: number) => {
  return Number((quantity * price).toFixed(2));
};

/* --------------> Sale At Date Format <--------------- */
export const formatDate = (dateTime: Date) => {
  return moment(dateTime).format("dddd, DD MMMM YYYY, HH:mm:ss");
};

/* --------------> Invoice Generator <--------------- */
export const invoiceGenerator = (payload: {
  id: string;
  product: string;
  buyer: string;
  seller: string;
  price: number;
  quantity: number;
  time: string;
}) => {
  const { id, product, buyer, seller, price, quantity, time } = payload;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // Set font styles
  pdf.setFont("Helvetica", "bold");
  pdf.internal.pageSize.height = pdf.internal.pageSize.height * 0.5;
  const pageWidth = pdf.internal.pageSize.width;

  pdf.setFontSize(25);
  pdf.text((config.APP_NAME as string).toUpperCase(), 20, 20);
  pdf.addImage("/icon.png", "PNG", pageWidth - 50, 0, 30, 30);

  pdf.setFontSize(18);
  const invoiceTitleWidth =
    (pdf.getStringUnitWidth("Invoice") * 18) / pdf.internal.scaleFactor;
  const invoiceTitleX = (pageWidth - invoiceTitleWidth) / 2;
  pdf.text("Invoice", invoiceTitleX, 40);

  pdf.setLineWidth(0.5);
  pdf.line(20, 45, 190, 45);
  pdf.line(20, 46, 190, 46);

  pdf.setFontSize(12);
  pdf.text(`Product: ${product}`, 20, 60);
  pdf.text(`Buyer: ${buyer}`, 20, 70);
  pdf.text(`Seller: ${seller}`, 20, 80);
  pdf.text(`Price: $${price}`, 20, 90);
  pdf.text(`Quantity: ${quantity}`, 90, 90);
  pdf.text(`Date: ${time}`, 20, 100);

  // Buyer and Seller Signature lines at the bottom of the page

  const signatureY = pdf.internal.pageSize.height - 20;
  pdf.setLineWidth(0.5);
  pdf.line(20, signatureY - 21, 190, signatureY - 21);
  pdf.line(20, signatureY - 20, 190, signatureY - 20);

  pdf.line(30, signatureY, 70, signatureY);
  pdf.text("Buyer's Signature", 30, signatureY + 5);

  pdf.line(140, signatureY, 180, signatureY);
  pdf.text("Seller's Signature", 140, signatureY + 5);

  pdf.setLineWidth(0.2);

  // Save the PDF with a unique name
  const fileName = `invoice_${id}.pdf`;
  pdf.save(fileName);
};
