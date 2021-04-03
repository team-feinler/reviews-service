DROP TABLE IF EXISTS reviews, products, customers;

CREATE TABLE products (
  "productId" INTEGER NOT NULL,
  "color" TEXT NOT NULL,
  "configuration" TEXT NOT NULL,
  "isBestSeller" BOOLEAN NOT NULL,
  "category" TEXT NOT NULL
);

CREATE TABLE customers (
  "customerId" INTEGER NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerCountry" TEXT NOT NULL,
  "profilePicUrl" TEXT NOT NULL
);

CREATE TABLE reviews (
  "reviewId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "isVerifiedPurchase" BOOLEAN NOT NULL,
  "isHelpfulCount" INTEGER NOT NULL,
  "reviewDate" DATE NOT NULL,
  "easeToUse" FLOAT NOT NULL,
  "voiceRecognition" FLOAT NOT NULL,
  "techSupport" FLOAT NOT NULL,
  "valueForMoney" FLOAT NOT NULL,
  "qualityOfMaterial" FLOAT NOT NULL,
  "batteryLife" FLOAT NOT NULL,
  "imageUrls" TEXT[],
  "productId" INTEGER,
  "customerId" INTEGER
);
