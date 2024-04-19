const BASEURL="assets/data/";

window.onload= async function(){
  var proizvodi=await fetchAll("products.json");
  var kategorije=await fetchAll("categories.json");

    let navigation=await fetchAll("navigation.json");
    ispisiNav(navigation);
    
    let siviBlokovi=await fetchAll("grayBlock.json");
    ispisiBlok(siviBlokovi);

    var proizvodi=await fetchAll("products.json");
    var kategorije=await fetchAll("categories.json");
    ispisiSlajder(proizvodi, kategorije);
    
    let recenzije=await fetchAll("testimontials.json");
    ispisiRecenzije(recenzije);
    
    let partnerskeKompanije=await fetchAll("footerPartners.json");
    ispisiPartnere(partnerskeKompanije);

    let footerMreze=await fetchAll("footerSM.json");
    ispisiFooterMreze(footerMreze);

    let oKompanijiIkonice=await fetchAll("footerAbout.json");
    ispisiFooterAbout(oKompanijiIkonice);
    ispisiTrenutnuGod();//footer godina

    let zemlje=await fetchAll("countries.json");
    ispisiZemlje(zemlje);//dropdown lista u kontakt strani

    ispisiChbKategorije(kategorije);

    ispisiKorpuIkonicu();

    ispisiKorpu(proizvodi);

    let url = window.location.pathname;
    if(url=='/wp2/product.html'){
      
      var proizvodi=await fetchAll("products.json");
      var kategorije=await fetchAll("categories.json");
      ispisiProizvode(proizvodi,kategorije);

      $('#searchBar').keyup(function(){
        ispisiProizvode(proizvodi,kategorije);
      });
    
      
      $('.chb').on("change",function(){
        ispisiProizvode(proizvodi,kategorije);
      });
    
      $('#ddlFilterShipping').on("change",function(){
        ispisiProizvode(proizvodi,kategorije);
      });
    
      $('#ddlSort').on("change",function(){
        ispisiProizvode(proizvodi,kategorije);
      });
    }

    myAge();


  $('.dugmadAddToCart').click(function(){
    let id=$(this).data('id');
    let products=izvuciIzLS("products");

    if(products){
      if(daLiPostoji(id)){
        povecajBrPr(id);
      }else{
        dodajProizvod(id);
      }
    }else{
      dodajPrviProizvod(id);
    }

    

Toastify({

  text: "Added to cart",
  backgroundColor:"#8019c8",
  duration: 1000
  
  }).showToast();
  
  });
  

  $(document).on("click", ".povecajBr",function(){
      let id=$(this).data('id');
     

      let products=izvuciIzLS("products");
      for(let obj of products){
        if(obj.id==id){
          povecajBrPr(id);
          break;
        }
      }
      ispisiKorpu(proizvodi);
  });

  $(document).on("click", ".smanjiBr",function(){
    let id=$(this).data('id');
   

    let products=izvuciIzLS("products");
    for(let obj of products){
      if(obj.id==id){
        smanjiBr(id);
        break;
      }
    }
    ispisiKorpu(proizvodi);
});


  $(document).on("click",".deleteButton",function(){
    let id=$(this).data('id');

    ukloniIzLS(id);
    ispisiKorpu(proizvodi);
  });
  
}

function postaviULS(name,value){
  localStorage.setItem(name, JSON.stringify(value));
}

function izvuciIzLS(name){
  return JSON.parse(localStorage.getItem(name));
}

function ukloniIzLS(id){
  let products=izvuciIzLS("products");
  let noviNiz=products.filter(obj=>obj.id!=id);
  postaviULS("products",noviNiz);
}


function ispisiKorpuIkonicu(){//NE RADI SA .VALUE, A RADI SA ATTR ALI NE AZURIRA ODMAH
  //promenjeno da bude korpaIkona klasa, i sad totalno ne radi
  let products = izvuciIzLS("products");
  console.log(products);

    if (products == null || products.length == 0) {
        $('.korpaIkona').attr("value","0");
    } else {
      let br=products.length.toString();
        $('.korpaIkona').attr("value",br);
    }
}

