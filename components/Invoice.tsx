"use client";
import { Input } from "@/components/Input";
import { useState } from "react";
import { TextArea } from "./TextArea";

export const Invoice = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
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
    </div>
  );
};
