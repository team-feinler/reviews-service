# Reviews Service

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## CRUD API

#### GET
*Route*: /review/:reviewId
*Response*:
- Valid Id: 200
```
{
  reviewId: Number,
  productId: Number,
  color: String,
  configuration: String,
  isBestSeller: Boolean,
  category: String,
  customerId: Number,
  customerName: String,
  customerCountry: String,
  profilePicUrl: String,
  title: String,
  description: String,
  rating: Number,
  isVerifiedPurchase: Boolean,
  isHelpfulCount: Number,
  imageUrls: Array,
  reviewDate: Date,
  easeToUse: Number,
  voiceRecognition: Number,
  techSupport: Number,
  valueForMoney: Number,
  qualityOfMaterial: Number,
  batteryLife: Number
}
```
- Invalid Id: 404 { error: 'No review exists by this id.' }

#### POST
*Route*: /review
*Body* _required_:
```
{
  reviewId: Number,
  productId: Number,
  color: String,
  configuration: String,
  isBestSeller: Boolean,
  category: String,
  customerId: Number,
  customerName: String,
  customerCountry: String,
  profilePicUrl: String,
  title: String,
  description: String,
  rating: Number,
  isVerifiedPurchase: Boolean,
  isHelpfulCount: Number,
  imageUrls: Array,
  reviewDate: Date,
  easeToUse: Number,
  voiceRecognition: Number,
  techSupport: Number,
  valueForMoney: Number,
  qualityOfMaterial: Number,
  batteryLife: Number
}
```
*Response*:
- Valid Body: Post body with additional properties _id and _v
- Invalid Body: 500 { error: err.message }

#### PUT
*Route*: /review/:reviewId
*Body*: An object containing keys and values to update
*Response*:
- Valid Id + Body: 200 { "n": Number, "nModified": Number, "ok": Number }
- Invalid Id or Body: 500 { error: err.message }

#### DELETE
*Route*: /review/:reviewId
*Response*:
- Valid Id: 200 { "n": 1, "ok": 1, "deletedCount": 1 }
- Invalid Id: 404 { error: 'No review exists by this id.' }

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