function dodajPrviProizvod(id){
  let products = []
        products[0] = {
            id:id,
            quantity:1
        };
        postaviULS("products", products);
}

function daLiPostoji(id){
  let proizvod=izvuciIzLS("products");
  let niz=proizvod.filter(obj=>obj.id==id);
  if(niz.length!=0){
    return true;
  }else return false;
}

function povecajBrPr(id){
  let products=izvuciIzLS("products");
  
  for(let i in products){
    if(products[i].id==id){
        products[i].quantity=products[i].quantity+1;
        break;
    }
  }
  postaviULS("products",products);
}

function smanjiBr(id){
  let products=izvuciIzLS("products");
  
  for(let i in products){
    if(products[i].id==id){
      if(products[i].quantity=="1"){
        continue;
      }
        products[i].quantity=products[i].quantity-1;
        break;
    }
  }
  postaviULS("products",products);
}

function dodajProizvod(id){
  let products=izvuciIzLS("products");
  products.push({id:id,quantity:1});
  postaviULS("products",products);
}


function ispisiNav(navigation){
    let ispis="";
    for(let obj of navigation){
        ispis+=`<li class="nav-item">
                    <a class="nav-link" href="${obj.link}">${obj.name}</a>
                </li>`;
    }
    $("#navigation").html(ispis);
}

function ispisiBlok(blocks){
    let ispis="";
    for(let obj of blocks){
        ispis+=`
        <div class="col-md-6 col-lg-3">
        <div class="box">
          <div class="img-box">
            <img src="${obj.img.src}" alt="${obj.img.alt}">
          </div>
          <div class="detail-box">
            <h5>
              ${obj.header}
            </h5>
            <p>
              ${obj.description}
            </p>
          </div>
        </div>
      </div>
        `;
    }
    $("#iconBlocks").html(ispis);
}

function ispisiSlajder(products, categories){
    let ispis1 = "";
    let ispis2 = "";
    let brojac = 0;
    for(let i = 0; i < 5; i++){
      if(i == 0){
            ispis1 += `
            <li data-target="#myCarousel1" data-slide-to="${i}" class="active "></li>
            `;
        }else{
            ispis1 += `
            <li data-target="#myCarousel1" data-slide-to="${i}" class=""></li>
            `;
        }   
    }

    for(let obj of products){
        if(brojac >= 5) {
            break;
        }

        
        
        if(brojac == 0){
            ispis2 += `
            <div class="carousel-item active my-4">
            `;
        }else{
            ispis2 += `
            <div class="carousel-item my-4">
            `;
        }
        ispis2 += `
        <div class="container text-center">
        <div class="row">
          <div class="col-md-6">
            <div class="image-container">
              <img src="${obj.img.src}" alt="${obj.img.alt}">
            </div>
          </div>
          <div class="col-md-6">
            <div class="image-info">
              <h2 class="zelena my-3 font-weight-bold">${obj.name}</h2>
              <p>${obj.description}</p>
              <p class="font-italic my-4">Category: <span class="ljubicasta">${ispisiKategoriju(obj.categoryID,categories)}</span> watch</p>
              
              <div class="d-flex flex-column justify-content-center mb-4 mt-3">
                  <p>Customers grade</p>
                  <div>${ispisiZvezde(obj.grade)}</div>
              </div>
              <div class="mb-5">
                <a href="product.html" class="btn zelena-poz text-white seeProducts">See products</a>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        `;
        
        brojac++;
    }

    $("#crtice").html(ispis1);
    $("#item").html(ispis2);
}

function ispisiChbKategorije(categories){
  let ispis="";
  for(let obj of categories){
    ispis+=`
    <label class="dropdown-item"><input type="checkbox" class="chb" value="${obj.id}"> ${obj.name}</label>
    `;
  }
  $('#ddlCategories').html(ispis);
}

function ispisiKategoriju(id,categories){
  let naziv;
  for(let obj of categories){
    if(id==obj.id){
      naziv=obj.name;
    }
  }
  return naziv;
}

