"use client";
import { Input } from "@/components/Input";
import { useState } from "react";
import { TextArea } from "./TextArea";
import { FaDollarSign } from "react-icons/fa";
import { Entries } from "./Entries";
import { EntriesInput } from "./EntriesInput";
import { TaxEntries } from "./TaxEntries";
import { TaxEntriesInput } from "./TaxEntriesInputs";

export const Invoice = () => {
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [entriesCount, setEntriesCount] = useState<number[]>([]);
  const [taxEntriesCount, setTaxEntriesCount] = useState<number[]>([]);

  const handleAdd = () => {
    setEntriesCount([...entriesCount, 0]);
  };

  const handleRemove = () => {
    if (entriesCount.length > 0) {
      setEntriesCount(entriesCount.slice(0, -1));
    }
  };
  const taxHandleAdd = () => {
    setTaxEntriesCount([...taxEntriesCount, 0]);
  };

  const taxHandleRemove = () => {
    if (taxEntriesCount.length > 0) {
      setTaxEntriesCount(taxEntriesCount.slice(0, -1));
    }
  };

  const handleDownloadPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.querySelector("#invoice");

    const options = {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.5 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      }, // Enable compression
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="border border-gray-600 flex rounded-xl p-4 mt-5 flex-col w-full">
      <div id="invoice">
        <div className="font-bold text-3xl">Invoice</div>
        <Input label="Invoice Id" type="text" placeholder="Invoice Id" />
        <Input label="Invoice Date" type="text" placeholder={date} />
        <Input label="Due Date" type="text" placeholder={date} />
        <Input
          label="Payments Terms"
          type="text"
          placeholder="Add Payments Terms"
        />
        <div className="flex sm:flex-row flex-col sm:justify-between xl:w-[40%] lg:w-[50%] md:w-[60%] w-full">
          <TextArea placeholder="Address" label="Billed To" />
          <TextArea placeholder="Address" label="Pay To" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold sm:text-3xl text-2xl py-2">Entries</div>
          <Entries />
          {entriesCount?.map(() => (
            <EntriesInput
              key={Math.floor(Math.random() + 1)}
              onClick={handleRemove}
            />
          ))}
        </div>
        <div className="dark:bg-gray-900 text-center my-2 py-2 cursor-pointer dark:hover:bg-gray-800 bg-gray-200 text-black dark:text-white">
          <button className="w-full font-semibold" onClick={() => handleAdd()}>
            Add another entry
          </button>
        </div>
        <div className="sm:text-2xl text-xl font-semibold text-right py-1 flex items-center justify-end">
          Subtotal: <FaDollarSign className="text-xl" /> 0.00
        </div>
        <div className="flex flex-col">
          <div className="font-semibold sm:text-3xl text-2xl py-2">
            Tax Details
          </div>
          <TaxEntries />
          {taxEntriesCount?.map(() => (
            <TaxEntriesInput
              key={Math.floor(Math.random() + 1)}
              onClick={taxHandleRemove}
            />
          ))}
        </div>
        <div className="dark:bg-gray-900 dark:hover:bg-gray-800 text-center my-2 py-2 cursor-pointer bg-gray-200">
          <button
            className="w-full font-semibold"
            onClick={() => taxHandleAdd()}
          >
            Add another tax
          </button>
        </div>
        <div className="sm:text-2xl text-xl font-semibold text-right py-1 flex items-center justify-end">
          Total: <FaDollarSign className="text-xl" /> 0.00
        </div>
        <hr className="border border-gray-700 my-1" />
        {/* <div className="w-full flex py-2 flex-col"> */}{" "}
        <textarea
          placeholder="Add a custom message"
          className="dark:bg-black w-[100%] rounded-xl p-2 border border-gray-600 my-2 text-black dark:text-white"
        />
      </div>

      <div className="w-full text-right">
        <button
          className="px-4 py-1.5 rounded-lg bg-blue-500 font-semibold"
          onClick={handleDownloadPdf}
        >
          Generate Invoice
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};
