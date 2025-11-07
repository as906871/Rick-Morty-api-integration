import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacter";
import { motion } from "framer-motion";

const CharacterDetails: React.FC = () => {
  const params = useParams();
  const id = params.id ? Number(params.id) : null;
  const { data, isLoading, isError, error } = useCharacter(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-slate-600">
        Loading character details...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error?.message}
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-slate-600 font-semibold">
        Character not found.
      </div>
    );

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-10 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition text-sm font-medium"
      >
        ← Back to Character List
      </Link>

      <motion.div
        className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-8 p-8 border border-slate-100 hover:shadow-2xl transition"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex-shrink-0 flex justify-center">
          <motion.img
            src={data.image}
            alt={data.name}
            className="w-64 h-64 rounded-2xl object-cover shadow-md border-4 border-white"
            whileHover={{ scale: 1.05 }}
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">{data.name}</h1>
          <div className="text-sm font-medium text-slate-600">
            {data.species} • {data.status} • {data.gender}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <h3 className="font-semibold text-slate-700">Origin</h3>
              <p className="text-slate-500 text-sm mt-1">{data.origin.name}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <h3 className="font-semibold text-slate-700">Location</h3>
              <p className="text-slate-500 text-sm mt-1">{data.location.name}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition col-span-full sm:col-span-2">
              <h3 className="font-semibold text-slate-700">Episodes</h3>
              <p className="text-slate-500 text-sm mt-1">
                Appears in <span className="font-semibold">{data.episode.length}</span> episodes.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {data.episode.slice(0, 5).map((ep, index) => (
                  <span
                    key={ep}
                    className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                  >
                    EP {index + 1}
                  </span>
                ))}
                {data.episode.length > 5 && (
                  <span className="text-xs text-slate-400">+ more...</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                data.status === "Alive"
                  ? "bg-green-500"
                  : data.status === "Dead"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            ></span>
            <span className="text-slate-600 text-sm font-medium">
              Current Status: {data.status}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="text-center bg-gradient-to-r from-indigo-100 to-blue-50 py-6 rounded-2xl border border-slate-100 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-indigo-700 mb-1">Fun Fact</h3>
        <p className="text-slate-600 text-sm">
          {data.name} has appeared in <strong>{data.episode.length}</strong> episodes across
          multiple dimensions — truly a fan favorite!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CharacterDetails;
