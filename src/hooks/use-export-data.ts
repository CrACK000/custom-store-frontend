import {jsPDF} from "jspdf";
import {generateUniqueKey} from "@/lib/generate";
import {formatDate} from "@/lib/date-formats";

const logo = "/placeholder-dark.png"

type Custom = {
  type: "year" | "month",
  value: number
}

const total = (order: Order) => {
  const subtotal = order.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  return subtotal + order.shipping_price + 25.99;
};

export const exportOrdersList = (data: Order[], desc: string, custom?: Custom) => {
  const doc = new jsPDF();

  let orders = data

  switch (custom?.type) {
    case "month":
      orders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.getMonth() + 1 === custom.value;
      });
      break;
    case "year":
      orders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.getFullYear() === custom.value;
      });
      break;
  }

  const logoWidth = 50;
  const logoHeight = 20;
  doc.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);

  doc.setFont("helvetica", "bold")
  doc.setFontSize(18);
  doc.text("List Orders", 10, 20);

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10);
  doc.text(desc, 10, 25);

  const startX = 10;
  const startY = 35;
  const pageWidth = doc.internal.pageSize.getWidth();
  const tableWidth = pageWidth - 20;
  const rowHeight = 10;
  const colWidths = [60, 30, 30, 30, 40]; // Sum of colWidths should match tableWidth
  let currentY = startY;

  doc.setFillColor(225, 225, 225); // Light gray background
  doc.setDrawColor(135, 135, 135); // Set border color to blue (R, G, B)
  doc.rect(startX, currentY, tableWidth, rowHeight, "F");

  // Header
  doc.setFontSize(10);
  let currentX = startX;

  const headers = ["Customer", "Type", "Status", "Date", "Amount"];
  headers.forEach((header, index) => {
    doc.text(header, currentX + 2, currentY + 7);
    doc.rect(currentX, currentY, colWidths[index], rowHeight);
    currentX += colWidths[index];
  });

  currentY += rowHeight;

  // Data
  orders.forEach((order) => {
    // Check if we need a new page
    if (currentY + rowHeight + 5 > doc.internal.pageSize.getHeight() - 10) {
      doc.addPage();
      currentY = startY;

      // Redraw the table header on new page
      currentX = startX;
      doc.setFillColor(225, 225, 225);
      doc.setDrawColor(135, 135, 135); // Ensure border color remains blue on new pages
      doc.rect(startX, currentY, tableWidth, rowHeight, "F");
      headers.forEach((header, index) => {
        doc.text(header, currentX + 2, currentY + 7);
        doc.rect(currentX, currentY, colWidths[index], rowHeight);
        currentX += colWidths[index];
      });

      currentY += rowHeight;
    }

    currentX = startX;
    const rowHeightWithEmail = rowHeight + 5; // Row height considering email

    // Draw the border for each row
    colWidths.forEach((width) => {
      doc.rect(currentX, currentY, width, rowHeightWithEmail);
      currentX += width;
    });

    // Draw data in cells
    currentX = startX;
    doc.text(`${order.customer ? order.customer.name : order.shipping_data.customer.name} ${order.customer ? order.customer.surname : order.shipping_data.customer.surname}`, currentX + 2, currentY + 7);

    doc.setFontSize(8); // Smaller font size for email
    doc.text(order.customer ? order.customer.email : order.shipping_data.customer.email, currentX + 2, currentY + 12);
    doc.setFontSize(10); // Reset font size back to normal
    currentX += colWidths[0];

    doc.text(order.type, currentX + 2, currentY + 7);
    currentX += colWidths[1];

    doc.text(order.status, currentX + 2, currentY + 7);
    currentX += colWidths[2];

    doc.text(new Date(order.created_at).toLocaleDateString(), currentX + 2, currentY + 7);
    currentX += colWidths[3];

    doc.text(`${total(order).toFixed(2)}`, currentX + 2, currentY + 7);

    currentY += rowHeightWithEmail;
  });

  const uniqueKey = generateUniqueKey();
  const filename = `orders-${uniqueKey}.pdf`;
  doc.save(filename);
}