function ispisiDostavu(shipping){
  if(shipping){
    return `<p class="alert alert-success w-50">Free shipping</p>`;
  }else{
    return `<p class="alert alert-danger w-50">Shipping costs</p>`;
  }
}

function ispisiZvezde(grade){
  let ispis="";
  let brCelihZvezda=Math.floor(grade);
  let brPolovicnih=grade%1;
  let brPraznih=Math.floor(5-grade);
  for(let i=0;i<brCelihZvezda;i++){
    ispis+=`<i class="fa fa-star ljubicasta mx-1" aria-hidden="true"></i>`;
  }
  for(let i=0;i<brPolovicnih;i++){
    ispis+=`<i class="fa fa-star-half-o ljubicasta mx-1" aria-hidden="true"></i>`;
  }
  for(let i=0;i<brPraznih;i++){
    ispis+=`<i class="fa fa-star-o ljubicasta mx-1" aria-hidden="true"></i>`;
  }
  return  ispis;
}

function ispisiRecenzije(data){
  let ispis1="";
  let ispis2="";
  let i=0;
    for(let obj of data){
      if(i==0){
        ispis1+=`<div class="carousel-item active">`;
      }else{
        ispis1+=`<div class="carousel-item">`;
      }
      ispis1+=`
      <h5 class="zelena">${obj.name}</h5>
      <p>${obj.review}</p>
      <div class="d-flex justify-content-end">
          <i class="fa fa-quote-left mr-4 fa-2x ljubicasta" aria-hidden="true"></i>
      </div>
      </div>
      `;
      i++;
    }

    for(let i=0;i<3;i++){
      if(i==0){
        ispis2+=`<li data-target="#myCarousel2" data-slide-to="${i}" class="active"></li>`;
      }else{
        ispis2+=`<li data-target="#myCarousel2" data-slide-to="${i}" class=""></li>`;
      }
    }

  $("#recenzije").html(ispis1);
  $("#crtice2").html(ispis2);
}

function ispisiPartnere(partners){
  let ispis="";
  for(let obj of partners){
    ispis+=`
    <div class="col-4 px-0">
    <a href="${obj.link}" target="_blank">
      <div class="insta-box b-1">
        <img src="assets/images/${obj.img.src}" alt="${obj.img.alt}">
      </div>
    </a>
    </div>
    `;
  }
  $("#partners").html(ispis);
}

function ispisiFooterMreze(media){
  let ispis="";
  for(let obj of media){
    ispis+=`
    <a href="${obj.link}" target="_blank" class="text-white">
    <i class="fa fa-${obj.icon} fa-2x" aria-hidden="true"></i>
    </a>
    `;
  }
  $("#social-media").html(ispis);
}

function ispisiFooterAbout(data){
  let ispis="";
  for(let obj of data){
    ispis+=`
    <div>
    <a href="${obj.link}" target="_blank" class="text-white"><i class="fa fa-${obj.icon}" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;
    <p>
      <a href="${obj.link}" target="_blank" class="text-white">${obj.text}</a>
    </p>
    </div>
    `;
  }
  $("#footerAbout").html(ispis);
}

function ispisiTrenutnuGod(){
  let trenutnaGod=new Date().getFullYear();
  let ispis=`
  <p>
    &copy;&nbsp;1932-${trenutnaGod} &nbsp;&nbsp;<a href="index.html" class="zelena">WatchWorks </a>
  </p>
  `;
  $("#founded").html(ispis);
}

