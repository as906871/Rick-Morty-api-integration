import React, { useEffect, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { savePage, loadPage } from "../utils/persistPage";
import Pagination from "../components/Pagination";
import CharacterTable from "../components/CharacterTable";
import { RefreshButton } from "../components/RefreshButton";

const Home: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pFromUrl = Number(urlParams.get("page") ?? "") || null;
  const persisted = loadPage();

  const initial = pFromUrl ?? persisted ?? 1;

  const [page, setPage] = useState<number>(initial);
  const { data, isLoading, isError, error } = useCharacters(page);
  const pages = data?.info.pages ?? 1;

  useEffect(() => {
    savePage(page);
    const sp = new URLSearchParams(window.location.search);
    sp.set("page", String(page));
    const newUrl = `${window.location.pathname}?${sp.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [page]);

  useEffect(() => {
    const onPop = () => {
      const sp = new URLSearchParams(window.location.search);
      const p = Number(sp.get("page") ?? "") || 1;
      setPage(p);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Characters</h2>
        <div className="flex gap-2 items-center">
          <RefreshButton queryKey={["characters", page]} />
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div className="text-red-600">{error?.message}</div>}

      {data && data.results.length > 0 && (
        <>
          <CharacterTable data={data.results} />
          <div className="flex items-center justify-between">
            <Pagination page={page} pages={pages} setPage={(p) => setPage(Math.max(1, Math.min(p, pages)))} />
            <div className="text-sm text-slate-500">Total: {data.info.count}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
