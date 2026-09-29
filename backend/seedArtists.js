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

const artistImages = [
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
            sampleImages: [artistImages[i % artistImages.length]]
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