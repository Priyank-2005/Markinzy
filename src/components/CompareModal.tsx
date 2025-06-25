"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

interface Plan {
    name: string;
    prices: { monthly: string; yearly: string };
    credits: { monthly: string; yearly: string };
    features: string[];
}

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    plans: Plan[];
    billing: "monthly" | "yearly";
    compareFeatures: { name: string; isCredits?: boolean }[];
}

export default function CompareModal({
    isOpen,
    onClose,
    plans,
    billing,
    compareFeatures,
}: CompareModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[999]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" leave="ease-in duration-200"
                    enterFrom="opacity-0" enterTo="opacity-100"
                    leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300" leave="ease-in duration-200"
                            enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="p-6">
                                    <Dialog.Title as="h3" className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                                        Plan Comparison
                                    </Dialog.Title>

                                    <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                                        <table className="min-w-full text-sm text-center table-auto border-collapse">
                                            <thead className="bg-gray-100 sticky top-0 z-10">
                                                <tr>
                                                    <th className="text-left px-4 py-2">Feature</th>
                                                    {plans.map((p) => (
                                                        <th key={p.name} className="px-4 py-2">{p.name}</th>
                                                    ))}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {compareFeatures.map(({ name, isCredits }) => (
                                                    <tr key={name} className="border-t hover:bg-gray-50">
                                                        <td className="px-4 py-2 text-left font-medium text-gray-700">{name}</td>
                                                        {plans.map((p) => (
                                                            <td key={`${p.name}-${name}`} className="px-4 py-2">
                                                                {isCredits ? (
                                                                    <span className="font-bold text-gray-900 text-base">{p.credits[billing]}</span>
                                                                ) : (
                                                                    p.name === "Pro" ||
                                                                        (p.name === "Essential" && name === "Basic Tools Access") ||
                                                                        p.features.includes(name) ? (
                                                                        <AiOutlineCheckCircle className="text-green-500 text-xl mx-auto" />
                                                                    ) : (
                                                                        <RxCrossCircled className="text-red-400 text-xl mx-auto" />
                                                                    )
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <button
                                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
                                            onClick={onClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
