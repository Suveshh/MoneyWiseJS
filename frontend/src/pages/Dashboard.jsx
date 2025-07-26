import React from "react";
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
  Zap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const stats = [
    {
      label: "Current Level",
      value: 1,
      icon: Trophy,
      color:
        "text-yellow-600 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-200 dark:bg-opacity-30",
    },
    {
      label: "Experience Points",
      value: 0,
      icon: Star,
      color:
        "text-blue-600 bg-blue-100 dark:bg-blue-700 dark:text-blue-200 dark:bg-opacity-30",
    },
    {
      label: "Learning Streak",
      value: "0 days",
      icon: Zap,
      color:
        "text-green-600 bg-green-100 dark:bg-green-700 dark:text-green-200 dark:bg-opacity-30",
    },
    {
      label: "Badges Earned",
      value: 0,
      icon: Target,
      color:
        "text-purple-600 bg-purple-100 dark:bg-purple-700 dark:text-purple-200 dark:bg-opacity-30",
    },
  ];

  const quickActions = [
    {
      title: "AI Investment Assistant",
      description:
        "Ask questions about investing and get instant AI-powered answers",
      icon: Brain,
      href: "/ai-assistant",
      color:
        "bg-blue-50 dark:bg-blue-700 hover:bg-blue-100 dark:hover:bg-blue-500 text-blue-600 dark:text-blue-100 dark:bg-opacity-30",
    },
    {
      title: "Play Trading Games",
      description:
        "Practice your skills with fantasy trading and market simulations",
      icon: GamepadIcon,
      href: "/games",
      color:
        "bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 text-green-600 dark:text-green-300 dark:bg-opacity-30",
    },
    {
      title: "Book a Mentor",
      description:
        "Schedule 1-on-1 sessions with certified market professionals",
      icon: Users,
      href: "/mentors",
      color:
        "bg-yellow-50 dark:bg-yellow-900 hover:bg-yellow-100 dark:hover:bg-yellow-800 text-yellow-600 dark:text-yellow-300 dark:bg-opacity-30",
    },
    {
      title: "Join Community",
      description:
        "Connect with peers and participate in investment discussions",
      icon: MessageSquare,
      href: "/community",
      color:
        "bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300 dark:bg-opacity-30",
    },
  ];

  const recentActivity = [
    {
      title: "Completed Fantasy Trading Challenge",
      description: 'Earned 150 XP and "Day Trader" badge',
      time: "2 hours ago",
      type: "achievement",
    },
    {
      title: "AI Quiz: Understanding P/E Ratios",
      description: "Scored 85% - Great job!",
      time: "1 day ago",
      type: "quiz",
    },
    {
      title: "Mentor Session with Sarah Chen",
      description: "Discussed portfolio diversification strategies",
      time: "3 days ago",
      type: "mentorship",
    },
    {
      title: "Crisis Simulator: 2008 Financial Crisis",
      description: "Successfully navigated market crash scenario",
      time: "5 days ago",
      type: "game",
    },
  ];

  const upcomingEvents = [
    {
      title: "Live Q&A: Market Analysis Basics",
      date: "Today, 7:00 PM",
      mentor: "Dr. Michael Thompson",
    },
    {
      title: "Weekly Trading Competition",
      date: "Tomorrow, 9:00 AM",
      mentor: "Community Challenge",
    },
    {
      title: "AI-Generated Quiz: Options Trading",
      date: "Dec 30, 2:00 PM",
      mentor: "Personalized Learning",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "Guest"}! 👋 
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Ready to continue your investment learning journey?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ label, value, icon: Icon, color }, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {label}
                  </p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map(
              ({ title, description, icon: Icon, color }, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl transition-all duration-200 cursor-pointer ${color}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white dark:bg-neutral-700 rounded-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{title}</h3>
                      <p className="text-sm opacity-75 mb-3">{description}</p>
                      <div className="flex items-center text-sm font-medium">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Activities and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((a, i) => {
                const iconMap = {
                  achievement: <Trophy className="h-4 w-4" />,
                  quiz: <Brain className="h-4 w-4" />,
                  mentorship: <Users className="h-4 w-4" />,
                  game: <GamepadIcon className="h-4 w-4" />,
                };
                const bgMap = {
                  achievement:
                    "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
                  quiz: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
                  mentorship:
                    "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
                  game: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
                };
                return (
                  <div
                    key={i}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${bgMap[a.type]}`}>
                      {iconMap[a.type]}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{a.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {a.description}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                View Calendar
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, i) => (
                <div
                  key={i}
                  className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-blue-200 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-medium mb-1">{event.title}</h3>
                  <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {event.mentor}
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2">
                    Join Event →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="mt-8 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-semibold mb-6">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgressCard
              icon={
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              }
              title="Market Fundamentals"
              percent={75}
              color="bg-blue-600"
            />
            <ProgressCard
              icon={
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              }
              title="Technical Analysis"
              percent={45}
              color="bg-green-600"
            />
            <ProgressCard
              icon={
                <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              }
              title="Risk Management"
              percent={30}
              color="bg-yellow-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressCard = ({ icon, title, percent, color }) => (
  <div className="text-center">
    <div className="w-20 h-20 bg-blue-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-3">
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
    <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2 mt-2">
      <div
        className={`${color} h-2 rounded-full`}
        style={{ width: `${percent}%` }}
      />
    </div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
      {percent}% Complete
    </p>
  </div>
);

export default Dashboard;
