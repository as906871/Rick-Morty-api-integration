import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <header className="bg-white shadow p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">Rick & Morty</a>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto p-4 w-full">
          <AppRouter />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