function ispisiProizvode(products, categories) {
  var filtrirani;
  filtrirani=pretraziPoImenu(products);
  filtrirani=filtrirajKategorije(filtrirani);
  filtrirani=filtrirajDostave(filtrirani);
  filtrirani=sortiraj(filtrirani);

  let ispis = "";
  for (let obj of filtrirani) {
    ispis += `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="bg-white p-4 rounded">
          <div class="d-flex justify-content-center mb-3">
            <img src="${obj.img.src}" class=" img-fluid" alt="${obj.img.alt}">
          </div>
          <div class="text-center">
            <h4>${obj.name}</h4>
            <p class="font-italic">Category:${ispisiKategoriju(obj.categoryID,categories)}</p>
            <div class="d-flex justify-content-center"><p>${ispisiDostavu(obj.shipping)}</p></div>
            <p>Customer's grade:<br/>${ispisiZvezde(obj.grade)}</p>
            <p class="font-weight-bold h4 zelena"><span class="ljubicasta">$ </span>${obj.price}</p>
            <button data-id="${obj.id}" class="btn zelena-poz text-white w-50 mt-2 dugmadAddToCart" id="dodajUKorpu">Add to cart</button>
            </div>
        </div>
      </div>
    `;
  }
  $("#products").html(ispis);
}

function pretraziPoImenu(products){
  let noviNiz=[];
  let string=$('#searchBar').val();
  for(let obj of products){
    if(obj.name.toLowerCase().includes(string.toLowerCase())){
      noviNiz.push(obj);
    }
  }
  return noviNiz;
}

function filtrirajKategorije(products){
  let noviNiz=[];
  let nizIzabranihCB=[];
  let checkBoxovi= $('.dropdown-menu input[type="checkbox"]');
  
  checkBoxovi.each(function(){
    if($(this).prop('checked')){
      nizIzabranihCB.push($(this).val());
    }
  });

  noviNiz=products.filter(obj => nizIzabranihCB.includes(obj.categoryID.toString())); 

  if(nizIzabranihCB.length==0){
    noviNiz=products;
  }

  return noviNiz;
}

function filtrirajDostave(products){
  let noviNiz=[];
  let value=$('#ddlFilterShipping').val();
  if(value=="free"){
    noviNiz=products.filter(function(obj){
      return obj.shipping==true;
    });
  }else if(value=="cost"){
    noviNiz=products.filter(function(obj){
      return obj.shipping==false;
    });
  }else{
    noviNiz=products;
  }

  return noviNiz;
}

function sortiraj(products){
  let value=$("#ddlSort").val();
  if(value=="nameAsc"){
    products.sort((a,b) => {
      if(a.name < b.name)
      {
          return -1;
      }
      if(a.name > b.name)         
      {
          return 1;
      }
    })
  }else if(value=="nameDesc"){
    products.sort((a,b) => {
      if(a.name > b.name)
      {
          return -1;
      }
      if(a.name < b.name)
      {
          return 1;
      }
    })
  }else if(value=="priceAsc"){
    products.sort((a,b) => {
      if(a.price < b.price)
      {
          return -1;
      }
      if(a.price > b.price)
      {
          return 1;
      }
    })
  }else if(value=="priceDesc"){
    products.sort((a,b) => {
      if(a.price > b.price)
      {
          return -1;
      }
      if(a.price < b.price)
      {
          return 1;
      }
    })
  }else{
    return products;
  }

  return products;
}

function myAge(){
  let ispis="";
  let datumRodjenja=new Date("2003-04-22");
  let danasnjiDatum=new Date();
  let godine=danasnjiDatum.getFullYear()-datumRodjenja.getFullYear();

  let m = danasnjiDatum.getMonth() - datumRodjenja.getMonth();
  if (m < 0 || (m == 0 && danasnjiDatum.getDate() < datumRodjenja.getDate())) {
    godine--;
  }

  ispis=`Age: ${godine}`;
  $('#myAge').html(ispis);
}

function ispisiZemlje(countries){
  let ispis=`<option selected  value="0">Select</option>`;
  for(obj of countries){
    ispis+=`<option value="${obj.id}">${obj.name}</option>`;
  }
  $('#opcije').html(ispis);
}

let regExFullName=/^[A-Z][a-z]{0,39}( [A-Z][a-z]{0,39})*$/;
let regExEmail=/^[a-z0-9]{1,30}(\.|[a-z0-9])*@gmail\.com$/;
let regExNumber = /^\+\d{1,3}\s?\d{4,14}$/;


