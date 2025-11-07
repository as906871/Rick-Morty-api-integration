import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

type Props = {
  queryKey: unknown[];
  label?: string;
};

export const RefreshButton: React.FC<Props> = ({ queryKey, label = "Refresh Data" }) => {
  const qc = useQueryClient();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = async () => {
    setIsSpinning(true);
    await qc.invalidateQueries({ queryKey });
    setTimeout(() => setIsSpinning(false), 800);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleRefresh}
      className="group relative flex items-center gap-2 px-4 py-2 
        bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white rounded-full font-medium shadow-md
        hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
    >
      <motion.div
        animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
        transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.8, ease: "linear" }}
      >
        <RefreshCw size={18} className="text-white" />
      </motion.div>

      <span>{label}</span>
    </motion.button>
  );
};
