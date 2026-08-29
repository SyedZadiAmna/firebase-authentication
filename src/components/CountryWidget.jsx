import { useState } from "react";
import { Search, Loader2, Globe2 } from "lucide-react";

export default function CountryWidget() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!country.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        "https://countries.dev/countries?fields=name,capital,region,population,flags"
      );

      if (!response.ok) {
        throw new Error("Could not load country data right now.");
      }

      const allCountries = await response.json();

      // yahan hum khud dhoondte hain jo country user ne likha hai
      const match = allCountries.find((c) =>
        c.name?.toLowerCase().includes(country.trim().toLowerCase())
      );

      if (!match) {
        throw new Error("Country not found. Try a different name.");
      }

      setData(match);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Globe2 className="h-5 w-5 text-indigo-600" />
        Country Info
      </h3>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter country name..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {data && (
        <div className="flex gap-4 bg-slate-50 rounded-lg p-4">
          <img
            src={data.flags?.png}
            alt="flag"
            className="w-20 h-14 object-cover rounded border border-slate-200"
          />
          <div className="text-sm space-y-1">
            <p className="font-bold text-slate-800">{data.name}</p>
            <p className="text-slate-500">Capital: {data.capital || "N/A"}</p>
            <p className="text-slate-500">Region: {data.region}</p>
            <p className="text-slate-500">Population: {data.population?.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}