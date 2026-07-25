/**
 * Check if a given date is a festival date
 * @param {Date} date - Date to check
 * @returns {Boolean} - True if festival date, false otherwise
 */
const festivalChecker = (date) => {
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();

  // Hardcoded festival dates (simplified - can be enhanced with actual Islamic/Hindu calendar)
  const festivals = [
    // Eid ul-Fitr (approximate - typically in April/May)
    { month: 4, day: 10 },
    { month: 4, day: 11 },
    { month: 4, day: 12 },
    { month: 5, day: 1 },
    { month: 5, day: 2 },
    { month: 5, day: 3 },

    // Eid ul-Adha (approximate - typically in June/July)
    { month: 6, day: 16 },
    { month: 6, day: 17 },
    { month: 6, day: 18 },
    { month: 7, day: 1 },
    { month: 7, day: 2 },
    { month: 7, day: 3 },

    // Diwali (approximate - typically in October/November)
    { month: 10, day: 24 },
    { month: 10, day: 25 },
    { month: 10, day: 26 },
    { month: 11, day: 1 },
    { month: 11, day: 2 },
    { month: 11, day: 3 },

    // Karva Chauth (approximate - October)
    { month: 10, day: 20 },

    // Holi (approximate - March)
    { month: 3, day: 25 },
    { month: 3, day: 26 },
  ];

  // Check if date matches any festival
  const isFestivalDate = festivals.some((festival) => festival.month === month && festival.day === day);

  // Check if date falls in wedding season (November to February)
  const isWeddingSeason = month >= 11 || month <= 2;

  return isFestivalDate || isWeddingSeason;
};

module.exports = festivalChecker;