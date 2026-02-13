
import React, { useState } from 'react';
import { suggestRecipesFromIngredients } from '../geminiService';
import { IconSparkles, IconChefHat } from './Icons';

interface AssistantProps {
  onClose: () => void;
}

const Assistant: React.FC<AssistantProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    const ingredients = input.split(',').map(i => i.trim());
    const res = await suggestRecipesFromIngredients(ingredients);
    setSuggestions(res);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-orange-500 rounded-[2rem] text-white mb-6 shadow-xl animate-pulse">
          <IconSparkles size={40} />
        </div>
        <h1 className="text-4xl font-serif font-bold dark:text-white mb-2">O que temos para hoje?</h1>
        <p className="text-slate-500">Diga-me o que você tem na geladeira e eu crio algo mágico.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Ingredientes disponíveis</label>
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full p-5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-purple-500 text-lg"
            placeholder="Ex: ovo, tomate, queijo, pão..."
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !input}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? 'Consultando o Chef IA...' : 'Gerar Sugestões'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-12 space-y-4">
          {suggestions.map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 flex gap-4 items-start animate-fade-in">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                <IconChefHat size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white">{s.title}</h3>
                <span className="text-xs font-bold text-orange-500 uppercase">{s.type}</span>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">{s.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assistant;
