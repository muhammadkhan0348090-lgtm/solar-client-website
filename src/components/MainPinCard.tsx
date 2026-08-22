import React, { useState } from 'react';
import { ArrowLeft, Maximize2, RefreshCw, ChevronDown, ChevronUp, Smile, Image as ImageIcon, Heart, Send, Bookmark, Share2, Tag, Zap, ShieldCheck, TrendingDown, CheckCircle2 } from 'lucide-react';
import { PinItem, Comment } from '../types';

interface MainPinCardProps {
  pin: PinItem;
  onBack?: () => void;
  onOpenLightbox: (imageUrl: string) => void;
  onRemixImage?: () => void;
  onSavePin: (pinId: string) => void;
  isSaved: boolean;
  onAddComment: (text: string) => void;
  onToggleCommentLike: (commentId: string) => void;
  onOpenPakistanRates?: () => void;
}

export const MainPinCard: React.FC<MainPinCardProps> = ({
  pin,
  onBack,
  onOpenLightbox,
  onRemixImage,
  onSavePin,
  isSaved,
  onAddComment,
  onToggleCommentLike,
  onOpenPakistanRates,
}) => {
  const [commentsExpanded, setCommentsExpanded] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const quickEmojis = ['❤️', '☀️', '⚡', '🌿', '🔥', '👏', '😍', '💡'];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText.trim());
    setCommentText('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setCommentText((prev) => prev + emoji);
  };

  const price = pin.solarPrice;

  return (
    <article
      id="main-pin-card"
      className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden transition-all flex flex-col lg:flex-row max-w-5xl text-white"
    >
      {/* Left Column: Visual Showcase */}
      <div className="relative lg:w-3/5 bg-slate-950 flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden group border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Top-left Back Button */}
        <button
          id="pin-back-btn"
          onClick={onBack}
          title="Go back"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-slate-900/90 text-white hover:bg-slate-800 flex items-center justify-center shadow-lg border border-slate-700 transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Real Pakistan Price Tag Overlay on Image */}
        {price && (
          <div
            id="pakistan-price-tag-badge"
            className="absolute top-4 left-16 z-20 bg-emerald-950/90 backdrop-blur-xl border border-emerald-400/50 text-white px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-emerald-300">
              Rs. {price.pricePerWattPkr} / Watt
            </span>
            <span className="text-slate-300 border-l border-emerald-700/60 pl-2 font-semibold">
              Rs. {price.pricePerPlatePkr.toLocaleString()} / Plate
            </span>
          </div>
        )}

        {/* Pin Main Image */}
        <img
          id="pin-featured-image"
          src={pin.imageUrl}
          alt={pin.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover max-h-[560px] transition-all duration-300 ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
          }`}
        />

        {/* Floating Action Overlay Buttons on Image */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          {/* Lightbox / Fullscreen Expand Button */}
          <button
            id="pin-expand-btn"
            onClick={() => onOpenLightbox(pin.imageUrl)}
            title="Expand view"
            className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg backdrop-blur-md border border-slate-700 transition-transform hover:scale-105"
          >
            <Maximize2 className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Remix / Refresh Angle Button */}
          <button
            id="pin-remix-btn"
            onClick={onRemixImage}
            title="Rotate / Alternate solar view"
            className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg backdrop-blur-md border border-slate-700 transition-transform hover:scale-105 active:rotate-180 duration-300"
          >
            <RefreshCw className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Top-Right Quick Save Pill */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            id="pin-quick-save-btn"
            onClick={() => onSavePin(pin.id)}
            className={`px-4 py-2 rounded-full font-bold text-sm shadow-xl transition-colors flex items-center gap-1.5 ${
              isSaved
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Right Column: Pin Details, Real Pakistani Pricing & Comments Feed */}
      <div className="lg:w-2/5 p-6 flex flex-col justify-between bg-slate-900/90 border-t lg:border-t-0 border-slate-800">
        <div className="space-y-4">
          {/* Creator Profile Row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fuchsia-600 text-white font-bold text-base flex items-center justify-center shadow-md border border-fuchsia-400/40">
                {pin.author.initial || 'M'}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  {pin.author.name}
                </h3>
                {pin.author.followers && (
                  <p className="text-xs text-slate-400 font-medium">{pin.author.followers} followers</p>
                )}
              </div>
            </div>

            <button
              id="author-follow-btn"
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                isFollowing
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Pin Title & Info */}
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white leading-snug">
              {pin.title}
            </h1>
            {pin.description && (
              <p className="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">
                {pin.description}
              </p>
            )}
          </div>

          {/* Pakistan Solar Price Card Widget */}
          {price && (
            <div id="pak-solar-rate-card" className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pakistan Market Rate (PKR)</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  {price.stockStatus || 'Karachi/Lahore Stock'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-800/60">
                <div className="bg-slate-900/90 rounded-xl p-2 border border-emerald-500/30">
                  <p className="text-[10px] text-slate-400 font-medium">Per Watt Price</p>
                  <p className="text-sm font-black text-emerald-400">Rs. {price.pricePerWattPkr} / W</p>
                </div>
                <div className="bg-slate-900/90 rounded-xl p-2 border border-emerald-500/30">
                  <p className="text-[10px] text-slate-400 font-medium">Per Plate (585W-600W)</p>
                  <p className="text-sm font-black text-emerald-400">Rs. {price.pricePerPlatePkr.toLocaleString()}</p>
                </div>
              </div>

              {price.estimatedSystemCostPkr && (
                <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-emerald-900/60">
                  <span>Complete {price.systemSizeKw}kW System Est:</span>
                  <span className="font-bold text-amber-300">Rs. {price.estimatedSystemCostPkr.toLocaleString()} PKR</span>
                </div>
              )}

              {onOpenPakistanRates && (
                <button
                  type="button"
                  onClick={onOpenPakistanRates}
                  className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform active:scale-98"
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Calculate Monthly Bill Payback & ROI (PKR)</span>
                </button>
              )}
            </div>
          )}

          {/* Comments Section Accordion */}
          <div>
            <button
              id="toggle-comments-accordion-btn"
              onClick={() => setCommentsExpanded(!commentsExpanded)}
              className="flex items-center justify-between w-full text-left py-1 group"
            >
              <h4 className="text-sm sm:text-base font-bold text-white">
                {pin.comments.length} Comments
              </h4>
              <span className="p-1 rounded-full text-slate-400 group-hover:bg-slate-800 transition-colors">
                {commentsExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            {/* Comments List */}
            {commentsExpanded && (
              <div
                id="pin-comments-list"
                className="mt-2 space-y-2.5 max-h-44 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700"
              >
                {pin.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2 group">
                    {/* Commenter Avatar */}
                    {comment.avatar ? (
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                      />
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-full ${
                          comment.authorColor || 'bg-blue-600'
                        } text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        {comment.authorInitial || comment.initial || comment.author.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Comment Content */}
                    <div className="flex-1 text-xs">
                      <div className="bg-slate-950/90 rounded-2xl px-3 py-1.5 border border-slate-800">
                        <span className="font-bold text-amber-300 mr-2 text-[11px]">
                          {comment.author}
                        </span>
                        <span className="text-slate-200 text-[11px] break-words font-medium">
                          {comment.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 px-2 text-[10px] text-slate-400">
                        <span>{comment.timestamp}</span>
                        <button
                          onClick={() => onToggleCommentLike(comment.id)}
                          className={`hover:text-red-400 flex items-center gap-1 font-medium transition-colors ${
                            comment.isLiked ? 'text-red-400' : ''
                          }`}
                        >
                          <Heart
                            className={`w-2.5 h-2.5 ${
                              comment.isLiked ? 'fill-red-500 text-red-500' : ''
                            }`}
                          />
                          {comment.likes > 0 && comment.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom "Add a comment" Input */}
        <div className="pt-3 mt-2 border-t border-slate-800 relative">
          {/* Emoji Popover */}
          {showEmojiPicker && (
            <div
              id="comment-emoji-popover"
              className="absolute bottom-16 right-0 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl flex gap-1 z-30 animate-in fade-in zoom-in-95"
            >
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-7 h-7 rounded-lg hover:bg-slate-800 flex items-center justify-center text-sm hover:scale-115 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmitComment}
            id="add-comment-form"
            className="flex items-center gap-2 bg-slate-950/90 rounded-full px-4 py-2 border border-slate-700 focus-within:border-amber-400 focus-within:bg-slate-950 transition-all"
          >
            <input
              id="add-comment-input"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment or ask for price in PKR..."
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-400 focus:outline-hidden font-medium"
            />

            {/* Emoji toggle button */}
            <button
              id="emoji-picker-toggle-btn"
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Add emoji"
              className={`p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                showEmojiPicker ? 'text-amber-400 bg-amber-500/20' : ''
              }`}
            >
              <Smile className="w-4.5 h-4.5" />
            </button>

            {/* Image attachment / sticker button */}
            <button
              id="image-sticker-btn"
              type="button"
              onClick={() => {
                const sampleEmojis = ['☀️ Rs. 29.5/W Best!', '⚡ 585W Tier-1', '🇵🇰 Lahore In-Stock'];
                const random = sampleEmojis[Math.floor(Math.random() * sampleEmojis.length)];
                setCommentText((prev) => (prev ? prev + ' ' + random : random));
              }}
              title="Add sticker or tag"
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ImageIcon className="w-4.5 h-4.5" />
            </button>

            {/* Send Button if text exists */}
            {commentText.trim() && (
              <button
                id="comment-submit-btn"
                type="submit"
                title="Send comment"
                className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center hover:bg-amber-400 transition-transform active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>
    </article>
  );
};
