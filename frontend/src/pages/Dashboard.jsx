import React from 'react';
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Clock, 
  Star, 
  ArrowRight,
  Brain,
  GamepadIcon,
  Users,
  MessageSquare,
  BarChart3,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      label: 'Current Level',
      value: 1,
      icon: Trophy,
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      label: 'Experience Points',
      value: 0,
      icon: Star,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Learning Streak',
      value: '0 days',
      icon: Zap,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Badges Earned',
      value: 0,
      icon: Target,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  const quickActions = [
    {
      title: 'AI Investment Assistant',
      description: 'Ask questions about investing and get instant AI-powered answers',
      icon: Brain,
      href: '/ai-assistant',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
    },
    {
      title: 'Play Trading Games',
      description: 'Practice your skills with fantasy trading and market simulations',
      icon: GamepadIcon,
      href: '/games',
      color: 'bg-green-50 hover:bg-green-100 text-green-600',
    },
    {
      title: 'Book a Mentor',
      description: 'Schedule 1-on-1 sessions with certified market professionals',
      icon: Users,
      href: '/mentors',
      color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Join Community',
      description: 'Connect with peers and participate in investment discussions',
      icon: MessageSquare,
      href: '/community',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
    },
  ];

  const recentActivity = [
    {
      title: 'Completed Fantasy Trading Challenge',
      description: 'Earned 150 XP and "Day Trader" badge',
      time: '2 hours ago',
      type: 'achievement',
    },
    {
      title: 'AI Quiz: Understanding P/E Ratios',
      description: 'Scored 85% - Great job!',
      time: '1 day ago',
      type: 'quiz',
    },
    {
      title: 'Mentor Session with Sarah Chen',
      description: 'Discussed portfolio diversification strategies',
      time: '3 days ago',
      type: 'mentorship',
    },
    {
      title: 'Crisis Simulator: 2008 Financial Crisis',
      description: 'Successfully navigated market crash scenario',
      time: '5 days ago',
      type: 'game',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Live Q&A: Market Analysis Basics',
      date: 'Today, 7:00 PM',
      mentor: 'Dr. Michael Thompson',
    },
    {
      title: 'Weekly Trading Competition',
      date: 'Tomorrow, 9:00 AM',
      mentor: 'Community Challenge',
    },
    {
      title: 'AI-Generated Quiz: Options Trading',
      date: 'Dec 30, 2:00 PM',
      mentor: 'Personalized Learning',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Welcome back, Guest User! 👋
          </h1>
          <p className="text-neutral-600 mt-2">
            Ready to continue your investment learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-200 cursor-pointer ${action.color}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                      <p className="text-sm opacity-75 mb-3">{action.description}</p>
                      <div className="flex items-center text-sm font-medium">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'mentorship' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'achievement' && <Trophy className="h-4 w-4" />}
                    {activity.type === 'quiz' && <Brain className="h-4 w-4" />}
                    {activity.type === 'mentorship' && <Users className="h-4 w-4" />}
                    {activity.type === 'game' && <GamepadIcon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900">{activity.title}</h3>
                    <p className="text-sm text-neutral-600">{activity.description}</p>
                    <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Upcoming Events</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Calendar
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 border border-neutral-200 rounded-lg hover:border-blue-200 transition-colors">
                  <h3 className="font-medium text-neutral-900 mb-1">{event.title}</h3>
                  <div className="flex items-center text-sm text-neutral-600 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <p className="text-sm text-neutral-600">{event.mentor}</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                    Join Event →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">Market Fundamentals</h3>
              <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-neutral-600 mt-1">75% Complete</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">Technical Analysis</h3>
              <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-neutral-600 mt-1">45% Complete</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-neutral-900">Risk Management</h3>
              <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-sm text-neutral-600 mt-1">30% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;