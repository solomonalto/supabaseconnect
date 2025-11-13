import { Link } from 'react-router-dom';
import { Play, Headphones, Image, ShoppingBag, Rss } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 mt-20">
          <h1 className="text-6xl font-bold text-white mb-6">
            Discover Amazing <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">Content</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stream videos, listen to music, explore galleries, and support your favorite creators all in one place.
          </p>
          <Link
            to="/media"
            className="inline-block px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl transition-all text-lg"
          >
            Explore Media
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Stream</h3>
            <p className="text-gray-300">
              Watch amazing videos, music videos, short films, and documentaries from talented creators.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Listen</h3>
            <p className="text-gray-300">
              Discover new music, DJ mixtapes, and audio content from emerging and established artists.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Rss className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Read</h3>
            <p className="text-gray-300">
              Stay informed with interviews, lifestyle articles, and product reviews from industry experts.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Image className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Gallery</h3>
            <p className="text-gray-300">
              Browse stunning photography, design work, and digital art from creative professionals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Resources</h3>
            <p className="text-gray-300">
              Purchase templates, sound kits, presets, and digital products from top creators.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                <path d="M10 7a1 1 0 011 1v2.586l1.707 1.707a1 1 0 01-1.414 1.414l-2-2A1 1 0 019 11V8a1 1 0 011-1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-time Updates</h3>
            <p className="text-gray-300">
              See likes and follows update in real-time as the community interacts with content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
