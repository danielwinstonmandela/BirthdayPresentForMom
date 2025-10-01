import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Confetti Component
function Confetti() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <motion.di  // Use dynamic image data or fallback to default
  const messages = imageData.length > 0 ? imageData : getDefaultMessages();}
      className="confetti-piece"
      initial={{ 
        x: Math.random() * window.innerWidth, 
        y: -20, 
        rotate: 0,
        scale: 0
      }}
      animate={{ 
        y: window.innerHeight + 100, 
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        scale: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 3 + Math.random() * 2, 
        ease: "easeOut",
        delay: Math.random() * 0.5
      }}
      style={{
        backgroundColor: ['#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)]
      }}
    />
  ));
  
  return (
    <div className="confetti-container">
      {confettiPieces}
    </div>
  );
}

// Floating Hearts Component
function FloatingHearts() {
  const hearts = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="floating-heart"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20
      }}
      animate={{ 
        y: -100,
        x: Math.random() * window.innerWidth
      }}
      transition={{ 
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 3,
        ease: "easeInOut"
      }}
    >
      💖
    </motion.div>
  ));
  
  return (
    <div className="hearts-container">
      {hearts}
    </div>
  );
}

// Rose Petals Component
function RosePetals() {
  const petals = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="rose-petal"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: -20,
        rotate: 0,
        opacity: 0.7
      }}
      animate={{ 
        y: window.innerHeight + 100,
        x: Math.random() * window.innerWidth,
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        opacity: [0.7, 1, 0.3, 0]
      }}
      transition={{ 
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "easeInOut"
      }}
    >
      🌸
    </motion.div>
  ));
  
  return (
    <div className="petals-container">
      {petals}
    </div>
  );
}

