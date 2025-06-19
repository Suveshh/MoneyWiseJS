import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, DollarSign, Clock, Trophy, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TimeTraveler = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [currentYear, setCurrentYear] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [cash, setCash] = useState(100000);
  const [marketData, setMarketData] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const historicalPeriods = [
    {
      id: 'dotcom-boom',
      name: 'Dot-com Boom (1995-2000)',
      startYear: 1995,
      endYear: 2000,
      description: 'Experience the rise and fall of internet stocks during the dot-com bubble.',
      majorEvents: [
        '1995: Netscape IPO launches internet investing',
        '1997: Amazon goes public',
        '1998: Google founded',
        '1999: Day trading becomes popular',
        '2000: Dot-com bubble bursts'
      ],
      initialSP500: 615,
      finalSP500: 1469
    },
    {
      id: 'financial-crisis',
      name: 'Financial Crisis Era (2005-2010)',
      startYear: 2005,
      endYear: 2010,
      description: 'Navigate the housing bubble, financial crisis, and market recovery.',
      majorEvents: [
        '2005: Housing market peaks',
        '2007: Subprime crisis begins',
        '2008: Lehman Brothers collapses',
        '2009: Market hits bottom',
        '2010: Recovery begins'
      ],
      initialSP500: 1248,
      finalSP500: 1257
    },
    {
      id: 'tech-recovery',
      name: 'Tech Recovery (2010-2015)',
      startYear: 2010,
      endYear: 2015,
      description: 'Ride the wave of mobile technology and social media growth.',
      majorEvents: [
        '2010: iPad launches',
        '2011: LinkedIn IPO',
        '2012: Facebook IPO',
        '2013: Twitter IPO',
        '2014: Mobile-first investing'
      ],
      initialSP500: 1257,
      finalSP500: 2043
    }
  ];

  const availableStocks = {
    'dotcom-boom': [
      { symbol: 'AMZN', name: 'Amazon', basePrice: 18, volatility: 0.8 },
      { symbol: 'MSFT', name: 'Microsoft', basePrice: 39, volatility: 0.6 },
      { symbol: 'AAPL', name: 'Apple', basePrice: 4, volatility: 0.7 },
      { symbol: 'ORCL', name: 'Oracle', basePrice: 15, volatility: 0.5 },
      { symbol: 'CSCO', name: 'Cisco', basePrice: 8, volatility: 0.9 }
    ],
    'financial-crisis': [
      { symbol: 'JPM', name: 'JPMorgan Chase', basePrice: 43, volatility: 0.7 },
      { symbol: 'BAC', name: 'Bank of America', basePrice: 47, volatility: 0.9 },
      { symbol: 'GS', name: 'Goldman Sachs', basePrice: 134, volatility: 0.8 },
      { symbol: 'XOM', name: 'ExxonMobil', basePrice: 56, volatility: 0.6 },
      { symbol: 'GE', name: 'General Electric', basePrice: 35, volatility: 0.7 }
    ],
    'tech-recovery': [
      { symbol: 'AAPL', name: 'Apple', basePrice: 27, volatility: 0.5 },
      { symbol: 'GOOGL', name: 'Google', basePrice: 307, volatility: 0.4 },
      { symbol: 'FB', name: 'Facebook', basePrice: 38, volatility: 0.8 },
      { symbol: 'NFLX', name: 'Netflix', basePrice: 53, volatility: 0.9 },
      { symbol: 'TSLA', name: 'Tesla', basePrice: 17, volatility: 1.2 }
    ]
  };

  const startPeriod = (period) => {
    setSelectedPeriod(period);
    setCurrentYear(period.startYear);
    setPortfolio([]);
    setCash(100000);
    setMarketData([{
      year: period.startYear,
      sp500: period.initialSP500,
      portfolio: 100000,
      events: ['Starting investment journey']
    }]);
    setGameComplete(false);
    setIsPlaying(true);
  };

  const buyStock = (symbol, amount) => {
    if (!selectedPeriod) return;
    
    const stocks = availableStocks[selectedPeriod.id];
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    const currentPrice = calculateCurrentPrice(stock, currentYear - selectedPeriod.startYear);
    const shares = amount / currentPrice;
    
    if (amount > cash) {
      return;
    }

    const newInvestment = {
      symbol,
      name: stock.name,
      amount,
      shares,
      purchasePrice: currentPrice,
      currentPrice,
      purchaseDate: `${currentYear}`
    };

    setPortfolio([...portfolio, newInvestment]);
    setCash(cash - amount);
  };

  const calculateCurrentPrice = (stock, yearsElapsed) => {
    const baseGrowth = selectedPeriod?.id === 'dotcom-boom' ? 0.3 : 
                      selectedPeriod?.id === 'financial-crisis' ? -0.1 : 0.15;
    
    const randomFactor = (Math.random() - 0.5) * stock.volatility;
    const growth = baseGrowth + randomFactor;
    
    return stock.basePrice * Math.pow(1 + growth, yearsElapsed);
  };

  const advanceYear = () => {
    if (!selectedPeriod) return;
    
    const newYear = currentYear + 1;
    setCurrentYear(newYear);
    
    // Update portfolio values
    const updatedPortfolio = portfolio.map(investment => {
      const stocks = availableStocks[selectedPeriod.id];
      const stock = stocks.find(s => s.symbol === investment.symbol);
      if (stock) {
        const newPrice = calculateCurrentPrice(stock, newYear - selectedPeriod.startYear);
        return { ...investment, currentPrice: newPrice };
      }
      return investment;
    });
    setPortfolio(updatedPortfolio);
    
    // Calculate portfolio value
    const portfolioValue = cash + updatedPortfolio.reduce((sum, inv) => 
      sum + (inv.shares * inv.currentPrice), 0);
    
    // Add market data point
    const sp500Progress = selectedPeriod.initialSP500 + 
      ((selectedPeriod.finalSP500 - selectedPeriod.initialSP500) * 
       (newYear - selectedPeriod.startYear) / (selectedPeriod.endYear - selectedPeriod.startYear));
    
    const newDataPoint = {
      year: newYear,
      sp500: sp500Progress,
      portfolio: portfolioValue,
      events: getYearEvents(newYear)
    };
    
    setMarketData([...marketData, newDataPoint]);
    
    if (newYear >= selectedPeriod.endYear) {
      completeGame(portfolioValue);
    }
  };

  const getYearEvents = (year) => {
    if (!selectedPeriod) return [];
    
    const eventMap = {
      'dotcom-boom': {
        1996: ['Internet usage explodes'],
        1997: ['Amazon IPO raises $54M'],
        1998: ['Google founded in garage'],
        1999: ['Day trading mania peaks'],
        2000: ['Dot-com bubble bursts']
      },
      'financial-crisis': {
        2006: ['Housing prices peak'],
        2007: ['Subprime crisis emerges'],
        2008: ['Lehman Brothers fails'],
        2009: ['Market bottoms out'],
        2010: ['Recovery begins']
      },
      'tech-recovery': {
        2011: ['LinkedIn goes public'],
        2012: ['Facebook IPO'],
        2013: ['Twitter IPO'],
        2014: ['Mobile dominates'],
        2015: ['Tech stocks soar']
      }
    };
    
    return eventMap[selectedPeriod.id]?.[year] || [];
  };

  const completeGame = (finalValue) => {
    setGameComplete(true);
    setIsPlaying(false);
  };

  const resetGame = () => {
    setSelectedPeriod(null);
    setCurrentYear(0);
    setPortfolio([]);
    setCash(100000);
    setMarketData([]);
    setGameComplete(false);
    setIsPlaying(false);
  };

  const totalPortfolioValue = cash + portfolio.reduce((sum, inv) => 
    sum + (inv.shares * inv.currentPrice), 0);

  if (!selectedPeriod) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Time Traveler Investor
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Travel back in time and invest during major historical periods. 
            Learn how different eras affected the stock market.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {historicalPeriods.map((period) => (
              <div
                key={period.id}
                className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                onClick={() => startPeriod(period)}
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {period.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  {period.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {period.majorEvents.slice(0, 3).map((event, index) => (
                    <div key={index} className="text-xs text-neutral-500 dark:text-neutral-400">
                      • {event}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <span>{period.startYear}-{period.endYear}</span>
                  <span>S&P: {period.initialSP500} → {period.finalSP500}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {selectedPeriod.name}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Current Year: {currentYear}
            </p>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">Portfolio Value</p>
            <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
              ${totalPortfolioValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">Cash Available</p>
            <p className="text-xl font-bold text-green-900 dark:text-green-100">
              ${cash.toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">Total Return</p>
            <p className="text-xl font-bold text-yellow-900 dark:text-yellow-100">
              {((totalPortfolioValue - 100000) / 100000 * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Performance vs S&P 500
        </h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke="#ef4444"
                strokeWidth={2}
                name="S&P 500"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#2563eb"
                strokeWidth={2}
                name="Your Portfolio"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Stocks */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Available Stocks</h3>
          <div className="space-y-3">
            {availableStocks[selectedPeriod.id].map((stock) => {
              const currentPrice = calculateCurrentPrice(stock, currentYear - selectedPeriod.startYear);
              return (
                <div key={stock.symbol} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{stock.symbol}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      ${currentPrice.toFixed(2)}
                    </p>
                    <button
                      onClick={() => buyStock(stock.symbol, 1000)}
                      disabled={cash < 1000}
                      className="text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      Buy $1000
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio & Controls */}
        <div className="space-y-6">
          {/* Portfolio */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Your Holdings</h3>
            {portfolio.length > 0 ? (
              <div className="space-y-2">
                {portfolio.map((investment, index) => {
                  const currentValue = investment.shares * investment.currentPrice;
                  const gainLoss = currentValue - investment.amount;
                  const gainLossPercent = (gainLoss / investment.amount) * 100;
                  
                  return (
                    <div key={index} className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">{investment.symbol}</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {investment.shares.toFixed(2)} shares
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            ${currentValue.toFixed(2)}
                          </p>
                          <p className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400 text-center py-4">
                No investments yet. Start buying stocks!
              </p>
            )}
          </div>

          {/* Time Controls */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Time Controls</h3>
            {!gameComplete ? (
              <button
                onClick={advanceYear}
                disabled={currentYear >= selectedPeriod.endYear}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Clock className="h-4 w-4 mr-2" />
                Advance to {currentYear + 1}
              </button>
            ) : (
              <div className="text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Time Travel Complete!
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Final Portfolio Value: ${totalPortfolioValue.toLocaleString()}
                </p>
                <button
                  onClick={resetGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Try Another Period
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTraveler;