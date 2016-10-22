var fs=require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv') 
});
var dataArray=[],countryArray=[],regionArray=[];
var indexSugar=0,indexSalt=0,indexCountry=0,indexFat=0,indexProtein=0,indexCarbo=0;
var country=0,sugar=0,salt=0,sugarsalt=0,i=0,fat=0,protein=0,carbohydrate=0,j=0,country1="",region1="",len=0,len1=0,len2=0,len3=0;
var barChart = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var northEurope = ['United Kingdom' , 'Denmark' , 'Sweden' , 'Norway'];
var centralEurope = ['France','Belgium' , 'Germany' , ' Switzerland' , 'Netherlands'];
var southEurope = ['Portugal', 'Greece' , 'Italy' , 'Spain' , 'Croatia' , 'Albania'];
var group=['NorthernEurope','CentralEurope','SouthernEurope'];
var temp="",temp1="";
var k=0,k1=0,k2=0,k3=0;
var addfat=0;
var addprotein=0;
var addcarbohydrate=0;
var finalCountry=[];
var finalRegion=[];
var count=0;
var sugar_arr=[];
var salt_arr=[];

function countryBar(sugars,salts,countries) {  
  this.sugars= sugars;
  this.salts=salts;
  this.countries = country;
};
function regionChart(region1,fat1,protein1,carbohydrate1) { 
  this.region1=region1;  
  this.fat1=fat1;
  this.protein1=protein1;
  this.carbohydrate1=carbohydrate1;
  
};
function countChart(countriess,sugarinfo,saltinfo)  {   
  this.countriess=countriess;
  this.sugarinfo=sugarinfo;
  this.saltinfo=saltinfo;
};
function regChart(regionss,fatss,proteinss,carbos){ 
  this.regionss=regionss;
  this.fatss=fatss;
  this.proteinss=proteinss;
  this.carbos=carbos;
 
};
for(var j=0;j<barChart.length;j++)
{
  sugar_arr[j]=0;
  salt_arr[j]=0;
}
lineReader.on('line', function (line) {    
  k=0,k1=0,k2=0,k3=0;
     dataArray=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
     while(i<1) 
     {
        indexCountry=dataArray.indexOf('countries_en');
        indexSugar=dataArray.indexOf('sugars_100g');
        indexSalt=dataArray.indexOf('salt_100g');
        indexFat=dataArray.indexOf('fat_100g');
        indexProtein=dataArray.indexOf('proteins_100g');
        indexCarbo=dataArray.indexOf('carbohydrates_100g');
        i++;
    }  
   country=dataArray[indexCountry];
   sugar=dataArray[indexSugar];
   salt=dataArray[indexSalt];
   fat=dataArray[indexFat];
   protein=dataArray[indexProtein];
   carbohydrate=dataArray[indexCarbo];
  // console.log(sugar);
   //console.log(salt);
   //console.log(country);
    if(sugar=="")
   {
     sugar=0;
   }
   if(salt=="")
   {
     salt=0;
   }
   if(country=="")
   {
     country="N";
   }

   
   if(fat=="")
   {
     fat=0;
   }
   if(protein=="")
   {
     protein=0;
   }
   if(carbohydrate=="")
   {
     carbohydrate=0;
   }
  // sugarSalt=parseFloat(sugar)+parseFloat(salt); 
  // console.log(sugarsalt);
   len=barChart.length;
   while(k>=0&&k<len) 
   {
       if((country).includes(barChart[k]))
           country1=barChart[k];
               k++;
   }  
  // console.log(country1);
  if(country1)
  {
       countryArray.push(new countryBar(sugar,salt,country1)); //passing the values
  }

var index=barChart.indexOf(country);
   if(index!=-1)
      {
        sugar_arr[index]+=parseFloat(sugar);
        salt_arr[index]+=parseFloat(salt);
      }

  
  len1=northEurope.length;
  while(k1>=0 && k1<len1) 
  {
       if((country).includes(northEurope[k1]))
           region1="NorthernEurope";
           k1++;
  } 

  len2=centralEurope.length;
  while(k2>=0&&k2<len2) 
  {
       if((country).includes(centralEurope[k2]))
           region1="CentralEurope";
           k2++;
  }
  len3=southEurope.length;
  while(k3>=0&&k3<len3)
  {
       if((country).includes(southEurope[k3]))
           region1='SouthernEurope';
           k3++;
  }
   if(region1){
       regionArray.push(new regionChart(region1,fat,protein,carbohydrate));
  }
});

 lineReader.on('close', function() {
  for(var m=0;m<barChart.length;m++)
  {
    var json_obj={};
    json_obj["country"]=barChart[m];
    json_obj["Sugar"]=sugar_arr[m];
    json_obj["salt"]=salt_arr[m];
    finalCountry.push(json_obj);
    console.log(barChart[m]+" "+sugar_arr[m]+" "+salt_arr[m]);
}

  for(var m=0;m<group.length;m++)
  {
    addfat=0;
    addprotein=0;
    addcarbohydrate=0;
    for(var n=0;n<regionArray.length;n++){
      if((regionArray[n].region1).includes(group[m]))
      {
        temp1=group[m];
        addfat=addfat+parseFloat(regionArray[n].fat1);
        addprotein=addprotein+parseFloat(regionArray[n].protein1);
        addcarbohydrate=addcarbohydrate+parseFloat(regionArray[n].carbohydrate1);
      }
  }
  finalRegion.push(new regChart(temp1,addfat.toFixed(2),addprotein.toFixed(2),addcarbohydrate.toFixed(2)));

}
console.log(JSON.stringify(finalCountry));
//console.log(JSON.stringify(finalRegion));
fs.writeFile('countrybarchart.json', JSON.stringify(finalCountry) , 'utf-8');
fs.writeFile('regionbarchart.json', JSON.stringify(finalRegion) , 'utf-8');
});

