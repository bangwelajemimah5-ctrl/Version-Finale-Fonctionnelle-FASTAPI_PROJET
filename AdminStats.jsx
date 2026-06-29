import { useEffect, useState } from "react";
// import api from "../services/api";
import api from "../services/api";
export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/dashboard/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur de chargement");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center p-10">
      <span className="loading loading-spinner text-white"></span>
    </div>
  );

  if (error) return (
    <div className="text-center p-10 text-red-400">{error}</div>
  );

  const total = stats.total_requests;
  const traitees = stats.summary.traitees;
  const enAttente = stats.summary.en_attente;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative mb-8"
      style={{background: "linear-gradient(135deg, #4b5563 0%, #1f2937 50%, #111827 100%)"}}
    >
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute top-20 right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15 py-10 px-6">

        <div className="flex flex-col items-center justify-center text-white py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-7xl font-semibold mt-5">{total}</p>
          <p className="text-white/80 text-2xl mt-3 font-light">Demandes enregistrées</p>
        </div>

        <div className="flex flex-col items-center justify-center text-white py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-7xl font-semibold mt-5">{traitees}</p>
          <p className="text-white/80 text-2xl mt-3 font-light">Demandes traitées</p>
        </div>

        <div className="flex flex-col items-center justify-center text-white py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-7xl font-semibold mt-5">{enAttente}</p>
          <p className="text-white/80 text-2xl mt-3 font-light">Demandes en attente</p>
        </div>

      </div>
    </div>
  );
}