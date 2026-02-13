
import React, { useState } from 'react';
import { Recipe, Difficulty, RecipeType, Ingredient, Step } from '../types';
import { IconPlus, IconChefHat } from './Icons';

interface RecipeEditorProps {
  onSave: (recipe: Partial<Recipe>) => void;
  onCancel: () => void;
}

const RecipeEditor: React.FC<RecipeEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [time, setTime] = useState(15);
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [type, setType] = useState(RecipeType.SAVORY);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now().toString(), name: '', amount: '', unit: '' }]);
  };

  const addStep = () => {
    setSteps([...steps, { id: Date.now().toString(), description: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      ingredients,
      steps,
      time,
      difficulty,
      type,
      image: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/600`
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-orange-500 rounded-2xl text-white">
          <IconPlus size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold dark:text-white">Criar Nova Receita</h1>
          <p className="text-slate-500">Compartilhe sua arte culinária com o mundo.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Título da Receita</label>
            <input 
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all text-xl font-bold" 
              placeholder="Ex: Bolo de Chocolate Belga"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Descrição Curta</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all resize-none" 
              rows={3}
              placeholder="Uma breve história ou por que essa receita é especial..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tempo (min)</label>
              <input 
                type="number"
                value={time}
                onChange={e => setTime(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Dificuldade</label>
              <select 
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-500"
              >
                {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tipo</label>
              <select 
                value={type}
                onChange={e => setType(e.target.value as RecipeType)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-500"
              >
                {Object.values(RecipeType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold dark:text-white">Ingredientes</h2>
            <button 
              type="button"
              onClick={addIngredient}
              className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-200 transition-colors"
            >
              <IconPlus size={20} />
            </button>
          </div>
          <div className="space-y-4">
            {ingredients.map((ing, idx) => (
              <div key={ing.id} className="flex gap-4">
                <input 
                  placeholder="Ingrediente"
                  className="flex-grow p-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                  onChange={e => {
                    const next = [...ingredients];
                    next[idx].name = e.target.value;
                    setIngredients(next);
                  }}
                />
                <input 
                  placeholder="Qtd"
                  className="w-20 p-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                  onChange={e => {
                    const next = [...ingredients];
                    next[idx].amount = e.target.value;
                    setIngredients(next);
                  }}
                />
                <input 
                  placeholder="Unid"
                  className="w-24 p-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                  onChange={e => {
                    const next = [...ingredients];
                    next[idx].unit = e.target.value;
                    setIngredients(next);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 dark:shadow-none"
          >
            Salvar Receita
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeEditor;
