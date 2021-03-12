DROP TABLE IF EXISTS reviews, products, customers;

CREATE TABLE products (
  productId INTEGER NOT NULL PRIMARY KEY,
  color TEXT NOT NULL,
  "configuration" TEXT NOT NULL,
  isBestSeller BOOLEAN NOT NULL,
  category TEXT NOT NULL,
  reviews INTEGER[]
);

CREATE TABLE customers (
  customerId INTEGER NOT NULL PRIMARY KEY,
  customerName TEXT NOT NULL,
  customerCountry TEXT NOT NULL,
  profilePicUrl TEXT NOT NULL
);

CREATE TABLE reviews (
  reviewId INTEGER NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER NOT NULL,
  isVerifiedPurchase BOOLEAN NOT NULL,
  isHelpfulCount INTEGER NOT NULL,
  reviewDate DATE NOT NULL,
  easeToUse FLOAT NOT NULL,
  voiceRecognition FLOAT NOT NULL,
  techSupport FLOAT NOT NULL,
  valueForMoney FLOAT NOT NULL,
  qualityOfMaterial FLOAT NOT NULL,
  batteryLife FLOAT NOT NULL,
  imageUrls TEXT[],
  productId INTEGER REFERENCES products (productId),
  customerId INTEGER REFERENCES customers (customerId)
);
