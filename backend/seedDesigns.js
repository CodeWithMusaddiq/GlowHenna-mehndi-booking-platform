const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Design = require("./models/Design");

const imagePool = [
  "https://images.unsplash.com/photo-1732118400647-a81e3b37be87?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1676134014048-bcc764ea015d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1562508548-69377b81ab9e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1780247584989-80ed067e98fe?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1640745683498-a19de110faf5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600268762917-d5b9fa2b7c90?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1676134379048-8d3b7af12ce8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1752824250540-b5c8387f1ad0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1629332791128-58f00882964d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1617354469542-3767d125d40a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1676133975766-27e29937b402?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1752824250542-d4db51baa32c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556536088-f010a312a8d3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1735216647220-02ee87b4e964?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1586247707783-0c4101313cf5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1742147173348-4ae7f6abe086?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1566644500975-b5ea36c6594e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1676134120341-212884eca2bb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1720798299236-7acaaa2356be?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1722172312997-068983715fd1?auto=format&fit=crop&w=900&q=80",
];

const designs = [
  ["Fine Leaf Minimal", "Basic", "small", 900],
  ["Everyday Vines", "Basic", "medium", 1200],
  ["Classic Full Hand", "Basic", "large", 1800],
  ["The Bridal Story", "Bridal", "large", 4500],
  ["Rose Jaal Bridal", "Bridal", "large", 5200],
  ["Mandala Bridal", "Bridal", "medium", 3800],
  ["Arabic Trail", "Arabic", "small", 1400],
  ["Bold Arabic Sweep", "Arabic", "medium", 1900],
  ["Gulf Garden", "Arabic", "large", 2600],
  ["Diwali Dots", "Festival", "small", 1100],
  ["Festive Lotus", "Festival", "medium", 1750],
  ["Eid Moon Garden", "Festival", "large", 2400],
  ["Wildflower Trail", "Floral", "small", 1250],
  ["Jasmine Bloom", "Floral", "medium", 1850],
  ["Botanical Full Hand", "Floral", "large", 2900],
];

async function seedDesigns() {
  try {
    await connectDB();
    await Design.deleteMany({});
    await Design.insertMany(designs.map(([designName, category, suitableHandSize, basePrice], index) => ({
      designName,
      category,
      suitableHandSize,
      basePrice,
      imageURL: imagePool[index % imagePool.length],
    })));
    console.log(`${designs.length} designs inserted successfully.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDesigns();