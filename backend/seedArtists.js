const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Artist = require("./models/Artist");

const locations = [
  "Banjara Hills","Jubilee Hills","Gachibowli","Hitech City","Kukatpally",
  "Secunderabad","Madhapur","Kondapur","LB Nagar","Uppal",
  "Begumpet","Mehdipatnam","Dilsukhnagar","Ameerpet","Tolichowki",
  "Manikonda","Nallagandla","Miyapur","Chandanagar","Patancheru",
  "Alwal","ECIL","Bachupally","Nizampet","Hafeezpet",
  "Attapur","Rajendranagar","Shamshabad","Tarnaka","Habsiguda",
  "Malkajgiri","Boduppal","Nagole","Hayathnagar","Vanastalipuram",
  "Sainikpuri","Nacharam","Kompally","Medchal","Jeedimetla",
  "Kachiguda","Abids","Lakdikapul","Somajiguda","Yousufguda",
  "Film Nagar","Banjara Road No 12","Moosapet","Lingampally","Gowlidoddy"
];

const designTypes = ["Basic", "Bridal", "Arabic", "Festival", "Floral"];

const names = [
  "Ayesha","Sana","Fatima","Zoya","Hina","Alisha","Noor","Riya","Mehak","Anaya",
  "Sara","Iqra","Maira","Aaliya","Simran","Priya","Kiran","Nazia","Shazia","Tanya"
];

function randomRating() {
  return parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1));
}

function randomPrice() {
  const min = Math.floor(Math.random() * 3000) + 1500;
  const max = min + Math.floor(Math.random() * 7000) + 3000;
  return { min, max };
}

function randomPhone() {
  return "+91-9" + Math.floor(100000000 + Math.random() * 900000000);
}

async function seedArtists() {
  try {
    await connectDB();

    await Artist.deleteMany({});
    console.log("Old artists removed");

    const artists = [];

    locations.forEach((location) => {
      designTypes.forEach((type) => {
        for (let i = 0; i < 20; i++) {
          artists.push({
            name: `${names[i % names.length]} ${type} ${location}`,
            location: location,
            phone: randomPhone(),
            designTypes: [type],
            priceRange: randomPrice(),
            rating: randomRating(),
            availability: Math.random() > 0.1,
            sampleImages: []
          });
        }
      });
    });

    await Artist.insertMany(artists);

    console.log("✅ 5000 Artists Inserted Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedArtists();