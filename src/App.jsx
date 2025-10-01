import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import amelyPhoto from "./assets/amely.png";
import danielPhoto from "./assets/daniel.png";

// Confetti Component
function Confetti() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <motion.div
      key={i}
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
  const [isColorful, setIsColorful] = useState(false);
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
  
  // Shuffle array function for random photo order
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const loadImages = async () => {
    try {
      const response = await fetch('/imageData.json');
      if (response.ok) {
        const data = await response.json();
        // Randomize the order of images
        setImageData(shuffleArray(data));
      } else {
        // Fallback to default messages if no imageData.json
        setImageData(shuffleArray(getDefaultMessages()));
      }
    } catch (error) {
      console.log('Using default images:', error.message);
      setImageData(shuffleArray(getDefaultMessages()));
    }
  };
  
  const getDefaultMessages = () => {
    const captions = [
      "You always make us smile! 😊",
      "Beautiful memories with you 💕",
      "Your love lights up our world ✨",
      "So grateful for you, Mom! 🌟",
      "Making every moment special 🎉",
      "Your hugs are the best medicine 🤗",
      "Adventures with you are the greatest 🌈",
      "Thank you for being amazing 💖",
      "Every photo tells a story of love 📸",
      "You're our superhero, Mom! 🦸‍♀️"
    ];
    
    return [
      {
        text: captions[Math.floor(Math.random() * captions.length)],
        img: "https://placehold.co/400x400/ff69b4/white?text=Mom+1"
      },
      {
        text: captions[Math.floor(Math.random() * captions.length)],
        img: "https://placehold.co/400x250/ffd93d/white?text=Mom+2"
      },
      {
        text: captions[Math.floor(Math.random() * captions.length)],
        img: "https://placehold.co/500x300/6bcf7f/white?text=Mom+3"
      }
    ];
  };
  
  const handleGiftClick = () => {
    setOpened(true);
    // Add a small delay before color transformation for dramatic effect
    setTimeout(() => {
      setIsColorful(true);
    }, 800);
  };  const revealSurprise = (id) => {
    setSurprises(prev => prev.map(surprise => 
      surprise.id === id ? { ...surprise, revealed: true } : surprise
    ));
  };

  // Use dynamic image data or fallback to default
  const messages = imageData.length > 0 ? imageData : getDefaultMessages();

  return (
    <div className={`container ${isColorful ? 'colorful' : 'monochrome'}`}>
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            

            
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
              className="subtitle"
            >
               <br /> i hope you are having an awesome day!!!! ini web kecil yang kakak buat as a gift to you mom! it's not much tapi semoga mama suka hehehe
            </motion.p>
            
            {/* Celebration emojis */}
            <motion.div 
              className="celebration-emojis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
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
              className="photo-section parallax-section"
              style={{
                background: `linear-gradient(135deg, ${['#FDEBD0', '#F7CAC9', '#F75270', '#DC143C'][i % 4]} 0%, ${['#F7CAC9', '#F75270', '#DC143C', '#FDEBD0'][i % 4]} 100%)`
              }}
            >
              
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
                  src={msg.src || msg.img}
                  alt={msg.alt || `Beautiful photo of Mom`}
                  className="message-image"
                  whileHover={{
                    filter: "brightness(1.1) saturate(1.2)"
                  }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = `https://placehold.co/400x400/ff69b4/white?text=Photo+${i + 1}`;
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
                  Hello Mama Pinkan Ovanita Louisa Tulung!!!! <br /> <br />

Today is your birthday and I hope that you have spent it well with Emz!!!! I am so happy that I've been able to be your son selama ini ahdbawhbdhabdw YA SELAMA KAKAK HIDUP SEJAK DETIK PERTAMA KAKAK UDAH TAU BAHWA KAKAK DANIEL BAKAL JADI ORANG KEREN KARENA YANG LAHIRIN KAKAK KEREN JUGA AHABHABHABHAB 😎  <br /> <br />

On your special day todayyy I just wanted to let you know mama how awesome, smart, beautiful, hard working, motivating, inspiring, and incredible you are! There are so many words in this world tapi ribuan kata pun TIDAK CUKUP to let you know how cool and magnificent you are momzz !!!!!!!!! <br /> <br />

I want to thank you mama for being such an awesome awesome mom for me and and emz! I am super grateful dan bersyukur bahwa kakak bisa punya mama yang sangat sabar dan pengertian! Kemaren pas kakak kehilangan hape kakak dan pulang dari hanoi I was dealing with lots of emotions apalagi sejak pulang dari hanoi ke Jogja with a broken laptop juga! Itu kakak stress banget but talking to you afterwards felt like home! You were always able to let me know that things will be okay! <br /> <br />

Kakak mau berterima kasih ke mama banyak atas semua doa" yang mama udah doain untuk kakak! Selama satu tahun ini I feel that I have achieved so much and I am sure that I was able to do that because of your prayers mama!  <br /> <br />

Kakak setiap malam selalu berdoa asking God to allow me to become a person that can be considered as a blessing rather than a burden to others! Kata-kata dari mama itu untuk kakak menjadi orang yang bisa dianggap sebagai berkat kepada orang lain itu kakak selalu ingat in everything I do!  <br /> <br />

I feel like I have only been able to achieve so many things because of you mama because I have the privilege of knowing that no matter what I do I always have you right there for me to support me in everything and all I do! I am so happy that you are always so trusting with the decisions I take giving me the freedom and privilege to be able to make the most out of my life!  <br /> <br />

Singkat jelas padat kakak sayang banyak sama mama dan kakak mau thank you once again for all the blessings that you allow me and emo to have because of your hard work!  <br /> <br />

ONLY DIAMOND CAN CUT DIAMOND, ONLY THE BEST CAN SATISFY THE BEST!  <br /> <br />

Kalo misalnya begini kakak akan anggap bahwa selama ini kakak belom bisa satisfy mama karena dibandingkan mama kakak masih sangat jauh dalam aspek hidup !!! Hence why I am going to work very hard with all the support you give me to make sure that I will be able to make you proud mama!!!!!!!!  <br /> <br />

Mama tungguin ya sampe kakak jadi pemimpin duniaaa!!! Kakak mau tunjukkan mama bahwa kakak benaran bisa melakukan semua ini dan mencapai mimpi-mimpi kakak!!!!!  <br /> <br />

You are an awesome woman and you gave birth to an awesome son and awesome daughter! Thank you for everything mom!  <br /> <br />

HAPPY BIRTHDAY MAMA PINKAN OVANITA LOUISA TULUNG!!!!  <br /> <br />

LOVE YOU!!!  <br /> <br />
                </p>
                
                <p className="signature">
                  you are awesome!<br/>
                  - kakak daniel
                </p>
                
                {/* Daniel's Photo */}
                <motion.div
                  className="daniel-photo-container"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <motion.img
                    src={danielPhoto}
                    alt="Kakak Daniel"
                    className="daniel-photo"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: [0, 2, -2, 0],
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.p
                    className="daniel-caption"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    💙 Daniel 💙
                  </motion.p>
                </motion.div>
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
                Happy happy birthday mama. Semoga mama sehat dan bahagia selalu.
                Jangan terlalu banyak makan dan minum yg ada banyak gula ya ma.
                love you - mely
              </p>
              
              {/* Amely's Photo */}
              <motion.div
                className="amely-photo-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                <motion.img
                  src={amelyPhoto}
                  alt="Little sister Amely"
                  className="amely-photo"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.5 }
                  }}
                />
                <motion.p
                  className="amely-caption"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 3, duration: 0.6 }}
                >
                  💕 Amely 💕
                </motion.p>
              </motion.div>
            </motion.div>
          </section>
        </motion.div>
      )}
    </div>
  );
}