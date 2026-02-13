
import React, { useState } from 'react';
import { Recipe, Difficulty, RecipeType } from '../types';
// Fixed: Added missing IconSparkles, IconChevronRight, and IconTimer to imports
import { IconClock, IconFlame, IconChefHat, IconHeart, IconChevronLeft, IconSparkles, IconChevronRight, IconTimer } from './Icons';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onStartCooking: () => void;
  onToggleFavorite: (id: string) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onStartCooking, onToggleFavorite }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  const toggleIngredient = (id: string) => {
    const next = new Set(checkedIngredients);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIngredients(next);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
      >
        <IconChevronLeft /> Voltar para o início
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image & Info */}
        <div className="space-y-8">
          <div className="relative group">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-[400px] object-cover rounded-[2.5rem] shadow-2xl"
            />
            <button 
              onClick={() => onToggleFavorite(recipe.id)}
              className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur rounded-2xl text-rose-500 shadow-xl transition-transform hover:scale-110"
            >
              <IconHeart filled={recipe.isFavorite} size={24} />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <h1 className="font-serif text-4xl font-bold mb-4 dark:text-white">{recipe.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">{recipe.description}</p>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <div className="text-center">
                <IconClock className="mx-auto mb-1 text-orange-500" />
                <p className="text-xs text-slate-400 uppercase font-bold">Tempo</p>
                <p className="font-bold dark:text-slate-200">{recipe.time} min</p>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <IconChefHat className="mx-auto mb-1 text-orange-500" />
                <p className="text-xs text-slate-400 uppercase font-bold">Dificuldade</p>
                <p className="font-bold dark:text-slate-200">{recipe.difficulty}</p>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <IconFlame className="mx-auto mb-1 text-orange-500" />
                <p className="text-xs text-slate-400 uppercase font-bold">Estilo</p>
                <p className="font-bold dark:text-slate-200">{recipe.type}</p>
              </div>
            </div>

            {recipe.nutrition && (
              <div className="mt-8 pt-8 border-t dark:border-slate-700">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <IconSparkles className="text-yellow-500" size={16} /> 
                  Informação Nutricional
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-xl text-center">
                    <p className="text-[10px] text-slate-400 uppercase">Cal</p>
                    <p className="text-xs font-bold dark:text-slate-200">{recipe.nutrition.calories}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-xl text-center">
                    <p className="text-[10px] text-slate-400 uppercase">Prot</p>
                    <p className="text-xs font-bold dark:text-slate-200">{recipe.nutrition.protein}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-xl text-center">
                    <p className="text-[10px] text-slate-400 uppercase">Carb</p>
                    <p className="text-xs font-bold dark:text-slate-200">{recipe.nutrition.carbs}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-xl text-center">
                    <p className="text-[10px] text-slate-400 uppercase">Gord</p>
                    <p className="text-xs font-bold dark:text-slate-200">{recipe.nutrition.fat}</p>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={onStartCooking}
              className="w-full mt-8 py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 dark:shadow-none hover:bg-orange-600 transition-all transform hover:-translate-y-1"
            >
              Começar a Cozinhar
            </button>
          </div>
        </div>

        {/* Right: Ingredients & Steps */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
              Ingredientes
              <span className="text-sm font-sans font-normal text-slate-400">({recipe.ingredients.length} itens)</span>
            </h2>
            <div className="space-y-3">
              {recipe.ingredients.map(ing => (
                <div 
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                    checkedIngredients.has(ing.id) 
                      ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 opacity-60' 
                      : 'bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-700'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    checkedIngredients.has(ing.id) ? 'bg-orange-500 border-orange-500' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {checkedIngredients.has(ing.id) && <IconChevronRight size={14} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${checkedIngredients.has(ing.id) ? 'line-through' : ''}`}>
                      {ing.name}
                    </p>
                    {ing.substitutes && (
                      <p className="text-xs text-orange-500 mt-0.5">Substituto: {ing.substitutes.join(', ')}</p>
                    )}
                  </div>
                  <span className="font-bold text-slate-400">{ing.amount} {ing.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">Modo de Preparo</h2>
            <div className="space-y-6">
              {recipe.steps.map((step, idx) => (
                <div key={step.id} className="flex gap-6">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="leading-relaxed dark:text-slate-300">{step.description}</p>
                    {step.timerSeconds && (
                      <div className="mt-3 flex items-center gap-2 text-orange-600 text-sm font-bold">
                        <IconTimer size={16} /> {Math.floor(step.timerSeconds / 60)} min sugeridos
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
