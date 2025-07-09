"use client";
import { useState, ChangeEvent } from "react";
import jsPDF from "jspdf";
import { FaTrash, FaTimes } from "react-icons/fa";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import Image from "next/image";

interface Entry {
  description: string;
  amount: string;
}

export const Invoice = () => {
  const today = new Date().toISOString().split("T")[0];
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [paymentTerms, setPaymentTerms] = useState("");
  const [billedTo, setBilledTo] = useState("");
  const [payTo, setPayTo] = useState("");
  const [entries, setEntries] = useState<Entry[]>([{ description: "", amount: "" }]);
  const [taxEntries, setTaxEntries] = useState<Entry[]>([{ description: "", amount: "" }]);
  const [customMessage, setCustomMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Add/Remove Entries
  const handleAddEntry = () => setEntries([...entries, { description: "", amount: "" }]);
  const handleRemoveEntry = (idx: number) => setEntries(entries.filter((_, i) => i !== idx));
  const handleEntryChange = (idx: number, field: keyof Entry, value: string) => {
    const updated = [...entries];
    updated[idx][field] = value;
    setEntries(updated);
  };

  // Add/Remove Tax Entries
  const handleAddTax = () => setTaxEntries([...taxEntries, { description: "", amount: "" }]);
  const handleRemoveTax = (idx: number) => setTaxEntries(taxEntries.filter((_, i) => i !== idx));
  const handleTaxChange = (idx: number, field: keyof Entry, value: string) => {
    const updated = [...taxEntries];
    updated[idx][field] = value;
    setTaxEntries(updated);
  };

  // Image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => setImage(null);

  // Calculate totals
  const subtotal = entries.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const totalTax = taxEntries.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const total = subtotal + totalTax;

  // PDF Generation
  const handleDownloadPdf = async () => {
    const doc = new jsPDF();
    let y = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    let imageHeight = 0;
    let imageWidth = 0;
    let imageDataUrl = image;

    // --- Compress and prepare image (JPEG, max width 100px) ---
    if (image) {
      const img = new window.Image();
      img.src = image;
      await new Promise(resolve => { img.onload = resolve; });
      // Resize to max width 100px, keep aspect ratio
      const maxW = 100;
      const scale = Math.min(maxW / img.width, 1);
      imageWidth = img.width * scale;
      imageHeight = img.height * scale;
      // Draw to canvas and export as JPEG
      const canvas = document.createElement('canvas');
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
        imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      }
    }

    // --- Header Row: Fields Left, Image Right ---
    const headerHeight = Math.max(40, imageHeight ? imageHeight * 0.264583 : 0); // px to mm
    // Draw fields block
    const headerY = y;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('INVOICE', margin, headerY + 8);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const infoY = headerY + 16;
    doc.text(`Invoice Id: ${invoiceId}`, margin, infoY);
    doc.text(`Invoice Date: ${invoiceDate}`, margin, infoY + 6);
    doc.text(`Due Date: ${dueDate}`, margin, infoY + 12);
    doc.text(`Payment Terms: ${paymentTerms}`, margin, infoY + 18);
    // Draw image on right
    if (imageDataUrl) {
      // Convert px to mm for jsPDF (1px = 0.264583mm)
      const imgWmm = imageWidth * 0.264583;
      const imgHmm = imageHeight * 0.264583;
      const imgX = pageWidth - margin - imgWmm;
      const imgY = headerY;
      doc.addImage(imageDataUrl, 'JPEG', imgX, imgY, imgWmm, imgHmm);
    }
    y += headerHeight + 8;
    doc.setDrawColor(180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // --- Addresses ---
    doc.setFont('helvetica', 'bold');
    doc.text('Billed To:', margin, y);
    doc.text('Pay To:', pageWidth / 2, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(billedTo, margin, y, { maxWidth: (pageWidth / 2) - margin - 4 });
    doc.text(payTo, pageWidth / 2, y, { maxWidth: (pageWidth / 2) - margin - 4 });
    y += 18;
    doc.setDrawColor(180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // --- Entries Table ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', margin + 2, y);
    doc.text('Amount', pageWidth - margin - 36, y);
    doc.setLineWidth(0.5);
    doc.line(margin + 2, y + 3, pageWidth - margin - 2, y + 3); // underline, more gap
    y += 10; // more gap before first row
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    entries.forEach((entry, idx) => {
      doc.text(`${idx + 1}. ${entry.description}`, margin + 4, y, { maxWidth: pageWidth - margin * 2 - 40 });
      doc.text(`$${entry.amount}`, pageWidth - margin - 36, y);
      doc.setDrawColor(220);
      doc.setLineWidth(0.2);
      doc.line(margin + 2, y + 2, pageWidth - margin - 2, y + 2);
      y += 8;
    });
    y += 2;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, pageWidth - margin - 60, y);
    y += 10;
    doc.setDrawColor(180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // --- Tax Table ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Tax Description', margin + 2, y);
    doc.text('Amount', pageWidth - margin - 36, y);
    doc.setLineWidth(0.5);
    doc.line(margin + 2, y + 3, pageWidth - margin - 2, y + 3); // underline, more gap
    y += 10; // more gap before first row
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    taxEntries.forEach((tax, idx) => {
      doc.text(`${idx + 1}. ${tax.description}`, margin + 4, y, { maxWidth: pageWidth - margin * 2 - 40 });
      doc.text(`$${tax.amount}`, pageWidth - margin - 36, y);
      doc.setDrawColor(220);
      doc.setLineWidth(0.2);
      doc.line(margin + 2, y + 2, pageWidth - margin - 2, y + 2);
      y += 8;
    });
    y += 2;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Tax: $${totalTax.toFixed(2)}`, pageWidth - margin - 60, y);
    y += 7;
    // Make Total larger and bold
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${total.toFixed(2)}`, pageWidth - margin - 60, y);
    doc.setFontSize(12);
    y += 12;
    doc.setDrawColor(180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // --- Custom Message ---
    doc.setFont('helvetica', 'bold');
    doc.text('Custom Message:', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(customMessage, margin, y, { maxWidth: pageWidth - margin * 2 });
    y += 12;

    // --- Footer ---
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for your business!', pageWidth / 2, doc.internal.pageSize.getHeight() - 18, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.save('invoice.pdf');
  };

  return (
    <div className="border border-gray-600 flex rounded-xl p-4 mt-5 flex-col w-full bg-white dark:bg-black">
      {/* Header Section: Left = Invoice fields, Right = Image upload/preview */}
      <div className="flex flex-row justify-between items-center mb-4 gap-4 min-h-[120px]">
        {/* Left: Invoice fields, 4 rows, label left, input right */}
        <div className="flex flex-col gap-2 w-full max-w-[420px] justify-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium min-w-[100px] text-left">Invoice Id</label>
            <input
              type="text"
              placeholder="Invoice Id"
              className="px-2 py-1 text-base border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black w-full"
              value={invoiceId}
              onChange={e => setInvoiceId(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium min-w-[100px] text-left">Payment Terms</label>
            <input
              type="text"
              placeholder="Payment Terms"
              className="px-2 py-1 text-base border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black w-full"
              value={paymentTerms}
              onChange={e => setPaymentTerms(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium min-w-[100px] text-left">Invoice Date</label>
            <input
              type="date"
              placeholder="Invoice Date"
              className="px-2 py-1 text-base border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black w-full"
              value={invoiceDate}
              onChange={e => setInvoiceDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium min-w-[100px] text-left">Due Date</label>
            <input
              type="date"
              placeholder="Due Date"
              className="px-2 py-1 text-base border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black w-full"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
        </div>
        {/* Right: Image preview/upload, centered vertically, larger */}
        <div className="flex flex-col items-center justify-center min-w-[140px] h-full">
          {image ? (
            <div className="relative group flex items-center justify-center">
              <Image
                src={image}
                alt="Logo Preview"
                unoptimized
                width={180}
                height={180}
                className="w-44 h-44 object-contain rounded shadow border border-gray-200 dark:border-gray-700 bg-white"
              />
              <button
                className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-2 shadow hover:bg-red-600 transition z-10"
                onClick={handleRemoveImage}
                type="button"
                aria-label="Remove image"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer w-36 h-36">
              <span className="flex items-center justify-center w-32 h-32 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition border border-dashed border-gray-400 dark:border-gray-600 text-6xl">
                <HiOutlineCloudArrowUp className="w-10 h-10" />
              </span>
              <span className="text-base font-semibold mt-2 text-center">Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>
      {/* Invoice Details (addresses) */}
      <div className="flex gap-4 mb-4">
        <label className="w-1/2 text-base text-gray-700 dark:text-gray-200 font-bold flex flex-col">
          Billed To
          <textarea
            placeholder="Billed To"
            className="mt-2 px-4 py-3 text-lg border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black min-h-[70px]"
            value={billedTo}
            onChange={e => setBilledTo(e.target.value)}
          />
        </label>
        <label className="w-1/2 text-base text-gray-700 dark:text-gray-200 font-bold flex flex-col">
          Pay To
          <textarea
            placeholder="Pay To"
            className="mt-2 px-4 py-3 text-lg border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black min-h-[70px]"
            value={payTo}
            onChange={e => setPayTo(e.target.value)}
          />
        </label>
      </div>
      {/* Entries Section */}
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between pr-2 text-black dark:text-white font-semibold">
          <div className="w-[40%] text-md">Description</div>
          <div className="w-[25%] text-md">Quantity</div>
          <div className="w-[30%] text-md">Amount</div>
          <div className="w-[5%] text-md">Actions</div>
        </div>
        {entries.map((entry, idx) => (
          <div key={idx}>
            <div className="flex justify-between py-1 gap-2 dark:hover:bg-gray-700 rounded-xl">
              <input
                type="text"
                placeholder="Enter Description"
                className="w-[40%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
                value={entry.description || ""}
                onChange={e => handleEntryChange(idx, "description", e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter more text"
                className="w-[25%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
                value={"1"}
                readOnly
              />
              <input
                type="number"
                placeholder="Enter number"
                className="w-[30%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
                value={entry.amount || ""}
                onChange={e => handleEntryChange(idx, "amount", e.target.value)}
              />
              <div className="w-[5%] flex justify-center cursor-pointer items-center">
                <FaTrash
                  onClick={() => handleRemoveEntry(idx)}
                  className="text-red-500 hover:text-red-700"
                />
              </div>
            </div>
            <hr className="border border-gray-700 my-1" />
          </div>
        ))}
        <button
          className="w-full font-semibold dark:bg-gray-900 text-center my-2 py-2 cursor-pointer dark:hover:bg-gray-800 bg-gray-200 text-black dark:text-white rounded-lg"
          onClick={handleAddEntry}
          type="button"
        >
          Add another entry
        </button>
      </div>
      <div className="sm:text-2xl text-xl font-semibold text-right py-1 flex items-center justify-end text-black dark:text-white">
        Subtotal: ${subtotal.toFixed(2)}
      </div>
      {/* Tax Section */}
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between pr-2 text-black dark:text-white font-semibold">
          <div className="w-[40%] text-md">Description</div>
          <div className="w-[25%] text-md">Quantity</div>
          <div className="w-[30%] text-md">Amount</div>
          <div className="w-[5%] text-md">Actions</div>
        </div>
        {taxEntries.map((tax, idx) => (
          <div key={idx}>
            <div className="flex justify-between py-1 gap-2 dark:hover:bg-gray-700 rounded-xl">
              <input
                type="text"
                placeholder="Enter Description"
                className="w-[40%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
                value={tax.description || ""}
                onChange={e => handleTaxChange(idx, "description", e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter more text"
                className="w-[25%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
                value={"1"}
                readOnly
              />
              <input
                type="number"
                placeholder="Enter number"
                className="w-[30%] px-2 py-1 border border-gray-600 rounded-lg dark:bg-black dark:text-white text-black"
                value={tax.amount || ""}
                onChange={e => handleTaxChange(idx, "amount", e.target.value)}
              />
              <div className="w-[5%] flex justify-center cursor-pointer items-center">
                <FaTrash
                  onClick={() => handleRemoveTax(idx)}
                  className="text-red-500 hover:text-red-700"
                />
              </div>
            </div>
            <hr className="border border-gray-700 my-1" />
          </div>
        ))}
        <button
          className="w-full font-semibold dark:bg-gray-900 text-center my-2 py-2 cursor-pointer dark:hover:bg-gray-800 bg-gray-200 text-black dark:text-white rounded-lg"
          onClick={handleAddTax}
          type="button"
        >
          Add another tax
        </button>
      </div>
      <div className="sm:text-2xl text-xl font-semibold text-right py-1 flex items-center justify-end text-black dark:text-white">
        Total: ${total.toFixed(2)}
      </div>
      <hr className="border border-gray-700 my-1" />
      <textarea
        placeholder="Add a custom message"
        className="dark:bg-black w-[100%] rounded-xl p-2 border border-gray-600 my-2 text-black dark:text-white"
        value={customMessage}
        onChange={e => setCustomMessage(e.target.value)}
      />
      <div className="w-full text-right">
        <button
          className="px-4 py-1.5 rounded-lg bg-blue-500 font-semibold"
          onClick={handleDownloadPdf}
          type="button"
        >
          Generate Invoice
        </button>
      </div>
    </div>
  );
};
