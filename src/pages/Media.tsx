import { useState } from 'react';
import { Play, Image, Headphones, ShoppingBag, Heart, Share2, MessageCircle, Eye, Filter, Search, Star, Download, Rss } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMediaData } from '../hooks/useMediaData';
import { useMediaActions } from '../hooks/useMediaActions';

export default function Media() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('stream');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { mediaItems, loading } = useMediaData(activeTab, user?.id || null);
  const { toggleLike, toggleFollow, actionLoading } = useMediaActions(
    user?.id || null,
    () => alert('Please sign in to interact with content')
  );

  const categories = {
    stream: ['all', 'movie', 'music-video', 'documentaries', 'lifestyle', 'Go Live'],
    listen: ['all', 'greatest-of-all-time', 'latest-release', 'new-talent', 'DJ-mixtapes', 'UG-Unscripted', 'Afrobeat', 'hip-hop', 'RnB', 'Others'],
    blog: ['all', 'interviews', 'lifestyle', 'product-reviews', 'others'],
    gallery: ['all', 'design', 'photography', 'art', 'others'],
    resources: ['all', 'templates', 'ebooks', 'software', 'presets']
  };

  const tabs = [
    { id: 'stream', label: 'Stream', icon: <Play className="w-5 h-5" /> },
    { id: 'listen', label: 'Listen', icon: <Headphones className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <Rss className="w-5 h-5" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <ShoppingBag className="w-5 h-5" /> }
  ];

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = (item: typeof mediaItems[0]) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out "${item.title}" by ${item.creator}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('Share feature not supported on this browser');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Media</h1>
          <p className="text-gray-300">Celebrate amazing content from the Creators of your choice.</p>
        </div>

        <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-md p-2 rounded-xl overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedCategory('all');
              }}
              className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            >
              {categories[activeTab as keyof typeof categories]?.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            <p className="text-gray-300 mt-4">Loading content...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
                <div className="relative aspect-video bg-gray-800">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {activeTab === 'stream' && <Play className="w-12 h-12 text-white" />}
                    {activeTab === 'listen' && <Headphones className="w-12 h-12 text-white" />}
                    {activeTab === 'blog' && <Rss className="w-12 h-12 text-white" />}
                    {activeTab === 'gallery' && <Image className="w-12 h-12 text-white" />}
                    {activeTab === 'resources' && <ShoppingBag className="w-12 h-12 text-white" />}
                  </div>

                  {item.is_premium && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                      PREMIUM
                    </div>
                  )}

                  {item.duration && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {item.duration}
                    </div>
                  )}
                  {item.read_time && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {item.read_time}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.creator}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    {activeTab === 'stream' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${item.is_liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{item.like_count || 0}</span>
                        </div>
                      </>
                    )}
                    {activeTab === 'listen' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <Play className="w-4 h-4" />
                          <span>{item.views?.toLocaleString()} plays</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${item.is_liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{item.like_count || 0}</span>
                        </div>
                      </>
                    )}
                    {activeTab === 'blog' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{Math.floor(Math.random() * 100)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${item.is_liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{item.like_count || 0}</span>
                        </div>
                      </>
                    )}
                    {activeTab === 'gallery' && (
                      <div className="flex items-center space-x-1">
                        <Heart className={`w-4 h-4 ${item.is_liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{item.like_count || 0}</span>
                      </div>
                    )}
                    {activeTab === 'resources' && (
                      <>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{item.rating?.toFixed(1)}</span>
                        </div>
                        <div className="text-rose-400 font-bold">UGX {item.price?.toLocaleString()}</div>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {activeTab === 'resources' ? (
                      <>
                        <button className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                          Buy Now
                        </button>
                        <button className="p-2 bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleFollow(item.creator, item.is_followed || false)}
                          disabled={actionLoading === `follow-${item.creator}`}
                          className={`flex-1 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium ${
                            item.is_followed
                              ? 'bg-white/20 text-white'
                              : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                          }`}
                        >
                          {actionLoading === `follow-${item.creator}` ? '...' : item.is_followed ? 'Following' : 'Follow'}
                        </button>
                        <button
                          onClick={() => toggleLike(item.id, item.is_liked || false)}
                          disabled={actionLoading === `like-${item.id}`}
                          className="p-2 bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white rounded-lg transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${item.is_liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleShare(item)}
                          className="p-2 bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white rounded-lg transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {item.is_premium && (!user || user.tier === 'free') && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-lg">
                      <p className="text-yellow-400 text-xs mb-2">Premium content - Subscribe to unlock</p>
                      <button
                        className="w-full py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded hover:shadow-lg transition-all"
                      >
                        Subscribe Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {activeTab === 'stream' && <Play className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'listen' && <Headphones className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'blog' && <Rss className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'gallery' && <Image className="w-16 h-16 mx-auto mb-4" />}
              {activeTab === 'resources' && <ShoppingBag className="w-16 h-16 mx-auto mb-4" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No content available</h3>
            <p className="text-gray-400">Check back later for new {activeTab} content!</p>
          </div>
        )}
      </div>
    </div>
  );
}
