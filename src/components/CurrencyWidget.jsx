import { useState } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";

export default function CurrencyWidget() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      if (!response.ok) throw new Error("Could not fetch rates. Check currency codes.");

      const data = await response.json();
      const rate = data.rates[to];

      if (!rate) throw new Error("Currency code not found.");

      setResult((parseFloat(amount) * rate).toFixed(2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <ArrowRightLeft className="h-5 w-5 text-indigo-600" />
        Currency Converter
      </h3>

      <form onSubmit={handleConvert} className="space-y-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            placeholder="From (USD)"
            maxLength={3}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ArrowRightLeft className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            placeholder="To (PKR)"
            maxLength={3}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Convert
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2 mt-3">
          {error}
        </p>
      )}

      {result && (
        <div className="bg-slate-50 rounded-lg p-4 mt-3 text-center">
          <p className="text-2xl font-bold text-slate-800">
            {amount} {from} = {result} {to}
          </p>
        </div>
      )}
    </div>
  );
}