function proveriPolja(regEx, polje) {
  let value = polje.val(); 
  let pElement = polje.next(); 
  if (!regEx.test(value)) {
    pElement.removeClass('d-none'); 
  } else {
    pElement.addClass('d-none'); 
  }
}

function proveraRadioButton(){
  let rbGender=$('[name="gender"]');
  let isChecked;
  for(let i=0; i<rbGender.length; i++)
  {
      if(rbGender[i].checked)
      {
         isChecked=true;
      }
  }
  if(!isChecked)
  {
      $('#errorGender').removeClass('d-none');
  }
  else{
    $('#errorGender').addClass('d-none');
  }
}

function proveraDropDown(){
    let selektovani = $('#opcije').find('option:selected'); 
    let value = selektovani.val();
    let poruka=$('#opcije').next();
    if(value==0){
      poruka.removeClass('d-none');
    }else{
      poruka.addClass('d-none');
    }
}


function proveraTextArea(){
  let value=$('#message').val();
  let pElement=$('#message').next();
  if(value.length<10){
    pElement.removeClass('d-none');
  }else{
    pElement.addClass('d-none');
  }
}

function predajOdgovore(){
  let imePrezime = $('#fullName'); 
  proveriPolja(regExFullName, imePrezime);
  let mail = $('#email'); 
  proveriPolja(regExEmail, mail);
  let phone=$('#phoneNumber');
  proveriPolja(regExNumber,phone);
  proveraRadioButton();
  proveraTextArea();
  proveraDropDown(); 
}

$('#fullName').on("blur", function(){
  let imePrezime = $(this); 
  proveriPolja(regExFullName, imePrezime);
});

$('#email').on("blur", function(){
  let mail = $(this); 
  proveriPolja(regExEmail, mail);
});

$('#phoneNumber').on("blur",function(){
  let phone=$('#phoneNumber');
  proveriPolja(regExNumber,phone);
})

$('#message').on("blur",function(){
  proveraTextArea();
});

$(document).ready(function() { 
  $('#submitBtn').on("click",function(){
    predajOdgovore();
  });
});




function ispisiKorpu(proizvodi){
  let products=izvuciIzLS("products");

  let ispis="";
  if(products==null || products.length==0){
    ispis=`<h4>You don't have any product in your cart!</h4>`;
  }else{
    for(let pr of proizvodi){
      for(let obj of products){
        if(pr.id==obj.id){
      ispis+= `
      <div class="container text-center my-4 pojedinacni">
      <div class="row">
        <div class="col-md-6">
          <div class="image-container">
            <img src="${pr.img.src}" alt="${pr.img.alt}">
          </div>
        </div>
        <div class="col-md-6">
          <div class="image-info">
            <h2 class="zelena my-3 font-weight-bold">${pr.name}</h2>
            <p class="font-weight-bold h4 zelena podvucena-cena"><span class="ljubicasta">$ </span>${upisiCenuKora(pr.price,obj.quantity)}</p>
          </div>

          <div class="d-flex justify-content-center align-items-center my-4">
          <button data-id="${obj.id}" type="button" class="btn ljubicasta-poz text-white rounded-circle smanjiBr">-</button>
          <div class="mx-3">${obj.quantity}</div>
          <button data-id="${obj.id}" type="button" class="btn ljubicasta-poz text-white rounded-circle povecajBr">+</button>
          </div>

          <button data-id="${obj.id}" type="button" class="btn zelena-poz text-white deleteButton">Delete from cart <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>


      </div>
      </div>
      </div>`;
      }
    }
  }
  }
  $('#korpa').html(ispis);
}

function upisiCenuKora(price,quantity){
  return price*quantity;
}

async function fetchAll(url){
  try{
    let promenljiva=fetch(BASEURL+url);
    promenljiva=(await promenljiva).json();

    promenljiva.catch((xhr)=>{
      $('#modalMessage').text("JSON file not found!"); 
      $('#errorModal').modal('show');
      $('#closeModal').click(function(){
        $('#errorModal').modal('hide');
      });
    })
    return promenljiva;
  }catch(error){

  }
}