// Balloon Game Component
function BalloonGame({ onComplete }) {
  const [balloons, setBalloons] = useState([
    { id: 1, text: "Love", color: "#ff6b9d", popped: false },
    { id: 2, text: "Joy", color: "#ffd93d", popped: false },
    { id: 3, text: "Health", color: "#6bcf7f", popped: false },
    { id: 4, text: "Happiness", color: "#4ecdc4", popped: false },
    { id: 5, text: "Peace", color: "#a8e6cf", popped: false }
  ]);
  
  const popBalloon = (id) => {
    setBalloons(prev => prev.map(balloon => 
      balloon.id === id ? { ...balloon, popped: true } : balloon
    ));
    
    if (balloons.filter(b => !b.popped).length === 1) {
      setTimeout(onComplete, 1000);
    }
  };
  
  return (
    <div className="balloon-game">
      <h3 className="balloon-title">🎈 Pop the balloons to reveal birthday wishes! 🎈</h3>
      <div className="balloons-container">
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="balloon"
            style={{ backgroundColor: balloon.color }}
            animate={{
              y: balloon.popped ? 0 : [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: balloon.popped ? 0 : Infinity,
              ease: "easeInOut"
            }}
            onClick={() => !balloon.popped && popBalloon(balloon.id)}
            whileHover={{ scale: balloon.popped ? 1 : 1.1 }}
            whileTap={{ scale: 0.8 }}
          >
            {balloon.popped ? (
              <motion.span
                className="balloon-text"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {balloon.text}
              </motion.span>
            ) : (
              "🎈"
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Hidden Surprise Hearts
function HiddenSurprise({ onClick, revealed, message }) {
  return (
    <motion.div
      className="hidden-surprise"
      onClick={onClick}
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.8 }}
    >
      {revealed ? (
        <motion.div
          className="surprise-message"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      ) : (
        <span className="surprise-heart">💝</span>
      )}
    </motion.div>
  );
}

export default function BirthdaySite() {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [balloonGameComplete, setBalloonGameComplete] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [surprises, setSurprises] = useState([
    { id: 1, revealed: false, message: "You're the best mom ever! 💕" },
    { id: 2, revealed: false, message: "Thank you for everything! 🌟" },
    { id: 3, revealed: false, message: "We love your hugs! 🤗" }
  ]);
  
  useEffect(() => {
    if (opened) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [opened]);
  
  // Load images dynamically
  useEffect(() => {
    loadImages();
  }, []);
  
  const loadImages = async () => {
    try {
      const response = await fetch('/imageData.json');
      if (response.ok) {
        const data = await response.json();
        setImageData(data);
      } else {
        // Fallback to default messages if no imageData.json
        setImageData(getDefaultMessages());
      }
    } catch (error) {
      console.log('Using default images:', error.message);
      setImageData(getDefaultMessages());
    }
  };
  
  const getDefaultMessages = () => {
    return [
      {
        text: "Happy Birthday Mom! 🎉 You are the light of our lives.",
        img: "https://placehold.co/400x400/ff69b4/white?text=Mom+1",
        timeline: "Beautiful Memories"
      },
      {
        text: "Thank you for your endless love and support ❤️",
        img: "https://placehold.co/400x250/ffd93d/white?text=Mom+2",
        timeline: "Family Love"
      },
      {
        text: "Here's to more smiles, laughter, and memories together.",
        img: "https://placehold.co/500x300/6bcf7f/white?text=Mom+3",
        timeline: "Together Forever"
      }
    ];
  };
  
  const handleGiftClick = () => {
    setOpened(true);
    setMusicPlaying(true);
  };
  
  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };
  
  const revealSurprise = (id) => {
    setSurprises(prev => prev.map(surprise => 
      surprise.id === id ? { ...surprise, revealed: true } : surprise
    ));
  };

  const messages = [
    {
      text: "Happy Birthday Mom! 🎉 You are the light of our lives.",
      img: "https://placehold.co/400x400",
    },
    {
      text: "Thank you for your endless love and support ❤️",
      img: "https://placehold.co/400x250",
    },
    {
      text: "Here’s to more smiles, laughter, and memories together.",
      img: "https://placehold.co/500x300",
    },
  ];

  return (
    <div className="container">
      {!opened ? (
        // Gift Landing Page
        <div className="landing-page">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring", 
              bounce: 0.6 
            }}
            className="gift-wrapper"
            onClick={handleGiftClick}
          >
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ 
                scale: 0.95,
                rotate: 180,
                transition: { duration: 0.3 }
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="gift-box"
            >
              🎁
            </motion.div>
          </motion.div>
          <motion.p 
            className="tap-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Tap the present to open your surprise 🎀
          </motion.p>
          
          {/* Sparkles around gift */}
          <motion.div
            className="sparkle sparkle-1"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="sparkle sparkle-2"
            animate={{
              scale: [0, 1, 0],
              rotate: [360, 180, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="sparkle sparkle-3"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, -180, -360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1.5
            }}
          >
            💫
          </motion.div>
        </div>
      ) : (
        // Birthday Scroll Content
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence>
            {showConfetti && <Confetti />}
          </AnimatePresence>
          <FloatingHearts />
          <section className="hero-section">
            <motion.h1
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                type: "spring", 
                bounce: 0.4,
                delay: 0.3
              }}
              className="main-title glowing-text"
            >
              {"Happy Birthday Mom 🎂".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    textShadow: [
                      "0 0 5px #ff69b4",
                      "0 0 10px #ff69b4, 0 0 20px #ff69b4",
                      "0 0 5px #ff69b4"
                    ]
                  }}
                  transition={{ 
                    delay: 0.5 + i * 0.05,
                    textShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            
            {/* Music Controls */}
            <motion.button
              className="music-control"
              onClick={toggleMusic}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {musicPlaying ? "🔊 Music On" : "🔇 Music Off"}
            </motion.button>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
              className="subtitle"
            >
              We made this little gift to celebrate you today 💕
            </motion.p>
            
            {/* Celebration emojis */}
            <motion.div 
              className="celebration-emojis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {['🎉', '🎊', '🎈', '🌟', '💖'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </section>

          {/* Balloon Game Section */}
          <section className="balloon-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BalloonGame onComplete={() => setBalloonGameComplete(true)} />
            </motion.div>
          </section>
          
          {balloonGameComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="game-complete-message"
            >
              <h2 className="glowing-text">🎉 You found all the birthday wishes! 🎉</h2>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <section
              key={msg.id || i}
              className="message-section parallax-section"
              style={{
                background: `linear-gradient(135deg, ${['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4'][i % 4]} 0%, ${['#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899'][i % 4]} 100%)`
              }}
            >
              {/* Timeline Badge */}
              <motion.div
                className="timeline-badge"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {msg.timeline}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="image-container"
              >
                <motion.img
                  src={msg.img}
                  alt={`Memory: ${msg.timeline}`}
                  className="message-image"
                  whileHover={{
                    filter: "brightness(1.1) saturate(1.2)"
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="message-text"
              >
                {msg.text.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.6 + wordIndex * 0.1, 
                      duration: 0.5 
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Hidden Surprises */}
              {surprises[i] && (
                <HiddenSurprise
                  onClick={() => revealSurprise(surprises[i].id)}
                  revealed={surprises[i].revealed}
                  message={surprises[i].message}
                />
              )}
            </section>
          ))}

          <section className="final-section">
            <RosePetals />
            
            <motion.div
              className="birthday-card"
              initial={{ rotateY: -90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, type: "spring" }}
            >
              <motion.h2
                initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2, 
                  type: "spring", 
                  bounce: 0.6,
                  delay: 0.3
                }}
                className="final-title glowing-text"
              >
               LOVE YOU LOTS MAMA!
              </motion.h2>
              
              <motion.div
                className="heartfelt-message"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <p className="final-text">
                  Thank you for being our guiding light, our source of strength, 
                  and our endless well of love. Every day with you is a gift. 
                  Happy Birthday! 🎂✨
                </p>
                
                <p className="signature">
                  you are awesome!<br/>
                  - kakak daniel
                </p>
              </motion.div>
            </motion.div>
            
            {/* Final celebration burst */}
            <motion.div 
              className="final-celebration"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {['🎊', '🎉', '🎈', '🌟', '💕', '🎂', '🎀', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className={`final-emoji final-emoji-${i + 1}`}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Thank You Section */}
            <motion.div
              className="thank-you-section"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2, duration: 1 }}
            >
              <h3 className="thank-you-title">ini dari emz</h3>
              <p className="thank-you-text">
                Happy happy birthday mama
Semoga mama sehat dan bahagia selalu.
Jangan terlalu banyak makan dan minum yg ada banyak gula ya ma.
love you - mely
              </p>
            </motion.div>
          </section>
        </motion.div>
      )}
    </div>
  );
}
