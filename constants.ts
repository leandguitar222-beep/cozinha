
import { Difficulty, RecipeType, Recipe } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Panqueca de Banana Fitness',
    description: 'Uma opção saudável e deliciosa para o seu café da manhã em apenas 10 minutos.',
    image: 'https://picsum.photos/id/429/800/600',
    time: 15,
    difficulty: Difficulty.EASY,
    type: RecipeType.FITNESS,
    ingredients: [
      { id: 'i1', name: 'Banana madura', amount: '1', unit: 'unidade', substitutes: ['Maçã ralada'] },
      { id: 'i2', name: 'Ovo', amount: '2', unit: 'unidades' },
      { id: 'i3', name: 'Aveia em flocos', amount: '2', unit: 'colheres de sopa' },
      { id: 'i4', name: 'Canela', amount: 'a gosto', unit: '' }
    ],
    steps: [
      { id: 's1', description: 'Amasse bem a banana em um prato fundo até virar uma pasta.' },
      { id: 's2', description: 'Adicione os ovos e a aveia, misturando bem até ficar homogêneo.' },
      { id: 's3', description: 'Aqueça uma frigideira antiaderente em fogo baixo.', timerSeconds: 60 },
      { id: 's4', description: 'Despeje a massa e cozinhe por cerca de 2 minutos de cada lado.', timerSeconds: 120 }
    ],
    nutrition: {
      calories: '280 kcal',
      protein: '12g',
      carbs: '35g',
      fat: '8g'
    }
  },
  {
    id: '2',
    title: 'Risoto de Cogumelos',
    description: 'Um clássico italiano cremoso e sofisticado para um jantar especial.',
    image: 'https://picsum.photos/id/493/800/600',
    time: 40,
    difficulty: Difficulty.MEDIUM,
    type: RecipeType.VEGETARIAN,
    ingredients: [
      { id: 'i21', name: 'Arroz Arbóreo', amount: '1', unit: 'xícara' },
      { id: 'i22', name: 'Cogumelos Paris', amount: '200', unit: 'g' },
      { id: 'i23', name: 'Cebola picada', amount: '1/2', unit: 'unidade' },
      { id: 'i24', name: 'Vinho branco seco', amount: '100', unit: 'ml' },
      { id: 'i25', name: 'Caldo de legumes quente', amount: '500', unit: 'ml' },
      { id: 'i26', name: 'Manteiga', amount: '2', unit: 'colheres de sopa' },
      { id: 'i27', name: 'Queijo Parmesão', amount: '50', unit: 'g' }
    ],
    steps: [
      { id: 's21', description: 'Refogue a cebola na manteiga até ficar transparente.' },
      { id: 's22', description: 'Adicione os cogumelos e refogue por 5 minutos.', timerSeconds: 300 },
      { id: 's23', description: 'Junte o arroz e refogue rapidamente. Adicione o vinho e mexa até evaporar.' },
      { id: 's24', description: 'Adicione o caldo aos poucos, concha por concha, mexendo sempre até o arroz ficar al dente.', timerSeconds: 1200 },
      { id: 's25', description: 'Finalize com mais manteiga e o parmesão. Sirva quente!' }
    ],
    nutrition: {
      calories: '450 kcal',
      protein: '10g',
      carbs: '55g',
      fat: '18g'
    }
  }
];
