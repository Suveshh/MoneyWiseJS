import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  GamepadIcon,
  TrendingUp,
  Target,
  Brain,
  Clock,
  Users,
  Trophy,
  Play,
  Star,
  BarChart3,
  Zap,
  ShieldAlert,
  Building,
} from "lucide-react";

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Games", icon: GamepadIcon },
    { id: "trading", name: "Trading", icon: TrendingUp },
    { id: "analysis", name: "Analysis", icon: BarChart3 },
    { id: "quiz", name: "Quiz Games", icon: Brain },
    { id: "strategy", name: "Strategy", icon: Target },
  ];

  const games = [
    {
      id: "fantasy-trading",
      title: "Fantasy Stock Trading",
      description:
        "Invest virtual money in real stocks and track your portfolio performance against other players.",
      category: "trading",
      difficulty: "Beginner",
      players: "12,543",
      duration: "15-30 min",
      xp: 50,
      image:
        "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["Live market data", "Portfolio tracking", "Leaderboards"],
      route: "/games/fantasy-trading", // Add route for each game
    },
    {
      id: "crisis-simulator",
      title: "Crisis Simulator",
      description:
        "Navigate historical market crashes like 2008 and COVID-19. Learn crisis management and defensive investing.",
      category: "strategy",
      difficulty: "Advanced",
      players: "8,234",
      duration: "45-60 min",
      xp: 150,
      image:
        "https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: [
        "Historical scenarios",
        "Risk assessment",
        "Strategy building",
      ],
      route: "/games/crisis-simulator",
    },
    {
      id: "chart-master",
      title: "Chart Master",
      description:
        "Identify patterns and predict stock movements from real charts. Master technical analysis skills.",
      category: "analysis",
      difficulty: "Intermediate",
      players: "15,678",
      duration: "10-15 min",
      xp: 75,
      image:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["Pattern recognition", "Real charts", "Instant feedback"],
      route: "/games/chart-master",
    },
    {
      id: "build-portfolio",
      title: "Build-a-Portfolio",
      description:
        "Create diversified portfolios and get scored on risk, correlation, and long-term return potential.",
      category: "strategy",
      difficulty: "Intermediate",
      players: "7,892",
      duration: "30-40 min",
      xp: 120,
      image:
        "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: [
        "Diversification scoring",
        "Risk analysis",
        "Asset allocation",
      ],
      route: "/games/build-portfolio", // This should match your route for BuildPortfolio component
    },
    {
      id: "time-traveler",
      title: "Time Traveler Investor",
      description:
        "Start investing in past decades with real historical data. Learn long-term investing and compounding.",
      category: "strategy",
      difficulty: "Intermediate",
      players: "11,234",
      duration: "60+ min",
      xp: 200,
      image:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["Historical data", "Long-term simulation", "Compound growth"],
      route: "/games/time-traveler",
    },
    {
      id: "options-simulator",
      title: "Options Simulator",
      description:
        "Learn options trading in a simplified environment with visual payoff diagrams and risk scenarios.",
      category: "trading",
      difficulty: "Advanced",
      players: "4,567",
      duration: "25-35 min",
      xp: 180,
      image:
        "https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["Visual payoffs", "Risk scenarios", "Strategy comparison"],
      route: "/games/options-simulator",
    },
    {
      id: "startup-ipo",
      title: "Startup IPO Tycoon",
      description:
        "Manage a virtual startup from inception to IPO. Make decisions about funding, growth, and going public.",
      category: "strategy",
      difficulty: "Advanced",
      players: "5,432",
      duration: "90+ min",
      xp: 250,
      image:
        "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["Business simulation", "IPO process", "Valuation modeling"],
      route: "/games/startup-ipo",
    },
    {
      id: "market-news-reaction",
      title: "Market News Reaction",
      description:
        "Predict how stocks will react to breaking financial news. Develop market sentiment analysis skills.",
      category: "analysis",
      difficulty: "Intermediate",
      players: "9,876",
      duration: "5-10 min",
      xp: 40,
      image:
        "https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["Real news events", "Sentiment analysis", "Quick rounds"],
      route: "/games/market-news-reaction",
    },
    {
      id: "stockaire",
      title: "Who Wants to Be a Stockaire?",
      description:
        'Answer progressively difficult finance questions with lifelines like "Ask Gemini AI" and "Ask an Expert".',
      category: "quiz",
      difficulty: "Beginner",
      players: "23,456",
      duration: "20-25 min",
      xp: 100,
      image:
        "https://images.pexels.com/photos/6801872/pexels-photo-6801872.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
      features: ["AI assistance", "Expert help", "Progressive difficulty"],
      route: "/games/stockaire",
    },
  ];

  const filteredGames =
    selectedCategory === "all"
      ? games
      : games.filter((game) => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300";
    }
  };

  // Function to handle game launch
  const handlePlayGame = (game) => {
    // Navigate to the game route
    navigate(game.route);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Educational Trading Games
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Master investing through interactive simulations, real market
            scenarios, and engaging challenges designed to build your financial
            knowledge.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Game Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}
                  >
                    {game.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-400" />
                  {game.xp} XP
                </div>
              </div>

              {/* Game Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  {game.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                  {game.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.features?.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {game.features && game.features.length > 2 && (
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                      +{game.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* Game Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {game.players} players
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {game.duration}
                  </div>
                </div>

                {/* Play Button - NOW WITH FUNCTIONALITY */}
                <button 
                  onClick={() => handlePlayGame(game)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Challenge Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">
              Weekly Trading Challenge
            </h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Compete with thousands of players in our weekly fantasy trading
              competition. Top performers win badges, premium mentor sessions,
              and exclusive rewards!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-sm text-blue-100">Active Players</div>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">$50,000</div>
                <div className="text-sm text-blue-100">Virtual Prize Pool</div>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">3 Days</div>
                <div className="text-sm text-blue-100">Time Remaining</div>
              </div>
            </div>
            <button className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Join Challenge
            </button>
          </div>
        </div>

        {/* Game Categories Showcase */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            Master Different Aspects of Investing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Trading Skills
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Learn buy/sell timing, portfolio management, and market
                psychology
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Technical Analysis
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Master chart patterns, indicators, and trend analysis techniques
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Risk Management
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Understand diversification, stop-losses, and position sizing
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Market Knowledge
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Learn about sectors, economics, and fundamental analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;