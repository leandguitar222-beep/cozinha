
import React from 'react';
import { Recipe } from '../types';
import { IconClock, IconFlame, IconHeart } from './Icons';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, onToggleFavorite }) => {
  return (
    <div 
      onClick={() => onClick(recipe)}
      className="group relative bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button 
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl text-rose-500 shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <IconHeart filled={recipe.isFavorite} size={20} />
        </button>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-full text-slate-800 shadow-sm">
            {recipe.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors line-clamp-1 dark:text-white">
          {recipe.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
            <IconClock size={16} className="text-orange-500" />
            <span>{recipe.time} min</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
            <IconFlame size={16} className="text-orange-500" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
