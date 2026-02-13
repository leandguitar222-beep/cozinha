
import React, { useState } from 'react';
import { Recipe, Step } from '../types';
import { IconChevronLeft, IconChevronRight, IconChefHat } from './Icons';
import Timer from './Timer';

interface CookingModeProps {
  recipe: Recipe;
  fontSize: number;
  onExit: () => void;
}

const CookingMode: React.FC<CookingModeProps> = ({ recipe, fontSize, onExit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = recipe.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / recipe.steps.length) * 100;

  const fontSizes = ["text-xl", "text-3xl", "text-5xl"];
  const descriptionSize = fontSizes[fontSize - 1] || "text-xl";

  const nextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <IconChefHat className="text-orange-500" />
          <h2 className="font-serif text-xl font-bold line-clamp-1">{recipe.title}</h2>
        </div>
        <button 
          onClick={onExit}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
        >
          Sair do Modo Cozinhar
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-800">
        <div 
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto text-center">
        <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-bold rounded-full text-sm uppercase tracking-wider">
                Passo {currentStepIndex + 1} de {recipe.steps.length}
            </span>
        </div>

        <p className={`${descriptionSize} font-medium leading-relaxed mb-8 dark:text-slate-100 transition-all duration-300`}>
          {currentStep.description}
        </p>

        {currentStep.timerSeconds && (
          <div className="mb-8">
            <Timer key={currentStep.id} seconds={currentStep.timerSeconds} />
          </div>
        )}

        {/* Highlighted Ingredients for this step (simulation) */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 opacity-70">
            {recipe.ingredients.slice(0, 3).map(ing => (
                <span key={ing.id} className="text-sm border rounded-full px-3 py-1 dark:border-slate-700">
                    {ing.name}
                </span>
            ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t dark:border-slate-800 flex justify-between gap-4">
        <button
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="flex-1 max-w-xs flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold disabled:opacity-30 hover:bg-white dark:hover:bg-slate-900 transition-colors"
        >
          <IconChevronLeft /> Anterior
        </button>

        {currentStepIndex === recipe.steps.length - 1 ? (
          <button
            onClick={onExit}
            className="flex-1 max-w-xs bg-green-500 text-white p-4 rounded-2xl font-bold shadow-lg shadow-green-200 dark:shadow-none hover:bg-green-600 transition-colors"
          >
            Finalizar Receita! 🎉
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-orange-500 text-white p-4 rounded-2xl font-bold shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-600 transition-colors"
          >
            Próximo Passo <IconChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default CookingMode;