export const exportOrder = (data: Order) => {
  const doc = new jsPDF();

  const logoWidth = 50;
  const logoHeight = 20;
  doc.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);

  // Title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18);
  doc.text(`Order ${data._id}`, 10, 20);

  // Date
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10);
  doc.text(formatDate(data.created_at), 10, 25);

  // Add a separator line
  doc.setLineWidth(0.5);
  doc.line(10, 40, 200, 40);

  // Order Details
  let yPosition = 35;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text('Order Details', 10, yPosition);
  yPosition += 5;

  data.products.forEach((product) => {
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    doc.text(`${product.name} x ${product.quantity}`, 10, yPosition);
    doc.text(`$${(product.price * product.quantity).toFixed(2)}`, 150, yPosition);
  });

  // Add a separator line
  yPosition += 10;
  doc.setLineWidth(0.5);
  doc.line(10, yPosition, 200, yPosition);

  // Total
  yPosition += 10;
  doc.setFont("helvetica", "bold");
  doc.text('Total', 10, yPosition);
  doc.text(`$${total(data).toFixed(2)}`, 150, yPosition);

  // Add a separator line
  yPosition += 10;
  doc.setLineWidth(0.5);
  doc.line(10, yPosition, 200, yPosition);

  // Shipping Information
  yPosition += 15;
  doc.setFont("helvetica", "bold");
  doc.text('Shipping Information', 10, yPosition);
  yPosition += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`${data.shipping_data.customer.name} ${data.shipping_data.customer.surname}`, 10, yPosition);
  doc.text(data.shipping_data.address, 10, yPosition + 5);
  doc.text(`${data.shipping_data.city}, ${data.shipping_data.zip}`, 10, yPosition + 10);
  doc.text(data.shipping_data.state, 10, yPosition + 15);

  // Add a separator line
  yPosition += 25;
  doc.setLineWidth(0.5);
  doc.line(10, yPosition, 200, yPosition);

  // Billing Information
  yPosition += 15;
  doc.setFont("helvetica", "bold");
  doc.text('Billing Information', 10, yPosition);
  yPosition += 5;
  doc.setFont("helvetica", "normal");
  if (data.billing_data === null) {
    doc.text('Same as shipping address', 10, yPosition);
  } else {
    doc.text(`${data.billing_data.customer.name} ${data.billing_data.customer.surname}`, 10, yPosition);
    doc.text(data.billing_data.address, 10, yPosition + 5);
    doc.text(`${data.billing_data.city}, ${data.billing_data.zip}`, 10, yPosition + 10);
    doc.text(data.billing_data.state, 10, yPosition + 15);
  }

  // Add a separator line
  yPosition += 25;
  doc.setLineWidth(0.5);
  doc.line(10, yPosition, 200, yPosition);

  // Customer Information
  yPosition += 15;
  doc.setFont("helvetica", "bold");
  doc.text('Customer Information', 10, yPosition);
  yPosition += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`${data.customer ? data.customer.name : data.shipping_data.customer.name} ${data.customer ? data.customer.surname : data.shipping_data.customer.surname}`, 10, yPosition);
  doc.text(`Email: ${data.customer ? data.customer.email : data.shipping_data.customer.email}`, 10, yPosition + 5);
  doc.text(`Phone: ${data.shipping_data.customer.phone}`, 10, yPosition + 10);

  // Add a separator line
  yPosition += 25;
  doc.setLineWidth(0.5);
  doc.line(10, yPosition, 200, yPosition);

  // Payment Information
  yPosition += 15;
  doc.setFont("helvetica", "bold");
  doc.text('Payment Information', 10, yPosition);
  yPosition += 5;
  doc.setFont("helvetica", "normal");
  doc.text('Visa **** **** **** 4532', 10, yPosition);

  const filename = `order-${data._id}.pdf`;
  doc.save(filename);
}
