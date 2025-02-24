
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const navigate = useNavigate();

  const ageRanges = ['3-5 岁', '6-8 岁', '9-12 岁'];
  const storyStyles = ['温馨', '幽默', '冒险', '科幻'];

  const handleStyleSelection = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleNext = () => {
    // Handle next step navigation here
    console.log({
      ageRange: selectedAgeRange,
      styles: selectedStyles,
      voice: selectedVoice
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-xl md:text-2xl text-primary text-center font-medium tracking-wide"
        >
          为了更好的了解您的偏好，请完成下面的步骤
        </motion.h1>

        {/* Age Range Selection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-lg text-primary font-medium mb-4">年龄段</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ageRanges.map((age) => (
              <motion.button
                key={age}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAgeRange(age)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedAgeRange === age
                    ? 'border-primary-accent bg-primary-accent text-white'
                    : 'border-gray-200 hover:border-primary-accent hover:bg-primary-accent/10'
                }`}
              >
                {age}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Story Style Selection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-lg text-primary font-medium mb-4">喜欢的故事风格</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {storyStyles.map((style) => (
              <motion.button
                key={style}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStyleSelection(style)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedStyles.includes(style)
                    ? 'border-primary-accent bg-primary-accent text-white'
                    : 'border-gray-200 hover:border-primary-accent hover:bg-primary-accent/10'
                }`}
              >
                {style}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Voice Selection */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-lg text-primary font-medium mb-4">朗读声音</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['个性化声音', '默认声音'].map((voice) => (
              <motion.button
                key={voice}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVoice(voice)}
                className={`aspect-square rounded-full border-2 flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${
                  selectedVoice === voice
                    ? 'border-primary-accent bg-primary-accent text-white'
                    : 'border-gray-200 hover:border-primary-accent hover:bg-primary-accent/10'
                }`}
              >
                <span className="text-lg">{voice}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#FF8C00' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`px-12 py-4 rounded-xl text-white text-lg font-medium transition-all duration-300
              ${selectedAgeRange && selectedStyles.length > 0 && selectedVoice
                ? 'bg-primary-orange hover:bg-primary-orange-dark'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
            disabled={!selectedAgeRange || selectedStyles.length === 0 || !selectedVoice}
          >
            下一步
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Preferences;
