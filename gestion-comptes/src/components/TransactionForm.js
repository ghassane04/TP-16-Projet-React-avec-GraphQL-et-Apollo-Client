import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_TRANSACTION } from "../graphql/mutations";
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from "../graphql/queries";

const TransactionForm = () => {
    const [compteId, setCompteId] = useState("");
    const [type, setType] = useState("DEPOT");
    const [montant, setMontant] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const { data: comptesData } = useQuery(GET_ALL_COMPTES);

    const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_TRANSACTIONS },
            { query: GET_ALL_COMPTES },
        ],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTransaction({
                variables: {
                    transaction: {
                        compteId,
                        type,
                        montant: parseFloat(montant),
                    },
                },
            });
            setCompteId("");
            setType("DEPOT");
            setMontant("");
            setMessage({ type: "success", text: "Transaction effectuée avec succès !" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        } catch (error) {
            setMessage({ type: "error", text: `Erreur : ${error.message}` });
            console.error("Erreur lors de la transaction :", error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg
                    className="w-6 h-6 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                </svg>
                Nouvelle Transaction
            </h2>

            {message.text && (
                <div
                    className={`mb-4 p-3 rounded-lg ${message.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compte
                    </label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="">Sélectionner un compte</option>
                        {comptesData?.allComptes?.map((compte) => (
                            <option key={compte.id} value={compte.id}>
                                Compte #{compte.id} - {compte.type} ({compte.solde?.toLocaleString("fr-FR")} €)
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de Transaction
                    </label>
                    <div className="flex space-x-4">
                        <label
                            className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${type === "DEPOT"
                                ? "bg-green-100 border-green-500 text-green-700"
                                : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <input
                                type="radio"
                                value="DEPOT"
                                checked={type === "DEPOT"}
                                onChange={(e) => setType(e.target.value)}
                                className="sr-only"
                            />
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Dépôt
                        </label>
                        <label
                            className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${type === "RETRAIT"
                                ? "bg-red-100 border-red-500 text-red-700"
                                : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <input
                                type="radio"
                                value="RETRAIT"
                                checked={type === "RETRAIT"}
                                onChange={(e) => setType(e.target.value)}
                                className="sr-only"
                            />
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                />
                            </svg>
                            Retrait
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Montant (€)
                    </label>
                    <input
                        type="number"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                        min="0.01"
                        step="0.01"
                        placeholder="Entrez le montant"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Transaction en cours...
                        </span>
                    ) : (
                        "Effectuer la Transaction"
                    )}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
