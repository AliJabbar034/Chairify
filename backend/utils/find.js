class ApiFeatures{

    constructor(query,quertString){
        this.query = query;
        this.quertString = quertString;
    }

    filter(){
        let newStr={...this.quertString};
let excludes=['sort'];
 excludes.forEach(e => delete newStr[e])

       let queryStr=JSON.stringify(newStr).trim();

         queryStr=queryStr.replace(/\b(gt|gte|lt|eq|lte)\b/g, (key) => `$${key}`);
        
       

        this.query = this.query.find(JSON.parse(queryStr));

        return this;

    }
    Sort(){
      if(this.quertString.sort){
        const sortBy = this.quertString.sort.split(',').join(' ');

        this.query=this.query.sort(sortBy);
      }
 
         return this;
    }
}

export default ApiFeatures;