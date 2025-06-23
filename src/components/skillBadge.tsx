import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillBadge = ({ skill, index }: { skill: Skill; index: number }) => {
  // 스킬 레벨에 따른 색상 결정
  const getBadgeColor = (level: number) => {
    if (level >= 90) return "from-indigo-600 to-blue-500";
    if (level >= 80) return "from-blue-500 to-cyan-400";
    if (level >= 70) return "from-cyan-400 to-teal-500";
    return "from-teal-500 to-green-400";
  };

  // 스킬 레벨에 따른 텍스트 표시
  const getSkillLevelText = (level: number) => {
    if (level >= 90) return "전문가";
    if (level >= 80) return "숙련";
    if (level >= 70) return "중급";
    return "기본";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative group"
    >
      <div
        className={`
          px-4 py-2 rounded-full mb-2 shadow-sm
          cursor-pointer transition-all duration-300
          hover:shadow-md hover:translate-y-px
          bg-gradient-to-r ${getBadgeColor(skill.level)}
          text-white font-medium
        `}
      >
        {skill.name}
        <span className="ml-2 text-xs opacity-80">
          {getSkillLevelText(skill.level)}
        </span>
      </div>

      {/* 호버 시 나타나는 툴팁 */}
      <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 dark:bg-gray-900 text-white text-sm rounded-lg shadow-lg border border-gray-700 dark:border-gray-600">
        <div className="font-medium">{skill.name}</div>
        <div className="flex items-center mt-1">
          <div className="w-full bg-gray-600 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-white dark:bg-gray-300 h-1.5 rounded-full"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs">{skill.level}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillBadge;
