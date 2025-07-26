import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Trophy,
  Star,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Clock,
  BarChart3,
  Zap,
  Edit,
  Settings,
  Camera,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Format join date
  const date = new Date(user?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Student",
      });
    }
  }, [user]);

  const tabs = [
    { id: "overview", name: "Overview", icon: User },
    { id: "achievements", name: "Achievements", icon: Trophy },
    { id: "activity", name: "Activity", icon: Clock },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const stats = [
    {
      label: "Total XP",
      value: 425,
      icon: Star,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-800 dark:text-blue-300",
    },
    {
      label: "Current Level",
      value: user?.level || 3,
      icon: Trophy,
      color:
        "text-yellow-600 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-300",
    },
    {
      label: "Learning Streak",
      value: "7 days",
      icon: Zap,
      color:
        "text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-300",
    },
    {
      label: "Games Played",
      value: 23,
      icon: Target,
      color:
        "text-purple-600 bg-purple-100 dark:bg-purple-800 dark:text-purple-300",
    },
  ];

  const learningProgress = [
    {
      category: "Market Fundamentals",
      progress: 75,
      color: "bg-blue-600",
      completed: 15,
      total: 20,
    },
    {
      category: "Technical Analysis",
      progress: 45,
      color: "bg-green-600",
      completed: 9,
      total: 20,
    },
    {
      category: "Risk Management",
      progress: 30,
      color: "bg-yellow-600",
      completed: 6,
      total: 20,
    },
    {
      category: "Options Trading",
      progress: 15,
      color: "bg-purple-600",
      completed: 3,
      total: 20,
    },
  ];

  const recentActivity = [
    {
      type: "game",
      title: "Completed Fantasy Trading Challenge",
      description: "Earned 150 XP and achieved 12% portfolio return",
      time: "2 hours ago",
      xp: 150,
    },
    {
      type: "quiz",
      title: "AI Quiz: Understanding P/E Ratios",
      description: "Scored 85% on fundamental analysis quiz",
      time: "1 day ago",
      xp: 75,
    },
    {
      type: "mentor",
      title: "Mentor Session with Dr. Sarah Chen",
      description: "Discussed portfolio diversification strategies",
      time: "3 days ago",
      xp: 0,
    },
    {
      type: "achievement",
      title: 'Earned "Day Trader" Badge',
      description: "Completed 10 trades in Crisis Simulator",
      time: "5 days ago",
      xp: 200,
    },
  ];

  const badges = [
    {
      name: "First Trade",
      description: "Completed your first fantasy trade",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-12-15",
    },
    {
      name: "Quick Learner",
      description: "Completed 5 AI quizzes with 80%+ score",
      icon: "🧠",
      earned: true,
      earnedDate: "2024-12-18",
    },
    {
      name: "Day Trader",
      description: "Made 10 trades in a single day",
      icon: "⚡",
      earned: true,
      earnedDate: "2024-12-20",
    },
    {
      name: "Risk Manager",
      description: "Successfully navigated a crisis simulation",
      icon: "🛡️",
      earned: false,
      requirement: "Complete Crisis Simulator game",
    },
    {
      name: "Chart Master",
      description: "Identified 20 chart patterns correctly",
      icon: "📈",
      earned: false,
      requirement: "Score 90%+ in Chart Master",
    },
    {
      name: "Community Helper",
      description: "Received 50 upvotes on community answers",
      icon: "🤝",
      earned: false,
      requirement: "Help other community members",
    },
  ];

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      toast.error("Name and email are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to login to update your profile.");
        toast.error("You need to login to update your profile.");
        logout();
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please log in again.");
          toast.error("Session expired. Please log in again.");
          logout();
        } else {
          setError("Failed to update profile.");
          toast.error("Failed to update profile.");
        }
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      setFormData({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        role: updatedUser.role || "Student",
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        "Failed to update profile. Please check if the backend server is running."
      );
      toast.error(
        "Failed to update profile. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 text-neutral-900 dark:text-neutral-100">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          {loading && (
            <div className="text-center text-neutral-600 dark:text-neutral-400">
              Loading profile...
            </div>
          )}
          {error && (
            <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
          )}
          {!loading && !error && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-blue-600 dark:text-blue-300" />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-white dark:bg-neutral-700 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                  <Camera className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {user?.name || "Anonymous User"}
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {user?.role || "Student"} Investor
                    </p>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 space-x-2">
                      <span>Joined {formattedDate}</span>
                      <span>•</span>
                      <span>Level {user?.level || 1}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="mt-4 md:mt-0 flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>

                {/* XP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                    <span>Level {user?.level || 1} Progress</span>
                    <span>425 / 3000 XP</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((425 % 1000) / 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="text-center">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${stat.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-lg font-bold">{stat.value}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex justify-center items-center px-4 py-2 rounded-md font-medium transition-colors space-x-2 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-semibold mb-6">Learning Progress</h2>
              <div className="space-y-6">
                {learningProgress.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      <span>{item.category}</span>
                      <span>
                        {item.completed}/{item.total}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {item.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex space-x-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activity.type === "game"
                          ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300"
                          : activity.type === "quiz"
                            ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                            : activity.type === "mentor"
                              ? "bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300"
                              : "bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-300"
                      }`}
                    >
                      {activity.type === "game" && (
                        <Target className="h-4 w-4" />
                      )}
                      {activity.type === "quiz" && (
                        <BarChart3 className="h-4 w-4" />
                      )}
                      {activity.type === "mentor" && (
                        <User className="h-4 w-4" />
                      )}
                      {activity.type === "achievement" && (
                        <Trophy className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {activity.description}
                      </p>
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>{activity.time}</span>
                        {activity.xp > 0 && (
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            +{activity.xp} XP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-6">
              Achievements & Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border-2 ${
                    badge.earned
                      ? "border-green-200 bg-green-50 dark:bg-green-900"
                      : "border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {badge.description}
                    </p>
                    {badge.earned ? (
                      <div className="flex items-center justify-center text-green-600 dark:text-green-300 text-sm mt-2">
                        <Award className="h-4 w-4 mr-1" /> Earned{" "}
                        {badge.earnedDate}
                      </div>
                    ) : (
                      <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                        {badge.requirement}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-6">Activity History</h2>
            <div className="space-y-4">
              {recentActivity.concat(recentActivity).map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "game"
                        ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300"
                        : activity.type === "quiz"
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                          : activity.type === "mentor"
                            ? "bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300"
                            : "bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-300"
                    }`}
                  >
                    {activity.type === "game" && <Target className="h-5 w-5" />}
                    {activity.type === "quiz" && (
                      <BarChart3 className="h-5 w-5" />
                    )}
                    {activity.type === "mentor" && <User className="h-5 w-5" />}
                    {activity.type === "achievement" && (
                      <Trophy className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {activity.description}
                    </p>
                    <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                      <span>{activity.time}</span>
                      {activity.xp > 0 && (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          +{activity.xp} XP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            {error && (
              <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
            )}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="Student">Student</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white px-6 py-2 rounded-lg font-medium flex items-center"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
