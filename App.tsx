
import React, { useState, useEffect, useMemo } from 'react';
import { Recipe, AppView, UserPreferences, RecipeType } from './types';
import { INITIAL_RECIPES } from './constants';
import { 
  IconChefHat, IconHeart, IconPlus, IconSettings, IconHome, 
  IconSparkles, IconSun, IconMoon, IconChevronRight 
} from './components/Icons';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import CookingMode from './components/CookingMode';
import RecipeEditor from './components/RecipeEditor';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [view, setView] = useState<AppView>('HOME');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<RecipeType | 'ALL'>('ALL');
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    diet: [],
    fontSize: 1,
    isDarkMode: false
  });

  // Apply dark mode to body
  useEffect(() => {
    if (preferences.isDarkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [preferences.isDarkMode]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const saveNewRecipe = (recipeData: Partial<Recipe>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      isFavorite: false,
    } as Recipe;
    setRecipes([newRecipe, ...recipes]);
    setView('HOME');
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'ALL' || r.type === selectedType;
      const isFavorite = view === 'FAVORITES' ? r.isFavorite : true;
      return matchesSearch && matchesType && isFavorite;
    });
  }, [recipes, searchTerm, selectedType, view]);

  const renderContent = () => {
    switch (view) {
      case 'HOME':
      case 'FAVORITES':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="mb-12">
              <h1 className="text-5xl font-serif font-bold mb-4 dark:text-white">
                {view === 'HOME' ? 'Olá, o que vamos cozinhar?' : 'Suas Receitas Favoritas'}
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Pesquisar receitas, ingredientes..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 dark:text-white transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button 
                    onClick={() => setSelectedType('ALL')}
                    className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${selectedType === 'ALL' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
                  >
                    Todos
                  </button>
                  {Object.values(RecipeType).map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${selectedType === t ? 'bg-orange-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRecipes.map(r => (
                  <RecipeCard 
                    key={r.id} 
                    recipe={r} 
                    onClick={(recipe) => {
                      setSelectedRecipe(recipe);
                      setView('RECIPE_DETAIL');
                    }}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] shadow-inner">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-full inline-block mb-6">
                  <IconChefHat size={48} className="text-slate-300" />
                </div>
                <h2 className="text-2xl font-bold text-slate-400">Nenhuma receita encontrada</h2>
                <p className="text-slate-400 mt-2">Tente mudar os filtros ou criar uma nova!</p>
              </div>
            )}
          </div>
        );

      case 'RECIPE_DETAIL':
        return selectedRecipe ? (
          <RecipeDetail 
            recipe={selectedRecipe} 
            onBack={() => setView('HOME')} 
            onStartCooking={() => setView('COOKING_MODE')}
            onToggleFavorite={toggleFavorite}
          />
        ) : null;

      case 'COOKING_MODE':
        return selectedRecipe ? (
          <CookingMode 
            recipe={selectedRecipe} 
            fontSize={preferences.fontSize} 
            onExit={() => setView('RECIPE_DETAIL')} 
          />
        ) : null;

      case 'EDITOR':
        return <RecipeEditor onSave={saveNewRecipe} onCancel={() => setView('HOME')} />;

      case 'AI_ASSISTANT':
        return <Assistant onClose={() => setView('HOME')} />;

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen pb-24 ${preferences.isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar / Bottom Navigation for Mobile */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-700/50 z-40 transition-all">
        <button 
          onClick={() => setView('HOME')}
          className={`p-4 rounded-[2rem] transition-all ${view === 'HOME' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <IconHome />
        </button>
        <button 
          onClick={() => setView('AI_ASSISTANT')}
          className={`p-4 rounded-[2rem] transition-all ${view === 'AI_ASSISTANT' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <IconSparkles />
        </button>
        <button 
          onClick={() => setView('FAVORITES')}
          className={`p-4 rounded-[2rem] transition-all ${view === 'FAVORITES' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <IconHeart />
        </button>
        <button 
          onClick={() => setView('EDITOR')}
          className={`p-4 rounded-[2rem] transition-all ${view === 'EDITOR' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          <IconPlus />
        </button>
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2" />
        <button 
          onClick={() => setPreferences(p => ({ ...p, isDarkMode: !p.isDarkMode }))}
          className="p-4 rounded-[2rem] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
        >
          {preferences.isDarkMode ? <IconSun /> : <IconMoon />}
        </button>
        <div className="flex items-center px-4 gap-2">
            <button 
                onClick={() => setPreferences(p => ({ ...p, fontSize: p.fontSize > 1 ? p.fontSize - 1 : 1 }))}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
                A-
            </button>
            <span className="text-[10px] font-bold text-slate-300">Fonte</span>
            <button 
                onClick={() => setPreferences(p => ({ ...p, fontSize: p.fontSize < 3 ? p.fontSize + 1 : 3 }))}
                className="text-sm font-bold text-slate-400 hover:text-slate-600"
            >
                A+
            </button>
        </div>
      </nav>

      {renderContent()}

      {/* Floating Header (only desktop) */}
      <div className="hidden lg:flex fixed top-0 inset-x-0 h-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b dark:border-slate-800 items-center justify-between px-8 z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <IconChefHat size={18} />
            </div>
            <span className="font-serif font-bold text-xl dark:text-white">FlavorFlow</span>
        </div>
        <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total: {recipes.length} receitas</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 cursor-pointer">
                <IconSettings size={16} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
