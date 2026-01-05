import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
    const { loading, error, data } = useQuery(GET_ALL_COMPTES);

    if (loading)
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
                    className="w-6 h-6 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                </svg>
                Liste des Comptes
            </h2>

            {data?.allComptes?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucun compte trouvé</p>
            ) : (
                <div className="space-y-4">
                    {data?.allComptes?.map((compte) => (
                        <div
                            key={compte.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-gray-50 to-white"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">ID: {compte.id}</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {compte.solde?.toLocaleString("fr-FR", {
                                            minimumFractionDigits: 2,
                                        })}{" "}
                                        €
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${compte.type === "COURANT"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                        }`}
                                >
                                    {compte.type}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Créé le :{" "}
                                {new Date(compte.dateCreation).toLocaleDateString("fr-FR")}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompteList;
