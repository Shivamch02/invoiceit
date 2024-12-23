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
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
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
  return (
    <div className="border border-gray-600 flex rounded-xl p-4 mt-5 flex-col w-full">
      <div className="font-bold text-3xl">Invoice</div>
      <Input label="Invoice Id" type="text" placeholder="Invoice Id" />
      <Input label="Invoice Date" type="text" placeholder={date} />
      <Input label="Due Date" type="text" placeholder={date} />
      <Input
        label="Payments Terms"
        type="text"
        placeholder="Add Payments Terms"
      />
      <div className="flex justify-between w-[40%]">
        <TextArea placeholder="Address" label="Billed To" />
        <TextArea placeholder="Address" label="Pay To" />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold text-3xl py-2">Entries</div>
        <Entries />
        {entriesCount?.map(() => (
          <EntriesInput
            key={Math.floor(Math.random() + 1)}
            onClick={handleRemove}
          />
        ))}
      </div>
      <div className="bg-gray-950 text-center py-2 cursor-pointer">
        <button className="w-full" onClick={() => handleAdd()}>
          Add another entry
        </button>
      </div>
      <div className="text-2xl font-semibold text-right py-2 flex items-center justify-end">
        Subtotal: <FaDollarSign /> 0.00
      </div>
      <div className="flex flex-col">
        <div className="font-semibold text-3xl py-2">Tax Details</div>
        <TaxEntries />
        {taxEntriesCount?.map(() => (
          <TaxEntriesInput
            key={Math.floor(Math.random() + 1)}
            onClick={taxHandleRemove}
          />
        ))}
      </div>
      <div className="bg-gray-950 text-center py-2 cursor-pointer">
        <button className="w-full" onClick={() => taxHandleAdd()}>
          Add another tax
        </button>
      </div>
      <div className="text-2xl font-semibold text-right py-2 flex items-center justify-end">
        Total: <FaDollarSign /> 0.00
      </div>
      <hr className="border border-gray-700 my-1" />
      <div className="w-full flex py-2 flex-col">
        {" "}
        <textarea
          placeholder="Add a custom message"
          className="bg-gray-800 w-[100%] rounded-xl p-2 border border-gray-600"
        />
        <div className="w-full text-right">
          <button className="px-4 py-1.5 rounded-lg bg-blue-500 font-semibold mt-4">
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
