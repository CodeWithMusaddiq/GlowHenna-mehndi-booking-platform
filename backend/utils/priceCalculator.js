/**
 * Calculate total price for a booking
 * @param {Object} params - Calculation parameters
 * @param {Number} params.designBasePrice - Base price from design
 * @param {String} params.occasion - 'normal', 'festival', or 'wedding'
 * @param {Number} params.numberOfHands - Number of people/hands
 * @param {Boolean} params.isFestival - Whether booking date is a festival
 * @returns {Number} - Calculated total price
 */
const priceCalculator = ({ designBasePrice, occasion, numberOfHands, isFestival }) => {
  // Base calculation: price per hand × number of hands
  let totalPrice = designBasePrice * numberOfHands;

  // Apply occasion multiplier
  if (occasion === 'wedding') {
    totalPrice *= 1.2; // +20% for weddings
  }

  // Apply festival surcharge
  if (isFestival) {
    totalPrice *= 1.15; // +15% for festival dates
  }

  // Round to 2 decimal places
  return Math.round(totalPrice * 100) / 100;
};

module.exports = priceCalculator;