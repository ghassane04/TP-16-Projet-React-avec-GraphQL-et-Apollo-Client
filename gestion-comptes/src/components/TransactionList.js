import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

const TransactionList = () => {
    const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading)
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Chargement...</span>
            </div>
        );

    if (error)
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">Erreur : {error.message}</p>
            </div>
        );

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg
                    className="w-6 h-6 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
                Historique des Transactions
            </h2>

            {data?.allTransactions?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    Aucune transaction trouvée
                </p>
            ) : (
                <div className="space-y-3">
                    {data?.allTransactions?.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${transaction.type === "DEPOT"
                                    ? "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white"
                                    : "border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white"
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === "DEPOT"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {transaction.type === "DEPOT" ? (
                                            <svg
                                                className="w-5 h-5"
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
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
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
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {transaction.type === "DEPOT" ? "Dépôt" : "Retrait"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Compte #{transaction.compte?.id} ({transaction.compte?.type})
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`text-lg font-bold ${transaction.type === "DEPOT"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {transaction.type === "DEPOT" ? "+" : "-"}
                                        {transaction.montant?.toLocaleString("fr-FR", {
                                            minimumFractionDigits: 2,
                                        })}{" "}
                                        €
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(transaction.date).toLocaleDateString("fr-FR")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
