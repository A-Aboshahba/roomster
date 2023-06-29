module.exports = class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  //![1]to make pagination
  paginate() {
    console.log("paginate");
    let page = this.queryString.page * 1 || 1;
    if (this.mongooseQuery.page <= 0) page = 1;
    let skip = (page - 1) * (this.queryString.limit || 12);
    this.page = page;
    this.mongooseQuery.skip(skip).limit(this.queryString.limit || 12);

    return this;
  }

  //![2] to make filter
  filter() {
    console.log("filter");
    let filterObj = { ...this.queryString };
    let excludedQuery = ["page", "sort", "fields", "keyword", "limit"];
    excludedQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  //! [3] to make sort
  sort() {
    if (this.queryString.sort) {
      console.log("sort");

      let sortBy = this.queryString.sort.replace(/,/g, " ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  //![3] to make search
  search() {
    if (this.queryString.keyword) {
      console.log("search");
      this.mongooseQuery.find({
        $or: [
          {
            title: { $regex: this.queryString.keyword, $options: "i" },
          },
          {
            description: { $regex: this.queryString.keyword, $options: "i" },
          },
          {
            firstName: { $regex: this.queryString.keyword, $options: "i" },
          },
          {
            lastName: { $regex: this.queryString.keyword, $options: "i" },
          },
          {
            "address.country": {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          },
          {
            "address.city": { $regex: this.queryString.keyword, $options: "i" },
          },
        ],
      });
    }
    return this;
  }

  //![4] to make select
  fields() {
    if (this.queryString.fields) {
      console.log("fields");
      let fields = this.queryString.fields.replace(/,/g, " ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
};

// queryString === request.query;
// ?price[gte]=300

// {price:{gte:300}}
// constructor(mongooseQueryOrPipeline, queryString) {
//   if (mongooseQueryOrPipeline.constructor.name === "model") {
//     this.mongooseQuery = mongooseQueryOrPipeline.find();
//   } else {
//     this.mongooseQuery = mongooseQueryOrPipeline;
//   }
//   this.queryString = queryString;
// }

///this code is correct

// for (const key in filterObj.price) {
//   if (isNaN(parseInt(filterObj.price[key]))) {
//     filterObj.price[key] = undefined;
//   } else {
//     filterObj.price[key] = parseInt(filterObj.price[key]);
//   }
// }
// // console.log("apartmespecfication", filterObj["apartmentSpecification"]);
// for (const key in filterObj["apartmentSpecification.noOfBalcony"]) {
//   if (
//     isNaN(parseInt(filterObj["apartmentSpecification.noOfBalcony"][key]))
//   ) {
//     filterObj["apartmentSpecification.noOfBalcony"][key] = undefined;
//   } else {
//     filterObj["apartmentSpecification.noOfBalcony"][key] = parseInt(
//       filterObj["apartmentSpecification.noOfBalcony"][key]
//     );
//   }
// }

// for (const key in filterObj["apartmentSpecification.noOfRooms"]) {
//   if (
//     isNaN(parseInt(filterObj["apartmentSpecification.noOfRooms"][key]))
//   ) {
//     filterObj["apartmentSpecification.noOfRooms"][key] = undefined;
//   } else {
//     filterObj["apartmentSpecification.noOfRooms"][key] = parseInt(
//       filterObj["apartmentSpecification.noOfRooms"][key]
//     );
//   }
// }
// for (const key in filterObj["apartmentSpecification.noOfBeds"]) {
//   if (
//     isNaN(parseInt(filterObj["apartmentSpecification.noOfBeds"][key]))
//   ) {
//     filterObj["apartmentSpecification.noOfBeds"][key] = undefined;
//   } else {
//     filterObj["apartmentSpecification.noOfBeds"][key] = parseInt(
//       filterObj["apartmentSpecification.noOfBeds"][key]
//     );
//   }
// }

// for (const key in filterObj["apartmentSpecification.noOfKitchens"]) {
//   if (
//     isNaN(parseInt(filterObj["apartmentSpecification.noOfKitchens"][key]))
//   ) {
//     filterObj["apartmentSpecification.noOfKitchens"][key] = undefined;
//   } else {
//     filterObj["apartmentSpecification.noOfKitchens"][key] = parseInt(
//       filterObj["apartmentSpecification.noOfKitchens"][key]
//     );
//   }
// }

// console.log("filteredObject", filterObj);

// module.exports = class ApiFeature {
// constructor(
//   mongooseQuery,
//   queryString,
//   isPipeline = false,
//   aggregateArray = []
// ) {
//   this.mongooseQuery = mongooseQuery;
//   this.queryString = queryString;
//   this.isPipeline = isPipeline;
//   this.aggregateArray = aggregateArray;

// }

// paginate() {
//   console.log("paginate");
//   let page = this.queryString.page * 1 || 1;
//   if (page <= 0) page = 1;
//   let skip = (page - 1) * (this.queryString.limit * 1 || 5);
//   this.page = page;
//   if (this.isPipeline) {
//     this.aggregateArray.push(
//       { $skip: skip },
//       { $limit: this.queryString.limit * 1 || 5 }
//     );
//     console.log("aggerefcfvvcgsvv", this.aggregateArray);
//   } else {
//     this.mongooseQuery.skip(skip).limit(this.queryString.limit * 1 || 12);
//   }
//   return this;
// }

// filter() {
//   console.log("filter");
//   let filterObj = { ...this.queryString };
//   let excludedQuery = ["page", "sort", "fields", "keyword", "limit"];
//   excludedQuery.forEach((q) => {
//     delete filterObj[q];
//   });
//   filterObj = JSON.stringify(filterObj);
//   filterObj = filterObj.replace(
//     /\b(gt|gte|lt|lte)\b/g,
//     (match) => `$${match}`
//   );
//   filterObj = JSON.parse(filterObj);
//   if (this.mongooseQuery.pipeline) {
//     console.log("unshift");

//     if (Object.keys(filterObj).length === 0) {
//       console.log("The object is empty");
//     } else {
//       this.aggregateArray.unshift({ $match: filterObj });
//       console.log("aggerefcfvvcgsvv", this.aggregateArray);
//     }
//   } else {
//     this.mongooseQuery.find(filterObj);
//   }
//   return this;
// }

// sort() {
//   console.log("sort");
//   if (this.queryString.sort) {
//     let sortBy = this.queryString.sort.replace(/,/g, " ");
//     if (this.isPipeline) {
//       const sortStage = {
//         $sort: {},
//       };
//       sortBy.split(" ").forEach((field) => {
//         let sortOrder = 1;
//         if (field.startsWith("-")) {
//           field = field.slice(1);
//           sortOrder = -1;
//         }
//         sortStage.$sort[field] = sortOrder;
//       });
//       this.aggregateArray.push(sortStage);
//       console.log("aggerefcfvvcgsvv", this.aggregateArray);
//     } else {
//       this.aggregateArray.sort(sortBy);
//     }
//   }
//   return this;
// }

// search() {
//   console.log("search");
//   if (this.queryString.keyword) {
//     const searchQuery = {
//       $or: [
//         { title: { $regex: this.queryString.keyword, $options: "i" } },
//         { description: { $regex: this.queryString.keyword, $options: "i" } },
//         { firstName: { $regex: this.queryString.keyword, $options: "i" } },
//         { lastName: { $regex: this.queryString.keyword, $options: "i" } },
//         {
//           "address.country": {
//             $regex: this.queryString.keyword,
//             $options: "i",
//           },
//         },
//         {
//           "address.city": { $regex: this.queryString.keyword, $options: "i" },
//         },
//       ],
//     };
//     if (this.isPipeline) {
//       this.aggregateArray.unshift({ $match: searchQuery });
//       console.log("aggerefcfvvcgsvv search", this.aggregateArray);
//     } else {
//       this.mongooseQuery.find(searchQuery);
//     }
//   }
//   return this;
// }

// fields() {
//   console.log("fields");
//   if (this.queryString.fields) {
//     let fields = this.queryString.fields.replace(/,/g, " ");
//     if (this.isPipeline) {
//       const projectStage = {
//         $project: {},
//       };
//       fields.split(" ").forEach((field) => {
//         projectStage.$project[field] = 1;
//       });
//       this.aggregateArray.push(projectStage);
//       console.log("aggerefcfvvcgsvv ", this.aggregateArray);
//     } else {
//       this.mongooseQuery.select(fields);
//     }
//   }
//   return this;
// }

// fields() {
//   if (this.queryString.fields) {
//     console.log("fields");
//     let fields = this.queryString.fields.replace(/,/g, " ");
//     this.mongooseQuery.select(fields);
//   }
//   return this;
// }
// paginate() {
//   console.log("paginate");
//   let page = this.queryString.page * 1 || 1;
//   if (page <= 0) page = 1;
//   let skip = (page - 1) * (this.queryString.limit || 12);
//   this.page = page;
//   this.mongooseQuery.skip(skip).limit(this.queryString.limit || 12);

//   return this;
// }

// filter() {
//   console.log("filter");
//   let filterObj = { ...this.queryString };
//   let excludedQuery = ["page", "sort", "fields", "keyword", "limit"];
//   excludedQuery.forEach((q) => {
//     delete filterObj[q];
//   });
//   filterObj = JSON.stringify(filterObj);
//   filterObj = filterObj.replace(
//     /\b(gt|gte|lt|lte)\b/g,
//     (match) => `$${match}`
//   );
//   filterObj = JSON.parse(filterObj);
//   this.mongooseQuery.find(filterObj);
//   return this;
// }

// sort() {
//   if (this.queryString.sort) {
//     console.log("sort");

//     let sortBy = this.queryString.sort.replace(/,/g, " ");
//     this.mongooseQuery.sort(sortBy);
//   }
//   return this;
// }
