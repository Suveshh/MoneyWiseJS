import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  MessageSquare,
  ThumbsUp,
  Star,
  Clock,
  User,
  Tag,
  TrendingUp,
  Search,
  Plus,
  Filter,
  CheckCircle,
  Award,
  X,
  Send,
  Trash2,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Community = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: "recent", name: "Recent", icon: Clock },
    { id: "unanswered", name: "Unanswered", icon: MessageSquare },
    { id: "posts", name: "Expert Answers", icon: Star },
  ];
  const availableTags = [
    "stocks",
    "options",
    "crypto",
    "technical-analysis",
    "fundamental-analysis",
    "portfolio",
    "beginner",
    "risk-management",
    "dividends",
    "etf",
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You need to login to view questions.");
          toast.error("You need to login to view questions.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/questions/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Session expired. Please log in again.");
            toast.error("Session expired. Please log in again.");
            logout();
          } else if (response.status === 500) {
            setError("Server error. Please ensure the backend is running.");
            toast.error("Server error. Please ensure the backend is running.");
          }
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Questions API response:", JSON.stringify(data, null, 2));
        const transformedQuestions = data.map((question) => {
          const bestAnswer =
            question.answers.length > 0 ? question.answers[0] : null;
          console.log(
            `Question ${question._id} best answer author:`,
            bestAnswer?.author
          );
          return {
            id: question._id,
            title: question.title,
            content: question.content || "Content not available",
            author: {
              _id: question.author?._id || null,
              name: question.author?.name || "Anonymous User",
              avatar:
                question.author?.avatar ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2",
              level: question.author?.level || 1,
              isExpert: question.author?.role === "Expert",
            },
            tags: question.tags || [],
            votes: 0,
            answers: question.answers.length,
            views: 0,
            timeAgo: new Date(question.createdAt).toLocaleString(),
            createdAt: new Date(question.createdAt), // Store for sorting
            hasExpertAnswer: question.answers.some((answer) => {
              const isExpert = answer.author?.role === "Expert";
              console.log(
                `Answer ${answer._id} isExpert:`,
                isExpert,
                answer.author
              );
              return isExpert;
            }),
            bestAnswer: bestAnswer
              ? {
                  answerId: bestAnswer._id,
                  author: {
                    name: bestAnswer.author?.name || "Unknown",
                    avatar:
                      bestAnswer.author?.avatar ||
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=compress&cs=tinysrgb&w=50&h=50",
                    isExpert: bestAnswer.author?.role === "Expert",
                    title: bestAnswer.author?.title || "",
                  },
                  content: bestAnswer.content || "No answer available",
                  votes: 0,
                  timeAgo: new Date(bestAnswer.createdAt).toLocaleString(),
                }
              : null,
          };
        });
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(
          "Failed to load questions. Please check if the backend server is running."
        );
        toast.error(
          "Failed to load questions. Please check if the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [logout]);

  const handleAddPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError("Please provide a title and content for the question.");
      toast.error("Please provide a title and content for the question.");
      return;
    }

    setLoading(true);
    setError(null);

    const question = {
      title: newPost.title,
      content: newPost.content,
      tags: newPost.tags,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(question),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please log in again.");
          toast.error("Session expired. Please log in again.");
          logout();
        } else if (response.status === 500) {
          setError("Server error. Please ensure the backend is running.");
          toast.error("Server error. Please ensure the backend is running.");
        }
        throw new Error(`Failed to post question: ${response.statusText}`);
      }

      const savedQuestion = await response.json();
      const transformedQuestion = {
        id: savedQuestion._id,
        title: savedQuestion.title,
        content: savedQuestion.content || "Content not available",
        author: {
          _id: user?._id || savedQuestion.author?._id || null,
          name: user?.name || savedQuestion.author?.name || "Anonymous User",
          avatar:
            user?.avatar ||
            savedQuestion.author?.avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2",
          level: user?.level || 1,
          isExpert: user?.role === "Expert",
        },
        tags: savedQuestion.tags || [],
        votes: 0,
        answers: 0,
        views: 0,
        timeAgo: new Date(savedQuestion.createdAt).toLocaleString(),
        createdAt: new Date(savedQuestion.createdAt),
        hasExpertAnswer: false,
        bestAnswer: null,
      };
      setQuestions((prev) => [transformedQuestion, ...prev]);
      setNewPost({ title: "", content: "", tags: [] });
      setShowAddPost(false);
      toast.success("Question posted successfully!");
    } catch (error) {
      console.error("Error posting question:", error);
      setError(
        "Failed to post question. Please check if the backend server is running."
      );
      toast.error(
        "Failed to post question. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/questions/${questionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please log in again.");
          toast.error("Session expired. Please log in again.");
          logout();
        } else if (response.status === 500) {
          setError("Server error. Please ensure the backend is running.");
          toast.error("Server error. Please ensure the backend is running.");
        }
        throw new Error(`Failed to delete question: ${response.statusText}`);
      }

      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      toast.success("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      setError(
        "Failed to delete question. Please check if the backend server is running."
      );
      toast.error(
        "Failed to delete question. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId) => {
    if (!user) {
      toast.error("Please log in to answer questions.");
      return;
    }
    setSelectedQuestionId(questionId);
    setShowAnswerModal(true);
  };

  const handleAddAnswer = async () => {
    if (!answerContent.trim()) {
      setError("Please provide an answer.");
      toast.error("Please provide an answer.");
      return;
    }

    setLoading(true);
    setError(null);

    const answer = {
      questionId: selectedQuestionId,
      content: answerContent,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/answers/${selectedQuestionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(answer),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please log in again.");
          toast.error("Session expired. Please log in again.");
          logout();
        } else if (response.status === 500) {
          setError("Server error. Please ensure the backend is running.");
          toast.error("Server error. Please ensure the backend is running.");
        }
        throw new Error(`Failed to post answer: ${response.statusText}`);
      }

      const savedAnswer = await response.json();
      console.log("Saved answer:", JSON.stringify(savedAnswer, null, 2));
      const transformedAnswer = {
        answerId: savedAnswer._id,
        author: {
          name: savedAnswer.author?.name || "Unknown",
          avatar:
            savedAnswer.author?.avatar ||
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=compress&cs=tinysrgb&w=50&h=50",
          isExpert: savedAnswer.author?.role === "Expert",
          title: savedAnswer.author?.title || "",
        },
        content: savedAnswer.content || "No answer available",
        votes: 0,
        timeAgo: new Date(savedAnswer.createdAt || Date.now()).toLocaleString(),
      };

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === selectedQuestionId
            ? {
                ...q,
                answers: q.answers + 1,
                bestAnswer: transformedAnswer,
                hasExpertAnswer:
                  savedAnswer.author?.role === "Expert" || q.hasExpertAnswer,
              }
            : q
        )
      );
      setAnswerContent("");
      setShowAnswerModal(false);
      setSelectedQuestionId(null);
      toast.success("Answer posted successfully!");
    } catch (error) {
      console.error("Error posting answer:", error);
      setError(
        "Failed to post answer. Please check if the backend server is running."
      );
      toast.error(
        "Failed to post answer. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (
      newTag.trim() &&
      !newPost.tags.includes(newTag.trim()) &&
      newPost.tags.length < 5
    ) {
      setNewPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const filteredQuestions = questions
    .filter((question) => {
      const matchesSearch =
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.content.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeTab === "unanswered") {
        return matchesSearch && question.answers === 0;
      }
      if (activeTab === "posts") {
        return matchesSearch && question.hasExpertAnswer;
      }
      return matchesSearch; // For "recent" tab
    })
    .sort((a, b) => {
      if (activeTab === "recent") {
        return b.createdAt - a.createdAt; // Most recent first
      }
      return 0; // No sorting for other tabs
    });

  const topContributors = [
    {
      name: "Dr. Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=compress&cs=tinysrgb&w=50&h=50",
      isExpert: true,
      reputation: 15247,
      answers: 342,
      helpful: 98.5,
    },
    {
      name: "Michael Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=compress&cs=tinysrgb&w=50&h=50",
      isExpert: true,
      reputation: 12890,
      answers: 278,
      helpful: 96.8,
    },
    {
      name: "Emily Johnson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=compress&cs=tinysrgb&w=50&h=50",
      isExpert: true,
      reputation: 9456,
      answers: 189,
      helpful: 94.2,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Investment Community
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Ask questions, share knowledge, and learn from fellow investors
              and experts.
            </p>
          </div>
          <button
            onClick={() => setShowAddPost(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ask Question
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors flex-1 justify-center ${
                        activeTab === tab.id
                          ? "bg-white dark:bg-neutral-700 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center text-neutral-600 dark:text-neutral-400">
                Loading questions...
              </div>
            )}

            {/* Questions List */}
            {!loading && filteredQuestions.length === 0 && !error && (
              <div className="text-center text-neutral-600 dark:text-neutral-400">
                No questions found.
              </div>
            )}
            {!loading && filteredQuestions.length > 0 && (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex-1 mr-4">
                        {question.title}
                      </h3>
                      {question.hasExpertAnswer && (
                        <span className="flex items-center px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-full">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Expert Answer
                        </span>
                      )}
                    </div>

                    {/* Question Content */}
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                      {question.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Question Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center text-neutral-500 dark:text-neutral-400">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {question.answers} answers
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <img
                            src={question.author.avatar}
                            alt={question.author.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <div className="text-sm">
                            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                              {question.author.name}
                            </span>
                            {question.author.isExpert && (
                              <Star className="h-3 w-3 text-yellow-500 inline ml-1" />
                            )}
                            <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                              Level {question.author.level} • {question.timeAgo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Best Answer Preview */}
                    {question.bestAnswer && (
                      <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">
                            Best Answer
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <img
                            src={question.bestAnswer.author.avatar}
                            alt={question.bestAnswer.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                                {question.bestAnswer.author.name}
                              </span>
                              {question.bestAnswer.author.isExpert && (
                                <span className="ml-2 flex items-center px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
                                  <Award className="h-3 w-3 mr-1" />
                                  Expert
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {question.bestAnswer.content}
                            </p>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              {question.bestAnswer.timeAgo}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-end space-x-3">
                      {user ? (
                        <>
                          {user.role === "Expert" ? (
                            <button
                              onClick={() => handleAnswer(question.id)}
                              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Answer
                            </button>
                          ) : (
                            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                              Only experts can answer questions.
                            </span>
                          )}
                          {user._id === question.author._id && (
                            <button
                              onClick={() => handleDelete(question.id)}
                              className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 text-sm">
                          Please log in to answer or delete questions.
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 text-neutral-600 dark:text-neutral-400 text-sm rounded-full transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Top Contributors
              </h3>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {contributor.name}
                        </span>
                        {contributor.isExpert && (
                          <Star className="h-3 w-3 text-blue-500 ml-1" />
                        )}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {contributor.reputation} rep • {contributor.answers}{" "}
                        answers
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Total Questions
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    12,847
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Expert Answers
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    8,234
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Active Members
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    4,567
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    This Week
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    +234 questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Question Modal */}
        {showAddPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Ask a Question
                </h2>
                <button
                  onClick={() => setShowAddPost(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="What's your investment question?"
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Question Details
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Provide more details about your question..."
                    rows={6}
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Tags (up to 5)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                    />
                    <button
                      onClick={addTag}
                      disabled={!newTag.trim() || newPost.tags.length >= 5}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {availableTags
                      .filter((tag) => !newPost.tags.includes(tag))
                      .map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (newPost.tags.length < 5) {
                              setNewPost((prev) => ({
                                ...prev,
                                tags: [...prev.tags, tag],
                              }));
                            }
                          }}
                          className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-neutral-600 dark:text-neutral-400 hover:text-blue-700 dark:hover:text-blue-400 rounded transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddPost(false)}
                    className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPost}
                    disabled={
                      loading ||
                      !newPost.title.trim() ||
                      !newPost.content.trim()
                    }
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post Question
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Answer Modal */}
        {showAnswerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Post an Answer
                </h2>
                <button
                  onClick={() => {
                    setShowAnswerModal(false);
                    setAnswerContent("");
                    setSelectedQuestionId(null);
                  }}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                    placeholder="Provide your answer..."
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => {
                      setShowAnswerModal(false);
                      setAnswerContent("");
                      setSelectedQuestionId(null);
                    }}
                    className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAnswer}
                    disabled={loading || !answerContent.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post Answer
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
