import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Props = {
  page: number;
  pages: number;
  setPage: (p: number) => void;
};

const Pagination: React.FC<Props> = ({ page, pages, setPage }) => {
  const buttonBase =
    "flex items-center justify-center gap-1 px-3 py-2 rounded-full font-medium text-sm transition-all duration-200";
  const buttonStyle =
    "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 shadow-sm";
  const disabledStyle = "opacity-50 cursor-not-allowed bg-slate-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap justify-center items-center gap-3 bg-gradient-to-r from-indigo-50 to-slate-50 py-3 px-5 rounded-2xl shadow-inner border border-slate-100"
    >
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className={`${buttonBase} ${buttonStyle} ${page === 1 ? disabledStyle : ""}`}
        title="First page"
      >
        <ChevronsLeft size={16} /> First
      </button>

      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`${buttonBase} ${buttonStyle} ${page === 1 ? disabledStyle : ""}`}
        title="Previous page"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      <motion.div
        key={page}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
        className="flex items-center justify-center bg-white border border-indigo-200 text-indigo-700 font-semibold px-5 py-2 rounded-full shadow-sm"
      >
        Page <span className="ml-1 text-indigo-600">{page}</span>
        <span className="mx-1 text-slate-400">/</span>
        <span className="text-slate-600">{pages}</span>
      </motion.div>

      <button
        onClick={() => setPage(Math.min(pages, page + 1))}
        disabled={page === pages}
        className={`${buttonBase} ${buttonStyle} ${page === pages ? disabledStyle : ""}`}
        title="Next page"
      >
        Next <ChevronRight size={16} />
      </button>

      <button
        onClick={() => setPage(pages)}
        disabled={page === pages}
        className={`${buttonBase} ${buttonStyle} ${page === pages ? disabledStyle : ""}`}
        title="Last page"
      >
        Last <ChevronsRight size={16} />
      </button>
    </motion.div>
  );
};

export default Pagination;